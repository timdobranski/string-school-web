import { supabase } from '../../../utils/supabase';


export async function GET(request) {

  const searchParams = request.nextUrl.searchParams;
  const filepath = searchParams.get('filepath');

  console.log('filepath: ', filepath);
  try {
    const { data: songs, error: songsError } = await supabase
      .from('songs')
      .select('*')
      .eq('gp_url', filepath)
      .single();

    if (songsError) { throw songsError }

    return Response.json({ songs })

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}