import { supabase } from '../../../utils/supabase';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('song');
  // song file path currently hardcoded
  const { data, error } = await supabase
    .from('songs')
    .select(`*`)
    .eq('id', id);
  if (error) {
    console.log('error: ', error);
  }
  return Response.json(data);
}