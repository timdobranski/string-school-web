import { supabase } from '../../../utils/supabase';


export async function PATCH(request) {
  const searchParams = request.nextUrl.searchParams;
  const songId = searchParams.get('songId');

  try {
    // search supabase songs table here
    const { error } = await supabase
      .from('songs')
      .update({
        album: null,
        spotify_url: null,
        release_date: null,
        explicit: null,
        spotify_id: null,
        image_url: null,
        spotify_artist_id: null,
      })
      .eq('id', songId);

    if (error) {
      throw error;
    }

    return new Response(null, {
      status: 204
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
