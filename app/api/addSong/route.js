import { supabase } from '../../../utils/supabase';
const alphaTab = require('@coderline/alphatab');
const fs = require('fs');


export async function GET(request) {
  // song file path currently hardcoded
  const songFile = 'https://drive.google.com/uc?id=1aT_U51vpCRcedC_-wfCpSE4wWjnRprrZ&export=download';

  try {
    // get a readable stream of the song for alphatab to read
    const fullUrl = `http://localhost:3000/api/alphaTabPlayer?songFile=${encodeURIComponent(songFile)}`;
    const response = await fetch(fullUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const fileData = await response.arrayBuffer();
    const settings = new alphaTab.Settings();
    const score = alphaTab.importer.ScoreLoader.loadScoreFromBytes(
      new Uint8Array(fileData), settings
    );
    // console.log('title: ', score.title, 'artist: ', score.artist);
    const metadata = {
      title: score.title,
      artist: score.artist,
    };

    // missing step: use spotify api to get more data, using metadata.title and metadata.artist
    // insert data into database and storage (make other routes to remove song and update song)

    // return the metadata retrieved from the GP file
    return Response.json({ metadata })

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}