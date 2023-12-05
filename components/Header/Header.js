'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/logo.png';
import logoWhite from '../../public/images/logo-white-bg.png';
import styles from './Header.module.css';
import  { supabase } from '../../utils/supabase';
import { useEffect, useState } from 'react';


export default function Header() {
  const [signedIn, setSignedIn] = useState(false);
  const [picture, setPicture] = useState(null);


  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (event === 'SIGNED_IN' ) {
        setPicture(session.user.user_metadata.picture);
        setSignedIn(true);
      }
      if (event === 'SIGNED_OUT') {
        setSignedIn(false);
        setPicture(null);
      }
    });

  }, []);

  const loginButton = ( <Link href='/login' className={styles.loginButton} id={styles.loginButton}>Sign In</Link>)
  const settingsButton = (
    <Link href='/students/settings'>
      <div className={styles.profileImgContainer}>
        <Image src={picture} alt="Student Photo" fill='true' sizes="(max-width: 768px) 50px, 50px" />
      </div>
    </Link>
  )


  return (
    <div id={styles.headerContainer}>
      <Link href='/' id={styles.homeButton}>
        <div id={styles.logoContainer}>
          <Image src={logo} fill='true' alt="La Mesa String School Logo" priority='true' />
        </div>
      </Link>



      {signedIn ? settingsButton : loginButton}
    </div>
  )
}