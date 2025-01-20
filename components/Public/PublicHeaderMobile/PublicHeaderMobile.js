'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './PublicHeaderMobile.module.css';
import  { supabase } from '../../../utils/supabase';
import { useEffect, useState } from 'react';
import PublicTopbar from '../PublicTopbar/PublicTopbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons';


export default function PublicHeaderMobile() {
  const [signedIn, setSignedIn] = useState(false);
  const [picture, setPicture] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };


  return (
    <div className={styles.headerContainer}>
      {/* <PublicNavbar /> */}

      {/* left side of header */}

      <div className={styles.logoWrapper}>
        <Link href='/public/home' onClick={handleCloseMenu}>
          <img src='/images/logos/final-title.png' alt="La Mesa String School Logo" className={styles.logo}/>
        </Link>
      </div>

      <div className={styles.menuHandleIconWrapper} onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={faBars} className={styles.menuIcon} />
      </div>

      <div className={`${styles.navTray} ${menuOpen ? styles.menuOpen : styles.menuClosed}`}>

        <div className={styles.navTrayLogoWrapper}>
          <Link href='/public/home'>
            <img src='/images/logos/final-title-white.png' alt="La Mesa String School Logo" className={styles.logo}/>
          </Link>
          <div className={styles.backIconWrapper} onClick={() => setMenuOpen(!menuOpen)}>
            <FontAwesomeIcon icon={faChevronRight} className={styles.backIcon} />
          </div>

        </div>


        <div className={styles.navLink}>
          <Link href="/public/home#book" onClick={handleCloseMenu}>FEATURES
          </Link>
        </div>

        <div className={styles.navLinkContainer}>
          <div className={styles.navLink}>
            <Link href="/public/about-lessons" onClick={handleCloseMenu}>LESSON INFO
            </Link>
          </div>
        </div>

        <div className={styles.navLinkContainer}>
          <div className={styles.navLink}>
            <Link href="/public/reviews" onClick={handleCloseMenu}>REVIEWS</Link>
          </div>
        </div>

        {/* <div className={styles.navLink}>
          <Link href='/public/about-me'>ABOUT ME</Link>
        </div> */}

        <div className={styles.navLink}>
          <Link href='/students/login' onClick={handleCloseMenu}>STUDENT LOGIN</Link>
        </div>

      </div>

      {/* <div className={styles.bookingLink}>
          <Link href='/public/book-intro'>BOOK AN INTRO</Link>
        </div> */}


      {/* {signedIn ? settingsButton : loginButton} */}


    </div>
  )
}