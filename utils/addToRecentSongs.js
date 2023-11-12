import { supabase } from './supabase';
import removeFileExtension from './removeFileExtension';

export default async function addToRecentSongs (userId, file) {
  try {
    // Step 1: Check if the song already exists
    let { data: songData, error: songError } = await supabase
      .from('songs')
      .select('id')
      .eq('title', removeFileExtension(file.name))


    if (songError && songError.message !== "No rows found") {
      console.error('Error checking song existence: ', songError);
      return;
    }

    let songId;
    console.log('songData: ', songData);
    // Step 2: If the song doesn't exist, insert it
    if (songData.length === 0) {
      const { data: newSong, error: newSongError } = await supabase
        .from('songs')
        .insert([
          { title: removeFileExtension(file.name), gp_url: file.webContentLink },
        ])
        .select();

      if (newSongError) {
        console.error('Error adding new song: ', newSongError);
        return;
      }
      console.log('newSong: ', newSong)
      songId = newSong[0].id;
    } else {
      console.log('songData[0].id: ', songData[0].id)
      songId = songData[0].id;
    }

    // Step 3: Insert the song into the 'recent_songs' table if it doesn't already exist
  const { data: recentSongData, error: recentSongCheckError } = await supabase
  .from('recent_songs')
  .select('id')
  .eq('student', userId)
  .eq('song', songId);

if (recentSongCheckError) {
  console.error('Error checking recent song existence: ', recentSongCheckError);
  return;
}

// Insert into 'recent_songs' only if it does not exist
if (!recentSongData || recentSongData.length === 0) {
  const { error: recentSongError } = await supabase
    .from('recent_songs')
    .insert([
      { student: userId, song: songId },
    ])
    .single();

  if (recentSongError) {
    console.error('Error adding to recent songs: ', recentSongError);
    return;
  }
}

    // Step 4: Enforce the 5 recent songs limit
    const { count } = await supabase
      .from('recent_songs')
      .select('id', { count: 'exact' })
      .eq('student', userId);

    if (count > 5) {
      const { error: deleteError } = await supabase
        .from('recent_songs')
        .delete()
        .eq('student', userId)
        .order('created_at', { ascending: true })
        .limit(count - 5);

      if (deleteError) {
        console.error('Error deleting old songs: ', deleteError);
      }
    }

  } catch (error) {
    console.error('An error occurred: ', error);
  }
}