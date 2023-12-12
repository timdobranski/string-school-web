'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './AlphaTab.module.css';

export default function AlphaTab({ scoreData }) {
  const [metadata, setMetadata] = useState({ title: '', artist: '' });
  const iframeRef = useRef(null);

  const iframeSrc = `/alphatab/alphatabPlayer.html?songFile=${encodeURIComponent(scoreData)}`;

  useEffect(() => {
    const handleAlphaTabMessage = (event) => {
      // Here you might want to check the origin for security purposes
      // if (event.origin !== 'expected origin') return;

      if (event.data && event.data.type === 'alphaTabMetadata') {
        setMetadata(event.data.metadata);
      }
    };

    window.addEventListener('message', handleAlphaTabMessage);

    return () => {
      window.removeEventListener('message', handleAlphaTabMessage);
    };
  }, []);

  useEffect(() => {
    console.log('metadata: ', metadata);
  }, [metadata])

  return (
    <div className={styles.alphatabContainer}>
      <div>
        <p>Title: {metadata.title}</p>
        <p>Artist: {metadata.artist}</p>
      </div>
      <iframe
        ref={iframeRef}
        id='alphatab-iframe'
        key={scoreData}
        src={`${iframeSrc}`}
        width="100%"
        height="1000px"
        style={{ border: 'none' }}
        allow="autoplay"
      ></iframe>
    </div>
  );
}