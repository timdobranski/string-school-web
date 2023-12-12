import { supabase } from '../../../utils/supabase';
const alphaTab = require('@coderline/alphatab');
const fs = require('fs');


export async function GET(request) {
  const songFile = 'https://drive.google.com/uc?id=1aT_U51vpCRcedC_-wfCpSE4wWjnRprrZ&export=download';
  try {
    console.log('songFile: ', songFile);
    const fullUrl = `http://localhost:3000/api/alphaTabPlayer?songFile=${encodeURIComponent(songFile)}`;
    const response = await fetch(fullUrl);
    console.log('response: ', response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const fileData = await response.arrayBuffer();
    const settings = new alphaTab.Settings();
    const score = alphaTab.importer.ScoreLoader.loadScoreFromBytes(
      new Uint8Array(fileData), settings
    );
    console.log('title: ', score.title, 'artist: ', score.artist);
    const metadata = {
      title: score.title,
      artist: score.artist,
    };

    return Response.json({ metadata })
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}