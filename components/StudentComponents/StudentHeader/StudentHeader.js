'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/images/logos/final-title.png';
import logoWhite from '../../../public/images/logos/final-title-white.png';
import styles from './StudentHeader.module.css';
import  { supabase } from '../../../utils/supabase';
import { useEffect, useState } from 'react';
import StudentNavbar from '../StudentNavbar/StudentNavbar';


export default function StudentHeader() {
  const [signedIn, setSignedIn] = useState(false);
  const [picture, setPicture] = useState(null);


  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error){ console.log('error: ', error) }

      if (data && data.session) {
        console.log('data: ', data);
        setSignedIn(true);
        setPicture(data.session.user.user_metadata.avatar_url);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setSignedIn(false);
        setPicture(null);
      }
    })
  }, [])

  const loginButton = ( <Link href='/login' className={styles.loginButton} id={styles.loginButton}>Sign In</Link>)
  const settingsButton = (
    <Link href='/students/settings'>
      <div className={styles.profileImgContainer}>
        <Image src={picture} alt="Student Photo" fill='true' sizes="(max-width: 768px) 50px, 50px" />
      </div>
    </Link>
  )


  return (
    <div className={styles.headerContainer}>
      <Link href='/' className={styles.homeButton}>
        {/* <div className={styles.logoContainer}> */}
        <img src={'/images/logos/final-title-white.png'}  alt="La Mesa String School Logo" className={styles.logo}/>
        {/* </div> */}
      </Link>

      <div className={styles.headerRightSideWrapper}>
        <StudentNavbar />
        {signedIn ? settingsButton : loginButton}
      </div>
    </div>
  )
}