'use client';

import Image from 'next/image';
import styles from './page.module.css';
import InfoCard from '../components/InfoCard/InfoCard';
import { useEffect, useState } from 'react';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/navigation';
import PublicNavbar from '../components/PublicNavbar/PublicNavbar';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
config.autoAddCss = false;

export default function Home() {
  const router= useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);
      } else if (data.session) {
        console.log('data.session.user.id: ', data.session.user.id)
        // Get data from custom user table
        const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', data.session.user.id)
        .single();
      // If there is an associated user, redirect to home
      if (userData) {
        console.log('userData: ', userData);
        router.push('/students/home');
      }
       if (error) {
        // Redirect to finish signup
        console.log('error: ', error);
        router.push('/finish-signup');
      } else {
        console.log('No session or error');
      }

      } else {
        console.log('No session');
      }
    };
  checkSession();
  }, []);

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log('error on signout: ', error);
    router.push('/')
  }

  return (
    <main className='appContainer'>
      <div className='infoCard'>
        <PublicNavbar />
      </div>

      <div className='infoCard'>
        <h1>Welcome!</h1>
      </div>
      <button onClick={handleSignout}>Sign Out</button>
    </main>
  )
}
