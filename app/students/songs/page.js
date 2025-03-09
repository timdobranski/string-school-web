'use client';

import React, { useState, useEffect } from 'react';
import styles from './Songs.module.css';
import AlphaTab from '../../../components/AlphaTab/AlphaTab.js';
import StudentContext, { useAuth } from '../layout.js';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabase';
import SongBrowser from '../../../components/SongBrowser/SongBrowser.js';
import SongSearch from '../../../components/SongSearch/SongSearch.js';

export default function Songs() {
  const [searchType, setSearchType] = useState('song'); // 'song' or 'artist'
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSongs, setRecentSongs] = useState([]);
  const [setlistSongs, setSetlistSongs] = useState([]);
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();
  const Link = require('next/link');
  const Router = useRouter();
  const [spotifyQuery, setSpotifyQuery] = useState('');
  const browseFolderOptions = ['Choose Category', 'Musical Artists', 'Holiday Songs', 'Movies, TV, & Games', 'Kids Songs']


  const getRecentSongs = async () => {
    const { data, error } = await supabase
      .from('recent_songs')
      .select(`
      song,
      songs (
        title,
        id
      )
    `)
      .eq('student', supabaseUserData.student_id);

    if (error) {
      console.error('Error retrieving songs: ', error);
    } else {
      console.log('Retrieved songs: ', data);
      setRecentSongs(data);
    }
  };
  const getSetlistSongs = async () => {
    const { data, error } = await supabase
      .from('setlist_songs')
      .select(`
      song,
      songs (
        title,
        id
      )
    `)
      .eq('student', supabaseUserData.student_id);

    if (error) {
      console.error('Error retrieving songs: ', error);
    } else {
      console.log('Retrieved songs: ', data);
      setSetlistSongs(data);
    }
  };
  const searchHandler = async () => {
    // console.log('router params: ', searchQuery, searchType);
    Router.push(`/students/songs/search-results?query=${searchQuery}&type=${searchType}`,
    );
  };


  useEffect(() => {
    if (supabaseUserData) {
      getRecentSongs();
      getSetlistSongs();
    }
  }, [supabaseUserData]);


  return (
    <div className='studentPageWrapper'>
    <div className='infoCard'>
      <h2 className='smallerSectionTitleWhite'>Search The Song Library</h2>
      <SongSearch context='student'/>
      <h2 className='smallerSectionTitleWhite'>Or Browse All Songs By Category</h2>

      <SongBrowser folderOptions={browseFolderOptions} />

      {/* Render recent songs, if any*/}
      {recentSongs.length > 0 ? (
        <>
          <h2 className='featureHeaders'>Recent Songs</h2>
          {recentSongs.map((file, index) => (
            <div key={index} className={styles.searchResult}>
              <p className='linkedText'>{file.songs.title}</p>
            </div>
          ))}
        </>
      ) : null}

      {/* Render setlist songs, if any*/}
      {setlistSongs.length > 0 ? (
        <div className={styles.setlistWrapper}>
          <h2 className='smallerSectionTitleWhite'>Setlist Songs</h2>
          {setlistSongs.map((file, index) => (
            <div key={index} className={styles.searchResult}>
              <p className='linkedText'>{file.songs.title}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  </div>
  );
}
