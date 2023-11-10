'use client';

import styles from './Songs.module.css';
import { supabase } from '../../../utils/supabase';
import StudentContext, { useAuth } from '../layout.js';
// import AlphaTab from '../../../components/AlphaTab/AlphaTab';



export default function Songs() {
  const { user, session, signOut } = useAuth();

  console.log('user:', user);
  console.log('session:', session);


  // const searchHandler = async () => {

  // }




  return (
    <main className='infoCard'>
      <h1 className='sectionHeaders'>SONGS</h1>

      <h2 className='featureHeaders'>Recent Songs</h2>

      <h2 className='featureHeaders'>Search The Song Library</h2>

      <h2 className='featureHeaders'>Browse By Artist</h2>

      <h2 className='featureHeaders'>Browse By Category</h2>

    </main>
  )

}