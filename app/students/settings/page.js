'use client';

import styles from './settings.module.css';
import { supabase } from '../../../utils/supabase.js';
import  { useRouter } from 'next/navigation';

export default function StudentSettings() {
  const router = useRouter();

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut({
      options: {
        scope: 'global'
      }
    });
    if (error) {
      console.log('error on signout: ', error);
    } else {
      router.push('/')
    }
  }

  return (
    <div className='infoCard'>
      <h1>Settings</h1>
      <div className={styles.toDo}>
        <h2 className='featureHeaders'>This Page Needs</h2>

        <p>Update Info (user: name, email, phone, comm preference, google calendar lesson notifications )</p>
        <p>Update Info (student: name, practice tracking)</p>

        <p>Link Google</p>
        <p>Link Spotify</p>

      </div>
      <button className='button' onClick={handleSignout}>Sign Out</button>
    </div>
  )
}