import axios from 'axios';
import fs from 'fs';
import path from 'path';



export async function GET(request) {
  try {
    // Parse the URL to get query parameters
    const url = new URL(request.url);
    const songFileLink = url.searchParams.get('songFile');
    if (!songFileLink) {
      throw new Error('No song file provided');
    }

    // Fetch the file from the provided link
    const response = await fetch(songFileLink);

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Read the response as a stream
    const reader = response.body.getReader();
    let stream = new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            push();
          }).catch(error => {
            console.error('Stream reading error:', error);
            controller.error(error);
          });
        }
        push();
      }
    });

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



// export async function GET(request) {
//   try {
//     const url = new URL(request.url);
//     const songFileLink = url.searchParams.get('songFile');
//     if (!songFileLink) {
//       throw new Error('No song file provided');
//     }
//     console.log('songFileLink: ', songFileLink);

//     // Download the file from the provided link
//     const response = await axios.get(songFileLink, {
//       responseType: 'arraybuffer',
//       maxBodyLength: Infinity,   });

//     // Define the local path to save the file
//     const localFilePath = path.join('public/alphatab', 'downloadedFile.gp');

//     // Save the file
//     fs.writeFileSync(localFilePath, response.data);

//     // Read and return the HTML file
//     const htmlFilePath = path.join(process.cwd(), 'public/alphatab', 'alphatab.html');
//     console.log('htmlFilePath: ', htmlFilePath);
//     const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
//     console.log('html content: ', htmlContent);
//     return new Response(htmlContent, {
//       headers: { 'Content-Type': 'text/html' },
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }
