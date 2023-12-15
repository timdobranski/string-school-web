import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { supabase } from '../../../utils/supabase';


export async function GET(request) {
  try {
    // Parse the URL to get query parameters
    const url = new URL(request.url);
    const songFileLink = url.searchParams.get('songFile');
    if (!songFileLink) {
      throw new Error('No song file provided');
    }
    console.log('songfile inside alphaTabPlayer: ', songFileLink);
    // Fetch the file from the provided link
    const { data, error } = await supabase
      .storage
      .from('teacher-storage')
      .download(songFileLink);

    if (error) {
      console.error('Error downloading file:', error.message);
      return new Response(error.message, { status: 500 });
    }
    console.log('-----------DATA: ', data);
    // Read the response as a stream
    const stream = data.stream();


    // Return the stream with appropriate headers
    return new Response(stream, {
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
