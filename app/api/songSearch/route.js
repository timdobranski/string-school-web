import { supabase } from '../../../utils/supabase'
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('query') || '';
    const searchType = url.searchParams.get('searchType') || 'song'; // Default to 'song' if not specified
    const queryColumn = searchType === 'song' ? 'title' : 'artist';
    // search supabase songs table here
    let { data, error } = await supabase
      .from('songs')
      .select('*')
      .ilike(`${queryColumn}`, `%${searchQuery}%`); // Use ILIKE for case-insensitive partial match

    if (error) {
      throw error;
    }

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
