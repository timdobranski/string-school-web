'use client';

import styles from './settings.module.css';
import { supabase } from '../../../utils/supabase.js';
import  { useRouter } from 'next/navigation';

export default function StudentSettings() {
  const router = useRouter();

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log('error on signout: ', error);
    router.push('/')
  }

  return (
    <div className='infoCard'>
      <h1>Settings</h1>
      <button className='button' onClick={handleSignout}>Sign Out</button>
    </div>
  )
}