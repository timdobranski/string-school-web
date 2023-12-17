import { supabase } from '../../../utils/supabase';
import axios from 'axios';
import querystring from 'querystring';


export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('song');

  const { data, error } = await supabase
    .from('songs')
    .select(`*`)
    .eq('id', id);
  if (error) {
    console.log('error: ', error);
  }
  console.log('data.spotify_id: ', data[0]);
  const results = await searchSpotify(data[0].spotify_artist_id);
  // console.log('results: ', results);
  data[0].artistData = results;
  return Response.json(data);
}



// handle spotify authentication
async function getSpotifyAccessToken() {
  const credentials = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({ grant_type: 'client_credentials' }), {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Spotify access token', error);
    return null;
  }
}

async function searchSpotify(query) {
  console.log('query inside searchSpotify: ', query);
  const accessToken = await getSpotifyAccessToken();
  if (!accessToken) {
    // console.error('No Spotify access token');
    return;
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/artists/${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('response.data: ', response.data)
    return response.data; // Array of tracks
  } catch (error) {
    // console.error('Error searching Spotify', error);
    return [];
  }
}

// export async function GET(req) {
//   // Extract the query parameter from the request URL
//   const url = new URL(req.url, `http://${req.headers.host}`);
//   const query = url.searchParams.get('query');

//   if (!query) {
//     return new Response(JSON.stringify({ error: 'No query provided' }), {
//       status: 400,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }

//   // Use the searchSpotify function to perform the search
//   const results = await searchSpotify(query);
//   // console.log('results: ', results);
//   // Return the search results
//   return new Response(JSON.stringify({ data: results }), {
//     status: 200,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// }