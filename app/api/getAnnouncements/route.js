import getAnnouncements from '../../../utils/getAnnouncements';

export async function GET(request) {
  try {
    // search supabase songs table here
    const data = await getAnnouncements();

    console.log('data returned from supabase: ', data);
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
