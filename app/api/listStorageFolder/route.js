import  { supabase } from '../../../utils/supabase';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const folderPath = searchParams.get('folderPath');
  console.log('folderPath: ', folderPath);
  try {
    // search supabase songs table here
    const { data, error } = await supabase.storage
      .from('teacher-storage')
      .list (folderPath, {
        limit: 100,
        offset: 0,
        sortBy: {
          column: 'name',
          order: 'asc',
        }
      });

    console.log('Data returned from listStorageFolder route: ', data);
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
