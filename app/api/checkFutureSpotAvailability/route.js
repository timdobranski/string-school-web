import { supabase } from '../../../utils/supabase';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  const day = searchParams.get('day');
  const time = searchParams.get('time');
  const student = searchParams.get('student');

  console.log('inside checkFutureSpotAvailability route');
  try {
    const { data: futureMakeups, error: futureMakeupsError } = await supabase
      .from('makeups')
      .select('*')
      .eq('day', day)
      .eq('time', time)
      .gte('date', date);

    const { data: futureBookings, error: futureNewSpotError } = await supabase
      .from('schedule')
      .select('new_student_start_date')
      .eq('day', day)
      .eq('time', time)
    console.log('futureMakeups: ', futureMakeups);
    return new Response(JSON.stringify({makeups: futureMakeups, bookings: futureBookings }), {
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