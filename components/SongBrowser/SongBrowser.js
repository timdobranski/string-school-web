'use client';

import { useState, useEffect } from 'react';
import styles from './SongBrowser.module.css';

export default function SongBrowser({ folderOptions }) {
  const [filepath, setFilepath] = useState('Musical Artists');
  const [folderContents, setFolderContents] = useState([]);
  const [folderContentsRender, setFolderContentsRender] = useState((<>Loading...</>));

  useEffect(() => {
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

  useEffect(() => {
    const render = (
      folderContents.map((file, i) => {
        console.log('file or folder: ', file)
        // if there is an id, return a link to the song page
        if (file.id) {
          console.log('file: ', file.song_table_data);
          return (
            <a key={i}className={styles.songLink} href={`/students/songs/song?id=${file.song_table_data.id}`}>{file.song_table_data.title}</a>
          )
        }
        // if no id value, it's a folder. Add click handler to change filepath
        return (
          <h3
            key ={i}
            onClick={() => {setFilepath(prev => prev + '/' + file.name)}}
          >{file.name}</h3>
          // </div>
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
        {folderContentsRender}
      </div>
    )
  }
}