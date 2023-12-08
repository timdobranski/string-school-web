import axios from 'axios';
import querystring from 'querystring';

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
  const accessToken = await getSpotifyAccessToken();
  if (!accessToken) {
    console.error('No Spotify access token');
    return;
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data.tracks.items; // Array of tracks
  } catch (error) {
    console.error('Error searching Spotify', error);
    return [];
  }
}

export async function GET(req) {
  // Extract the query parameter from the request URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  const query = url.searchParams.get('query');

  if (!query) {
    return new Response(JSON.stringify({ error: 'No query provided' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Use the searchSpotify function to perform the search
  const results = await searchSpotify(query);
  // console.log('results: ', results);
  // Return the search results
  return new Response(JSON.stringify({ data: results }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
