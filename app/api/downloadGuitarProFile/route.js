import { supabase } from '../../../utils/supabase';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');
  console.log('url:', url);

  // Ensure the URL is a valid file path in Supabase storage
  const filePath = decodeURIComponent(url); // Use decodeURIComponent if the URL might be encoded

  try {
    const { data, error } = await supabase
      .storage
      .from('teacher-storage')
      .download(filePath);

    if (error) {
      console.error('Error downloading file:', error.message);
      return new Response(error.message, { status: 500 });
    }
    const buffer = await data.arrayBuffer();


    // Extract the filename from the filePath
    const filename = filePath.split('/').pop();

    // Set appropriate headers
    const headers = new Headers();
    headers.set('Content-Type', 'application/octet-stream');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);

    // Stream the data
    return new Response(buffer, { headers });
  } catch (error) {
    console.error('Server error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
