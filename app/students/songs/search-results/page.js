'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import styles from './search-results.module.css';

const SearchResults = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const searchParams = useSearchParams();

  const query = searchParams.get('query')
  const type = searchParams.get('type')

  console.log('query: ', query);
  console.log('type: ', type);
  useEffect(() => {
    if (query) {
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
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  return (
    <div className='infoCard'>
      <h1>Search Results</h1>
      {searchResults.map((file, index) => (
        <div key={index} className={styles.searchResult}>
          <span>{file.name}</span>
          <span>
            <a href={`https://drive.google.com/uc?export=download&id=${file.id}`} download>
            {/* <FontAwesomeIcon icon={faCircleArrowDown} className={styles.downloadIcon} /> */}
              Download for Guitar Pro
            </a>
          </span>
          <span>
            {/* <FontAwesomeIcon icon={faCirclePlay} className={styles.downloadIcon} /> */}
            <button onClick={() => openFile(file)}>
              Open Here
            </button>
          </span>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;