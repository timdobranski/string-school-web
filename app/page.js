'use client';

import Image from 'next/image';
import styles from './page.module.css';
import InfoCard from '../components/InfoCard/InfoCard';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/navigation';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

export default function Home() {
  const router= useRouter();
  // Modal.setAppElement('#app');


  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);

      } else if (data.session) {
        // Get data from custom user table
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('auth_user_id', data.session.user.id)
          .single();
        // If there is an associated user, and it's Tim, redirect to teacher home
        if (userData && userData.preferred_email === 'tim@lamesastringschool.com') {
          router.push('/teacher/home');
        }
        // If there is an associated user, and it's not Tim, redirect to student home
        else if (userData) {
          router.push('/students/home');
        }
        if (error) {
        // User signed into google, but does not yet exist in supabase; redirect to finish signup
          console.log('error: ', error);
          router.push('/finish-signup');
        } else {

          console.log('No session or error');
        }

      } else {
        console.log('No session');
        router.push('/home')
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
    <h1 className='sectionHeaders'>Checking Login Status...</h1>
  )
}
