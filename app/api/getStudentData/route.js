import getStudentData from '../../../utils/getStudentData';

export async function GET(request) {

  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('student');

  try {
    const data = await getStudentData(id);

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