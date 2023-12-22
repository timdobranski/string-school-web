import toggleDismissAnnouncement from '../../../utils/toggleDismissAnnouncement';


export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('user');
    console.log('id: ', id)
    toggleDismissAnnouncement(id);
    return new Response(JSON.stringify(), {
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
