'use client';

import { useState, useEffect } from 'react';
import styles from './SongBrowser.module.css';

export default function SongBrowser({ folderOptions }) {
  const [filepath, setFilepath] = useState('Choose Category');
  const [folderContents, setFolderContents] = useState([]);
  const [folderContentsRender, setFolderContentsRender] = useState((<>Loading...</>));

  useEffect(() => {
    setFilepath('Choose Category');
  }, [])
  // fetch folder contents of filepath
  useEffect(() => {
    console.log('filepath: ', filepath );
    if (filepath === 'Choose Category') { return; }
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/listStorageFolder?folderPath=${encodeURIComponent('guitar-pro/' + filepath)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();

        // Fetch song data for each file concurrently
        const fetchSongDataPromises = data.map(async (file) => {
          if (!file.id) {
            return file; // If no id, return the file as is
          }

          try {
            const response = await fetch(`/api/getSongIdFromStoragePath?filepath=${encodeURIComponent('guitar-pro/' + filepath + '/' + file.name)}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const songData = await response.json();
            return { ...file, song_table_data: songData.songs }; // Merge song data into file
          } catch (error) {
            console.error('Error fetching song data:', error);
            return file; // Return file without song data in case of error
          }
        });

        // Wait for all song data fetches to complete
        data = await Promise.all(fetchSongDataPromises);

        setFolderContents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filepath]);

  // render jsx for folder contents
  useEffect(() => {
    const render = (
      folderContents.map((file, i) => {
        console.log('file or folder: ', file)
        // if there is an id, it's a gp file return a link to the song page
        if (file.id) {
          console.log('file: ', file.song_table_data);
          // this is the return for gp_files
          return (
            <a key={i}className={styles.folderLink} href={`/students/songs/song?id=${file.song_table_data.id}`}>
              <p className={styles.label}>Song</p>
              <p className={styles.folderName}>{file.song_table_data.title}</p>
            </a>
          )
        }
        // if no id value, it's a folder. Give it a label for its type (artist, holiday, game, etc)
        // and add click handler to change filepath
        const folderType = filepath.split('/').pop();
        let label;
        switch (folderType) {
        case 'Musical Artists':
          label = 'Artist';
          break;
        case 'Movies, TV, & Games':
          label = 'Movie, TV, or Game';
          break;
        case 'Holidays':
          label = 'Holidays';
          break;
        case 'Kids Songs':
          label = ''; // or you can use 'Kids Songs' if you want to label it as such
          break;
        default:
          label = folderType; // or handle unknown folder types differently if needed
        }
        // this is the return for folders
        return (
          <div
            className = {styles.folderLink}
            key ={i}
            onClick={() => {setFilepath(prev => prev + '/' + file.name)}}
          >
            <p className={styles.label}>{label}</p>
            <p className={styles.folderName}>{file.name}</p>
          </div>
        )}
      )
    );
    setFolderContentsRender(render);
  }, [folderContents]);

  const handleSelectChange = (event) => {
    setFilepath(event.target.value);
  };

  const select = (
    <select
      className={styles.folderSelect}
      value={filepath} // Controlled component
      onChange={handleSelectChange} // Event handler for onChange
    >
      {folderOptions.map((folder, i) => {
        return (
          <option key={i} className={styles.folderOption} value={folder}>{folder}</option>
        )
      })}
    </select>
  );

  if (folderContentsRender && folderContentsRender.length !== (<>Loading...</>)) {
    return (
      <div className='infoCard'>
        <h1>Browse Songs</h1>
        {select}
        <div className={styles.folderContentsContainer}>
          {filepath === 'Choose Category' ? null : folderContentsRender}
        </div>
      </div>
    )
  }
}