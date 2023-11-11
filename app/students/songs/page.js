'use client';

import React, { useState } from 'react';
import styles from './Songs.module.css';
import AlphaTab from '../../../components/AlphaTab/AlphaTab.js';
import { useAuth } from '../layout.js';
import { useRouter } from 'next/navigation';


export default function Songs() {
  const { user, session, signOut } = useAuth();
  const [searchType, setSearchType] = useState('song'); // 'song' or 'artist'
  const [searchQuery, setSearchQuery] = useState('dose');

  const [showAlphaTab, setShowAlphaTab] = useState(false);
  const [scoreData, setScoreData] = useState('');
  const Router = useRouter();


  const searchHandler = async () => {
  console.log('router params: ', searchQuery, searchType);
    Router.push(`/students/songs/search-results?query=${searchQuery}&type=${searchType}`,
    );
  };

  const openFile = (file) => {
    const fileUrl = `${encodeURIComponent(file.webContentLink)}`;
    setScoreData(fileUrl);
    setShowAlphaTab(true);
  };

  return (
    <main className='infoCard'>
      {/* <h1 className='sectionHeaders'>SONGS</h1> */}

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
          placeholder={`Search for ${searchType}s`}
        />
      </div>
      <button onClick={searchHandler}>Search</button>

      </div>

      <h2 className='featureHeaders'>Browse All Songs By Category</h2>


      <h2 className='featureHeaders'>Recent Songs</h2>



      {showAlphaTab && <AlphaTab scoreData={scoreData}/>}
    </main>
  );
}
