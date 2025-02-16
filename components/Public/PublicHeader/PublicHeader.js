'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './PublicHeader.module.css';
import  { supabase } from '../../../utils/supabase';
import { useEffect, useState } from 'react';
import PublicTopbar from '../PublicTopbar/PublicTopbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


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
          <Link href='/home'>
            <img src='/images/logos/final-title-white.png' alt="La Mesa String School Logo" className={styles.logo}/>
            {/* <img src='/images/logos/icon-blue-background.png' alt="La Mesa String School Logo" className={styles.iconLogo}/> */}

          </Link>
{/*
          <Link href='/' className={styles.homeButton}>
            <img src={'/images/logos/logo-title-2.png'}  alt="La Mesa String School Logo" className={styles.titleLogo}/>
          </Link> */}

        </div>

      </div>


      <div className={styles.rightSideNav}>

        <div className={styles.navLinkContainer}>
          <div className={styles.navLink}>
            <Link href="/home">FEATURES
              <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
            </Link>
          </div>
          <div className={styles.dropdown}>
            <Link href="/home#book">THE BOOK</Link>
            <Link href="/home#stringSchoolApp">THE STRING SCHOOL APP</Link>
            <Link href="/home#concerts">STUDENT CONCERTS</Link>
            <Link href="/home#studio">STUDIO</Link>
            <Link href="/home#progress">PROGRESS TRACKING</Link>
            <Link href="/home#stringsmith">STRINGSMITH</Link>
            <Link href="/home#guitarPro">GUITAR PRO 8</Link>
            <Link href="/home#future">THE FUTURE</Link>
          </div>
        </div>
        <div className={styles.navLinkContainer}>
          <div className={styles.navLink}>
            <Link href="/about-lessons">LESSON INFO
              <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
            </Link>
          </div>
          <div className={styles.dropdown}>
            <Link href="/about-lessons#approach">TEACHING APPROACH</Link>
            <Link href="/about-lessons#details">WHEN, WHERE & HOW MUCH</Link>
            <Link href="/about-lessons#policies">ATTENDANCE POLICIES</Link>
            <Link href="/about-lessons#studio">SEE THE STUDIO</Link>
            <Link href="/about-lessons#tim">ABOUT ME</Link>
          </div>
        </div>

        <div className={styles.navLinkContainer}>
          <div className={styles.navLink}>
            <Link href="/reviews">REVIEWS</Link>
          </div>
          {/* <div className={styles.dropdown}>
            <Link href="/public/about-me#section1">TEACHING APPROACH</Link>
            <Link href="/public/about-me#section2">WHEN, WHERE & HOW MUCH</Link>
            <Link href="/public/about-me#section3">ATTENDANCE POLICIES</Link>
            <Link href="/public/about-me#section3">PHOTOS & VIDEOS</Link>
          </div> */}
        </div>

        {/* <div className={styles.navLink}>
          <Link href='/public/about-me'>ABOUT ME</Link>
        </div> */}

        <div className={styles.navLink}>
          <Link href='/student-stuff-temp'>STUDENTS</Link>
        </div>


        <div className={styles.bookingLink}>
          <Link href='/book-intro'>SCHEDULE A FREE INTRO</Link>
        </div>

      </div>


      {/* {signedIn ? settingsButton : loginButton} */}


    </div>
  )
}