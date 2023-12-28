'use client';
import styles from './browseSongs.module.css';
import SongBrowser from '../../../../components/SongBrowser/SongBrowser.js';

export default function BrowseSongs() {
  const folderOptions = ['Musical Artists', 'Holiday Songs', 'Movies, TV, & Games', 'Kids Songs']



  return (
    <div>
      <SongBrowser folderOptions={folderOptions}/>
    </div>
  )

}