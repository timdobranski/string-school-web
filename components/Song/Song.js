'use client'

import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './song.module.css';
import Image from 'next/image';
import dateFormatter from '../../utils/dateFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown, faCirclePlay, faEllipsis, faX } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import addToRecentSongs from '../../utils/addToRecentSongs';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import Modal from 'react-modal';
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)

export default function Song({ songId, context, student, user }) {
  songId = songId || 159;
  const [showMenu, setShowMenu] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const router = useRouter();

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '60vw',
      margin: '0 auto',
      background: 'linear-gradient(to bottom right, rgb(115, 239, 255), rgb(146, 255, 146))',
      borderRadius: '10px',
      padding: '0',
      zIndex: 1000
      // border: 'none',
    }
  }


  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
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

  // open guitar pro file in alphatab
  const openFile = (file) => {
    if (context !== 'teacher') {
      addToRecentSongs(user, file);
    }
    const fileUrl = `${encodeURIComponent(file)}`;
    router.push(`/students/alphatab-player?title=${file.name}&fileUrl=${fileUrl}`);
  };

  const unmatchModalContent = (
    <div>
      <h1>Song Unmatched!</h1>
    </div>
  )
  const unsuccessfulUnmatchModalContent = (
    <div>
      <h1>There was a problem unmatching this song.</h1>
    </div>
  )
  const handleUnmatchClick = async () => {
    try {
      const response = await fetch(`/api/removeSongMatch?songId=${songId}`, {
        method: 'PATCH',
        // Include any necessary headers, body, etc.
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers your API needs
        },
        body: JSON.stringify({ /* Your request body here */ }),
      });

      if (!response.ok) {
        setModalContent(unsuccessfulUnmatchModalContent);
        setModalIsOpen(true);
        throw new Error('Network response was not ok');
      }
      // Assuming unmatchModalContent is defined somewhere in your component
      setModalContent(unmatchModalContent);
      setModalIsOpen(true);

    } catch (error) {
      console.error('Error in unmatching song:', error);
      // Handle error state here, such as showing an error message to the user
    }
  };
  // Unmatch: remove song's spotify metadata

  // Edit Info:
  // Open modal with form to edit song info (category, name, artist, etc.)

  // Fix Match:
  // Search bar for song title and artist
  // send request to api, return and render search results
  // click correct match, send request to api to update song's spotify metadata


  if (!metadata || metadata.length === 0) { return null }

  return (
    <>
      {context === 'teacher' && (
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Unmatch Modal"
            style={modalStyles}
          >
            {modalContent}
          </Modal>
          <FontAwesomeIcon
            icon={faEllipsis}
            className={styles.settingsIcon}
            onClick={toggleMenu}
          />
          {showMenu && (
            <div className={styles.menu}>
              <FontAwesomeIcon icon={faX} className={styles.closeIcon} onClick={toggleMenu} />
              <button onClick={() => console.log('Fix Match')} className={styles.menuButton}>{`${metadata.artist_data ? 'Fix' : 'Add'} Match`}</button>
              {metadata.artist_data ? <button onClick={handleUnmatchClick} className={styles.menuButton}>Unmatch</button> : null}
              <button onClick={() => console.log('Edit Info')} className={styles.menuButton}>Edit Info</button>
            </div>
          )}
        </div>
      )}

      <div className={styles.songHeader}>
        {metadata.artistData?.images?.[0]?.url && (
          <Image
            className={styles.artistImage}
            src={metadata.artistData.images[0].url}
            width={250}
            height={250}
            alt='Album cover'
          />
        )}
        <h1 className={styles.songTitle}>{metadata.title}</h1>
        <h3 className={styles.songArtist}>{metadata.artist}</h3>
        {metadata.audio_url && <AudioPlayer audioId={metadata.id} />}
        {metadata.updated_at && (
          <p className='text'>
            Pages last updated <ReactTimeAgo date={metadata.updated_at} locale="en-US" />
          </p>
        )}
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
      </div>

      <div className={styles.songDataContainer}>
        {metadata.artist_data ? (
          <div className={styles.songInfoContainer}>
            <h3 className={styles.header}>Song Info</h3>
            <p className='text'>Album</p>
            {metadata.image_url && (
              <Image src={metadata.image_url} width={200} height={200} alt='Album cover' />
            )}
            <h3>{metadata.album}</h3>
            {metadata.release_date && (
              <h3>{metadata.release_date.length === 4 ? metadata.release_date : dateFormatter(metadata.release_date, {includeYear: true})}</h3>
            )}
            {metadata.explicit && <h3 className={styles.explicitTag}>Explicit</h3>}
            {metadata.key && <h3>Key: {metadata.key}</h3>}
            {metadata.tempo && <h3>Tempo: {metadata.tempo}</h3>}
          </div>
        ) : (
          <div className={styles.songInfoContainer}>
            <p className='text'>No song info available - song not matched in Spotify</p>
          </div>
        )}

        <div className={styles.songInfoContainer}>
          <h3 className={styles.header}>Your Progress</h3>
          {metadata.structure ? metadata.structure.map((section, index) => (
            <p key={index}>{section}</p>
          )) : 'No progress has been recorded for this song yet'}
        </div>

        <div className={styles.songInfoContainer}>
          <h3 className={styles.header}>Structure</h3>
          {metadata.structure ? metadata.structure.map((section, index) => (
            <p key={index}>{section}</p>
          )) : 'The structure of this song hasn\'t been added yet'}
        </div>
      </div>
    </>
  );
}
