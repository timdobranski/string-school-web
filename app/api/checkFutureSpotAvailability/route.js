import { supabase } from '../../../utils/supabase';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const spot = searchParams.get('spot');
  const student = searchParams.get('student');

  // console.log('inside checkFutureSpotAvailability route');
  try {
    const { data: futureMakeups, error: futureMakeupsError } = await supabase
      .from('makeups')
      .select('*')
      .eq('time', time)
      .gte('date', date);

    const { data: futureBookings, error: futureNewSpotError } = await supabase
      .from('schedule')
      .select('new_student_start_date')
      .eq('id', spot)
      .gte('date', date);

    const result = {makeups: futureMakeups, bookings: futureBookings || [] }
    // console.log('result: ', result);
    return new Response(JSON.stringify(result), {
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