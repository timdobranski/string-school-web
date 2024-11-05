'use client'

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)
import ReactTimeAgo from 'react-time-ago'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './song.module.css';
import Image from 'next/image';
import dateFormatter from '../../../../utils/dateFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import addToRecentSongs from '../../../../utils/addToRecentSongs';
import StudentContext, { useAuth } from '../../layout.js';
import AudioPlayer from '../../../../components/AudioPlayer/AudioPlayer';

export default function Song() {
  const searchParams = useSearchParams()
  const songId = searchParams.get('id')
  const [metadata, setMetadata] = useState(null);
  const router = useRouter();
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();


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
        console.log('metadata: ', data[0])
        setMetadata(data[0]);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    fetchSongData();
  }, [songId]);

  const openFile = (file) => {
    // console.log('supabaseUserData: ', supabaseUserData);
    addToRecentSongs(supabaseUserData.student_id, file);
    const fileUrl = `${encodeURIComponent(file)}`;
    router.push(`/students/alphatab-player?title=${file.name}&fileUrl=${fileUrl}`);
  };

  if (!metadata || metadata.length <= 0) { return null }

  return (
    <div className='infoCard'>
      <div className={styles.songHeader}>
        <Image
          className={styles.artistImage}
          src={metadata?.artistData?.images?.[0]?.url || '/images/background.jpeg'}
          width={250}
          height={250}
          alt='album cover'
        />
        <h1 className={styles.songTitle}>{metadata.title}</h1>
        <h3 className={styles.songArtist}>{metadata.artist}</h3>
        {metadata.audio_url ? <AudioPlayer audioId={metadata.id}/> : null}
        {metadata.updated_at ? <p className='text'>
          Pages last updated <ReactTimeAgo date={metadata.updated_at} locale="en-US"/>
        </p> : null}
        <div className={styles.guitarProContainer}>
          <span className={styles.buttonSpan}>
            <a href={`/api/downloadGuitarProFile?url=${metadata.gp_url}`} download className={styles.buttonLink}>
              <FontAwesomeIcon icon={faCircleArrowDown} className={styles.buttonIcon} />
      Download for Guitar Pro
            </a>
          </span>
          <span className={styles.buttonSpan}>
            <button onClick={() => openFile(metadata.gp_url)} className={styles.buttonLink}>
              <FontAwesomeIcon icon={faCirclePlay} className={styles.buttonIcon} />
      Open or Print Pages
            </button>
          </span>
        </div>
        <div className={styles.songTheoryContainer}>
          {metadata.key ? <h3>Key: {metadata.key}</h3> : null}
          {metadata.tempo ? <h3>Tempo: {metadata.tempo}</h3>: null }
          </div>
      </div>
      <div className={styles.songDataContainer}>
        <div className={styles.songInfoContainer}>
          <h3 className={styles.header}>Song Info</h3>
          <p className='text'>Album</p>
          <Image src={metadata.image_url} width={200} height={200} alt='album cover' />
          <h3>{metadata.album}</h3>
          <h3>{metadata.release_date.length === 4 ? metadata.release_date : dateFormatter(metadata.release_date, {includeYear: true})}</h3>
          {metadata.explicit ? <h3 className={styles.explicitTag}>Explicit</h3> : null}

        </div>
        <div className={styles.songInfoContainer}>
          <h3 className={styles.header}>Your Progress</h3>
          {metadata.structure ? metadata.structure.map((section, index) => {return <p key={index}>{section}</p> }) :
            <>
              <p>{`Last Progress Recorded:`}</p>
              <p>{`Full Song, 90% speed`}</p>
              <p>{`Dec 23rd, 2023`}</p>
            </>

          }
        </div>
        <div className={styles.songInfoContainer}>
          <h3 className={styles.header}>Structure</h3>
          {metadata.structure ? metadata.structure.map((section, index) => {return <p key={index}>{section}</p> }) :
                     <>
                     <p>{`Intro`}</p>
                     <p>{`Verse x2`}</p>
                     <p>{`Chorus`}</p>
                     <p>{`Verse`}</p>
                     <p>{`Chorus`}</p>
                    <p>{`Bridge`}</p>
                    <p>{`Chorus x2`}</p>
                   </>
            }
        </div>
      </div>
    </div>
  );
}
