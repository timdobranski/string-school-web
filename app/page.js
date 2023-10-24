'use client';

import Image from 'next/image';
import styles from './page.module.css';
import InfoCard from '../components/InfoCard/InfoCard';
import { useEffect, useState } from 'react';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/navigation';
import PublicNavbar from '../components/PublicNavbar/PublicNavbar';

export default function Home() {
  // const supabase = createClientComponentClient();
  const router= useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);
      } else if (data.session) {
        console.log('Session:', data);
        // Redirect to another page
        router.push('/students/home');
      } else {
        console.log('No session');
      }
    };
  checkSession();
  }, []);


  return (
    <main className='appContainer'>
      <div className='infoCard'>
        <PublicNavbar />
      </div>

      <div className='infoCard'>
        <h1>Welcome!</h1>
      </div>
    </main>
  )
}
