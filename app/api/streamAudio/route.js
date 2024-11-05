import { supabase } from '../../../utils/supabase';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const searchQuery = 165;

    let { data, error } = await supabase
      .from('songs')
      .select('audio_url')
      .eq('id', `${searchQuery}`);

    if (error) {
      throw error;
    }

    if (data && data[0] && data[0].audio_url) {
      const audioPath = data[0].audio_url;

      const { data: downloadData, error: downloadError } = await supabase
        .storage
        .from('teacher-storage')
        .download(`${audioPath}`);

      if (downloadError) {
        throw downloadError;
      }

      // Check if downloadData is a Blob
      if (!(downloadData instanceof Blob)) {
        throw new Error('Downloaded data is not a blob');
      }

      // Convert Blob to ReadableStream for streaming
      const stream = downloadData.stream();

      return new Response(stream, {
        headers: { 'Content-Type': 'audio/mpeg' } // Set the content type to audio
      });
    } else {
      throw new Error('Audio URL not found');
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}