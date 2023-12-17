import React, { useRef, useState, useEffect } from 'react';
import styles from './AudioPlayer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown, faCirclePlay, faCirclePause , faVolumeOff } from '@fortawesome/free-solid-svg-icons';

const AudioPlayer = ({ audioId }) => {
  const audioUrl = `/api/streamAudio?id=${audioId}`;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1.0);

  // Play/Pause Toggle
  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (prevValue) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  // Handle Volume Change
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  // Update Progress
  const handleProgress = () => {
    const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(currentProgress);
    setCurrentTime(audioRef.current.currentTime);
  };

  // Seek
  const handleSeek = (e) => {
    const seekValue = e.target.value; // This should be a percentage
    const seekTime = (audioRef.current.duration / 100) * seekValue;
    audioRef.current.currentTime = seekTime;
    setProgress(seekValue);
  };

  // Speed Control
  const changeSpeed = (event) => {
    const newSpeed = parseFloat(event.target.value); // Convert the value to a float
    setSpeed(newSpeed);
    audioRef.current.playbackRate = newSpeed; // Apply the speed to the audio element
  };

  // Load Metadata
  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', handleProgress);

    return () => {
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', handleProgress);
    };
  }, []);

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" className={styles.audioElement} />
      <div className={styles.col1}>
        <FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} onClick={togglePlayPause} className={styles.playPauseIcon} />
      </div>
      <div className={styles.col2}>
        <div className={styles.progressBarContainer}>
          <span className={styles.time}> {new Date(currentTime * 1000).toISOString().substr(14, 5)}</span>
          <input type="range" min="0" max="100" value={progress} onChange={handleSeek} className={styles.progressBar} />
          <span className={styles.time}>
            {new Date(duration * 1000).toISOString().substr(14, 5)}
          </span>
        </div>
        <div className={styles.speedControlContainer}>
          <label className={styles.speedLabel}>Speed: </label>
          <select value={speed} onChange={changeSpeed} className={styles.speedControl}>
            {[0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map(speedOption => (
              <option key={speedOption} value={speedOption}>{speedOption * 100}%</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.col3}>
        <div className={styles.volumeControl}>
          <FontAwesomeIcon icon={faVolumeOff} className={styles.volumeIcon} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className={styles.volumeSlider}
            orient="vertical"
          />

          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className={styles.volumeSlider} />
        </div>
        <a href={audioUrl} download className={styles.downloadButton}>
          <FontAwesomeIcon icon={faCircleArrowDown} className={styles.downloadIcon} />
        </a>
      </div>
    </div>
  );
};

export default AudioPlayer;
