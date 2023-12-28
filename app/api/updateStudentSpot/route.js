import { supabase } from '../../../utils/supabase'

// Takes old spot, new spot, and makeups that need to be cancelled if the student is
// not the same as the one switching spots

export async function GET(request) {
  try {
    // Extract query parameters
    const url = new URL(request.url);
    const oldSpot = url.searchParams.get('oldSpot');
    const newSpot = JSON.parse(url.searchParams.get('newSpot'));
    const makeups = JSON.parse(url.searchParams.get('makeups'));

    // Check if both oldSpot and newSpot are provided
    if (!oldSpot || !newSpot) {
      throw new Error("Missing required query parameters: oldSpot or newSpot");
    }

    // Add student to new spot (removal from old spot will happen automatically via pg_cron)
    const { data, error } = await supabase
      .from('schedule')
      .update({
        new_student_start_date: newSpot.dbDate,
        new_student: newSpot.student,
        new_spot_replaces: oldSpot.id || null,
      })
      .eq('id', newSpot.id);

    if (error) {
      throw error;
    }
    // add cancellations for any future makeups booked in the spot the student chose
    // * ONLY IF * the makeup student is not the same student as the new spot student
    for (var i = 0; i < makeups.length; i++) {
      if (makeups[i].student !== newSpot.student) {
        var cancellation = makeups[i];
        const { data, error } = await supabase
          .from('cancellations')
          .insert({
            student: newSpot.student,
            date: cancellation.date,
            time: cancellation.time,
            note: 'automatic cancellation from new spot switch with previously booked makeup',
            created_by: newSpot.created_by,
          });

        if (error) {
          throw error;
        }}
    }


    // add makeup credits to student's account
    if (makeups.length > 0) {
      // calculate how many of the makeups are not the current student

      // get the current number of makeup credits
      const { data: studentData, error: studentFetchError } = await supabase
        .from('students')
        .select('makeups')
        .eq('id', newSpot.student)
        .single();

      if (studentFetchError) {
        throw studentFetchError;
      }
      const currentMakeups = studentData.makeups; // Assuming 'makeups' is a numeric field
      const newMakeupsValue = currentMakeups + makeups.length; // Increment the value

      const { error: makeupCreditsError } = await supabase
        .from('students')
        .update({ makeups: newMakeupsValue })
        .eq('id', newSpot.student);

      if (makeupCreditsError) {
        throw makeupCreditsError;
      }
    }




    return new Response(JSON.stringify(), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
