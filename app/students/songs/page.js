'use client';

import React, { useState } from 'react';
import styles from './Songs.module.css';
import { useAuth } from '../layout.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';


export default function Songs() {
  const { user, session, signOut } = useAuth();
  const [searchType, setSearchType] = useState('song'); // 'song' or 'artist'
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = async () => {
    try {
      const searchTypeParam = searchType === 'artist' ? '&searchType=artist' : '';
      const response = await fetch(`/api/songSearch?query=${encodeURIComponent(searchQuery)}&mimeTypes=application/x-zip,application/gpx+xml${searchTypeParam}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  return (
    <main className='infoCard'>
      <h1 className='sectionHeaders'>SONGS</h1>

      <h2 className='featureHeaders'>Recent Songs</h2>

      <div className='featureHeaders'>
        <h2>Search The Song Library</h2>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="song">By Song</option>
          <option value="artist">By Artist</option>
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search term"
        />
        <button onClick={searchHandler}>Search</button>
        {searchResults.map((file, index) => (
  <div key={index} className={styles.searchResult}>
    <span>{file.name}</span>
    <span>
      <a href={`https://drive.google.com/uc?export=download&id=${file.id}`} download>
      <FontAwesomeIcon icon={faCircleArrowDown} className={styles.downloadIcon} />
        Download for Guitar Pro
      </a>
    </span>
    <span>
      <FontAwesomeIcon icon={faCirclePlay} className={styles.downloadIcon} />
      <button onClick={() => openFile(file)}>
        Open Here
      </button>
    </span>
  </div>
))}
      </div>

      <h2 className='featureHeaders'>Browse By Artist</h2>

      <h2 className='featureHeaders'>Browse Movie Scores & TV Themes</h2>

      <h2 className='featureHeaders'>Browse Holiday Music</h2>

    </main>
  );
}
