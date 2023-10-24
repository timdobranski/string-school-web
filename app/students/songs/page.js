'use client';

import styles from './Songs.module.css';
import { supabase } from '../../../utils/supabase';
import StudentContext, { useAuth } from '../layout.js';
import AlphaTab from '../../../components/AlphaTab/AlphaTab';


export default function Songs() {
  const { user, session, signOut } = useAuth();

  console.log('user:', user);
  console.log('session:', session);

  return (
    <main className='infoCard'>
      <h1>SONGS</h1>
      <AlphaTab scoreData='../../public/tabs/dear-hunter.gpx'/>
    </main>
  )

}