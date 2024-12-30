'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/logo.png';
import logoWhite from '../../public/images/logo-white-bg.png';
import styles from './PublicHeader.module.css';
import  { supabase } from '../../utils/supabase';
import { useEffect, useState } from 'react';
import PublicTopbar from '../PublicTopbar/PublicTopbar';


export default function PublicHeader() {
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
      {/* <PublicNavbar /> */}

      {/* left side of header */}
      <div className={styles.leftSideNav}>
        <div className={styles.logoWrapper}>
          <Link href='/public/home'>
            <img src='/images/logos/logo-black.png' alt="La Mesa String School Logo" className={styles.logo}/>
          </Link>

          <Link href='/' className={styles.homeButton}>
            <img src={'/images/logos/title-black-2.png'}  alt="La Mesa String School Logo" className={styles.titleLogo}/>
          </Link>

        </div>

      </div>

      {/* title logo in the center */}
      {/* <Link href='/' className={styles.homeButton}>
        <img src={'/images/logos/title-black-2.png'}  alt="La Mesa String School Logo" className={styles.titleLogo}/>
      </Link> */}

      {/* <Link href='/' className={styles.homeButton}>
        <h1 className={styles.title}>STRING SCHOOL</h1>
      </Link> */}

      {/* right side of header */}
      <div className={styles.rightSideNav}>
        {/* <div className={styles.navLink}>
        <Link href='/public/photos'>PHOTOS</Link>
      </div> */}

        {/* <div className={styles.navLink}>
        <Link href='/public/photos'>CONCERTS</Link>
      </div>

      <div className={styles.navLink}>
        <Link href='/public/photos'>RECORDING</Link>
      </div> */}
        <div className={styles.navLink}>
          <Link href='/public/home#why'>FEATURES</Link>
        </div>

        <div className={styles.navLink}>
          <Link href='/public/about-lessons'>LESSON INFO</Link>
        </div>

        <div className={styles.navLink}>
          <Link href='/public/about-me'>REVIEWS</Link>
        </div>

        <div className={styles.navLink}>
          <Link href='/public/about-me'>ABOUT ME</Link>
        </div>



        <div className={styles.bookingLink}>
          <Link href='/public/book-intro'>BOOK AN INTRO</Link>
        </div>

      </div>


      {/* {signedIn ? settingsButton : loginButton} */}


    </div>
  )
}