'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown, faCirclePlay, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './search-results.module.css';
import { supabase } from '../../../../utils/supabase';
import StudentContext, { useAuth } from '../../layout.js';
import removeFileExtension from '../../../../utils/removeFileExtension';
import addToRecentSongs from '../../../../utils/addToRecentSongs';

const SearchResults = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();



  const query = searchParams.get('query')
  const type = searchParams.get('type')

  console.log('query: ', query);
  console.log('type: ', type);
  useEffect(() => {
    if (query && searchResults.length === 0) {
      fetchSearchResults();
    }
  }, [query, type]);

  const fetchSearchResults = async () => {
    try {
      const searchTypeParam = type === 'artist' ? '&searchType=artist' : '';
      const response = await fetch(`/api/songSearch?query=${encodeURIComponent(query)}&mimeTypes=application/x-zip,application/gpx+xml${searchTypeParam}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setSearchResults(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };


  const openFile = (file) => {
    // console.log('supabaseUserData: ', supabaseUserData);
    addToRecentSongs(supabaseUserData.student_id, file);
    const fileUrl = `${encodeURIComponent(file.webContentLink)}`;
    router.push(`/students/alphatab-player?title=${file.name}&fileUrl=${fileUrl}`);
  };

  return (
    <div className='infoCard'>
      <h1>{`Search Results for "${query}"`}</h1>
      {isLoading ? (
        <div className={styles.loading}>
          <FontAwesomeIcon icon={faSpinner} spin />
          <span>Loading...</span>
        </div>
      ) : (
        searchResults.map((file, index) => (
          <div key={index} className={styles.searchResult}>
            <span>{file.name}</span>
            <span>
              <a href={`https://drive.google.com/uc?export=download&id=${file.id}`} download>
                <FontAwesomeIcon icon={faCircleArrowDown} className={styles.downloadIcon} />
                Download for Guitar Pro
              </a>
            </span>
            <span className={styles.openButtonSpan}>
              <button onClick={() => openFile(file)}>
                <FontAwesomeIcon icon={faCirclePlay} className={styles.playIcon} />
                Open Here
              </button>
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;