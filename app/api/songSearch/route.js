import { getData } from '../../../utils/googleDrive';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('query') || '';
    const mimeTypes = (url.searchParams.get('mimeTypes') || '').split(',');

    const data = await getData(searchQuery, mimeTypes.filter(Boolean));
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
