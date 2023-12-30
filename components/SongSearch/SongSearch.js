'use client';

import React, { useState, useEffect } from 'react';
import styles from './SongSearch.module.css';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Songs({ context }) {
  const [searchType, setSearchType] = useState('song');
  const [renderType, setRenderType] = useState('song');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchResultsRender, setSearchResultsRender] = useState(null);
  const Link = require('next/link');
  const Router = useRouter();


  const fetchSearchResults = async () => {
    setIsLoading(true);
    try {
      const searchTypeParam = searchType === 'artist' ? '&searchType=artist' : '';
      // const response = await fetch(`/api/songSearch?query=${encodeURIComponent(searchQuery)}&mimeTypes=application/x-zip,application/gpx+xml${searchType}`);
      const response = await fetch(`/api/songSearch?query=${encodeURIComponent(searchQuery)}&searchType=${searchType}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Failed to fetch:', error);
    }
  };
  useEffect(() => {

  }, [renderType])

  const searchResultRender = (
    <>
      {isLoading ? (
        <div className={styles.loading}>
          <FontAwesomeIcon className={styles.icon} icon={faSpinner} spin />
          <h2>{`Searching for ${searchQuery}`}</h2>
        </div>
      ) : (
        <div className={styles.resultsOuterContainer}>
          <h1 className='sectionHeader'>
            {`${searchType.charAt(0).toUpperCase() + searchType.slice(1)} Search Results for "${searchQuery}":`}
          </h1>
          <div className={styles.resultsContainer}>
            {searchResults.length > 0 ? (
              renderType === 'artist' ? (
                // Rendering unique artists
                [...new Set(searchResults.map(file => file.artist))].map((artist, index) => (
                  <div
                    key={index}
                    className={styles.searchResult}
                    onClick={() => {
                      setRenderType('song'); // Change renderType to 'song'
                      // Additional logic for artist click
                    }}
                  >
                    <p className={styles.searchResult}>{artist}</p>
                  </div>
                ))
              ) : (
                // Rendering files for other renderTypes
                searchResults.map((file, index) => (
                  <div
                    key={index}
                    className={styles.searchResult}
                    onClick={() => {
                      let pageRoute;
                      if (context === 'student') { pageRoute = '/students/songs/song'} else { pageRoute = '/teacher/songs/song'}
                      Router.push(`${pageRoute}?id=${file.id}`);
                    }}
                  >
                    <p className={styles.searchResult}>{file.title}</p>
                  </div>
                ))
              )
            ) : <p className={styles.noResultsMessage}>{`No ${searchType}s found :( `}</p>}
          </div>
        </div>
      )}
    </>
  );
  useEffect(() => {
    setSearchResultsRender(searchResultRender);
  }, [searchResults, renderType])

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputContainer}>
        <select value={searchType} onChange={(e) => { setSearchType(e.target.value); setRenderType(e.target.value)}}>
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
              fetchSearchResults();
            }
          }}
          placeholder={`Search for ${searchType}s`}
        />
      </div>
      <button className='featureButton' onClick={fetchSearchResults}>Search</button>
      {showResults ? searchResultsRender : null }
    </div>
  );
}




