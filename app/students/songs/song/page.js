'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './song.module.css';
import Image from 'next/image';
import dateFormatter from '../../../../utils/dateFormatter';


export default function Song() {
  const searchParams = useSearchParams()
  const songId = searchParams.get('id')

  const [metadata, setMetadata] = useState(null);

  // fetch metadata
  useEffect(() => {
    async function fetchSongData() {
      if (!songId) return;
      try {
        const response = await fetch(`/api/getSong?song=${songId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMetadata(data[0]);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    fetchSongData();
  }, [songId]);

  useEffect(() => {
    console.log('metadata: ', metadata);
  }, [metadata])

  if (!metadata || metadata.length <= 0) { return null }

  return (
    <div className='infoCard'>
      <h1 className={styles.songTitle}>{metadata.title}</h1>
      <h3 className={styles.songArtist}>{metadata.artist}</h3>
      <div className={styles.songDataContainer}>
        <div className={styles.songInfoContainer}>
          <h3 className={styles.header}>Song Info</h3>
          <Image src={metadata.image_url} width={200} height={200} alt='album cover' />
          <h3>{metadata.album}</h3>
          <h3>{dateFormatter(metadata.release_date, {includeYear: true})}</h3>
          {metadata.explicit ? <h3 className={styles.explicitTag}>Explicit</h3> : null}
          {metadata.key ? <h3>Key: {metadata.key}</h3> : null}
          {metadata.tempo ? <h3>Tempo: {metadata.tempo}</h3>: null }

        </div>
        <div className={styles.songInfoContainer}>
          <h3 className={styles.header}>Your Progress</h3>
          {metadata.structure ? metadata.structure.map((section, index) => {return <p key={index}>{section}</p> }) :
            `No progress has been recorded for this song yet`}
        </div>
        <div className={styles.songInfoContainer}>
          <h3 className={styles.header}>Structure</h3>
          {metadata.structure ? metadata.structure.map((section, index) => {return <p key={index}>{section}</p> }) :
            `The structure of this song hasn't been added yet`}
        </div>
      </div>
    </div>
  );
}
