import axios from 'axios';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const songFileLink = url.searchParams.get('songFile');
    if (!songFileLink) {
      throw new Error('No song file provided');
    }
    console.log('songFileLink: ', songFileLink);

    // Download the file from the provided link
    const response = await axios.get(songFileLink, {
      responseType: 'arraybuffer',
      maxBodyLength: Infinity,
    });

    // Define the local path to save the file
    const localFilePath = path.join('public/alphatab', 'downloadedFile.gp');

    // Save the file
    fs.writeFileSync(localFilePath, response.data);

    // Read and return the HTML file
    const htmlFilePath = path.join(process.cwd(), 'public/alphatab', 'alphatab.html');
    console.log('htmlFilePath: ', htmlFilePath);
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
    console.log('html content: ', htmlContent);
    return new Response(htmlContent, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
