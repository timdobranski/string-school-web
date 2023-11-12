'use client';

import React, { useState, useEffect } from 'react';
import styles from './Songs.module.css';
import AlphaTab from '../../../components/AlphaTab/AlphaTab.js';
import StudentContext, { useAuth } from '../layout.js';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown, faCirclePlay, faSpinner } from '@fortawesome/free-solid-svg-icons';


export default function Songs() {
  const [searchType, setSearchType] = useState('song'); // 'song' or 'artist'
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSongs, setRecentSongs] = useState([]);
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();
  const Router = useRouter();

  const getRecentSongs = async () => {
    const { data, error } = await supabase
    .from('recent_songs')
    .select(`
      song,
      songs (
        title,
        gp_url
      )
    `)
    // .eq('student', supabaseUserData.student_id);
    .eq('student', 21);

  if (error) {
    console.error('Error retrieving songs: ', error);
  } else {
    console.log('Retrieved songs: ', data);
    setRecentSongs(data);
  }
  };

  const searchHandler = async () => {
  console.log('router params: ', searchQuery, searchType);
    Router.push(`/students/songs/search-results?query=${searchQuery}&type=${searchType}`,
    );
  };

  const openFile = (file) => {
    console.log('file inside recentSongs openFile: ', file);
    Router.push(`/students/alphatab-player?title=${file.name}&fileUrl=${file}`);
  };

  useEffect(() => {
    getRecentSongs();
  }, [supabaseUserData]);

  return (
    <main className='infoCard'>
      <div className={styles.searchContainer}>
        <h2 className='featureHeaders'>Search The Song Library</h2>
        <div className={styles.searchInputContainer}>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="song">By Song</option>
          <option value="artist">By Artist</option>
        </select>
        <input
          className={styles.searchInput}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchHandler();
            }
          }}
          placeholder={`Search for ${searchType}s`}
        />
      </div>
      <button onClick={searchHandler}>Search</button>

      </div>

      <h2 className='featureHeaders'>Browse All Songs By Category</h2>


      <h2 className='featureHeaders'>Recent Songs</h2>
      {recentSongs.length > 0 ? (
 recentSongs.map((file, index) => (
  <div key={index} className={styles.searchResult}>
    <span>{file.songs.title}</span>
    <span>
      <a href={file.songs.gp_url} download>
        <FontAwesomeIcon icon={faCircleArrowDown} className={styles.downloadIcon} />
        Download for Guitar Pro
      </a>
    </span>
    <span className={styles.openButtonSpan}>
      <button onClick={() => {console.log('file '); openFile(file.songs.gp_url)}}>
        <FontAwesomeIcon icon={faCirclePlay} className={styles.playIcon} />
        Open Here
      </button>
    </span>
  </div>
))
      ): null}

    </main>
  );


}
