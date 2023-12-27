import { supabase } from '../../../utils/supabase'

export async function GET(request) {
  try {
    // Extract query parameters
    const url = new URL(request.url);
    const oldSpot = url.searchParams.get('oldSpot'); // Assuming this is a string
    const newSpot = JSON.parse(url.searchParams.get('newSpot')); // Assuming this is a JSON string

    // Check if both oldSpot and newSpot are provided
    if (!oldSpot || !newSpot) {
      throw new Error("Missing required query parameters: oldSpot or newSpot");
    }
    console.log('oldSpot: ', oldSpot);
    console.log('newSpot: ', newSpot);
    // Update the schedule table
    const { data, error } = await supabase
      .from('schedule')
      .update({
        new_student_start_date: newSpot.dbDate,
        new_student: newSpot.student,
        new_spot_replaces: oldSpot.id
      })
      .eq('id', newSpot); // Assuming you're matching by the id of the new spot

    if (error) {
      throw error;
    }

    console.log('Data returned from Supabase:', data);
    return new Response(JSON.stringify(data), {
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
