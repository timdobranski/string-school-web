'use client';

import { useState, useEffect } from 'react';
import StudentContext, { useAuth } from '../../layout.js';
import setPracticeLog from '../../../../utils/setPracticeLog';

import styles from './timer.module.css'

export default function Timer() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [practiceLogNote, setPracticeLogNote] = useState('');
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  function handleStart() {
    setIsActive(true);
    setIsPaused(false);
  }

  function handlePauseResume() {
    setIsPaused(!isPaused);
  }

  function handleReset() {
    setIsActive(false);
    setTime(0);
  }

  function handleSave() {
    if (practiceLogNote.length === 0) {

    }
  }

  return (
    <div className='infoCard'>
    <div className={styles.timer}>
      <h1 className={styles.displayedTime}>{time}s</h1>
      <div className={styles.timerControlButtonsContainer}>
        <button className='featureButton' onClick={handleStart}>Start</button>
        <button className='featureButton' onClick={handlePauseResume}>{isPaused ? 'Resume' : 'Pause'}</button>
        <button className='featureButton' onClick={handleReset}>Reset</button>
      </div>
    </div>
    <div className={styles.noteContainer}>
      <h2 className={styles.noteHeader}>Note</h2>
      <p className={styles.noteDirections}>{`Add a note about what you were practicing, accomplishments, or anything else you'd like to track here`}</p>
      <input
          className={styles.noteInput}
          type="text"
          value={practiceLogNote}
          onChange={(e) => setPracticeLogNote(e.target.value)}
          placeholder={`(Optional)`}

      ></input>
      <button className='featureButton' onClick={handleSave}>Save Session</button>
    </div>

    </div>
  );
}