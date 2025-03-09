'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './PublicHeader.module.css';
import { supabase } from '../../../utils/supabase';
import { useEffect, useState } from 'react';
import PublicTopbar from '../PublicTopbar/PublicTopbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function PublicHeader() {
  const [signedIn, setSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [picture, setPicture] = useState(null);
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log('error: ', error);
      }

      if (data && data.session) {
        setSignedIn(true);
        setUserEmail(data.session.user.email);
        setPicture(data.session.user.user_metadata.avatar_url);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setSignedIn(false);
        setUserEmail(null);
        setPicture(null);
      }
    });

  }, []);

  // Function to check if the current link is active
  const isActive = (href) => pathname.startsWith(href) ? styles.currentPageLink : '';

  const loginButton = (
    <Link href="/login" className={`${styles.loginButton} ${isActive('/login')}`} id={styles.loginButton}>
      Sign In
    </Link>
  );

  const settingsHref = userEmail === 'tim@lamesastringschool.com' ? '/teacher/settings' : '/student/settings';
  const settingsButton = (
    <Link href={settingsHref} className={`${isActive(settingsHref)}`}>
      <div className={styles.profileImgContainer}>
        <Image src={picture} alt="User Photo" fill="true" sizes="(max-width: 768px) 50px, 50px" />
      </div>
    </Link>
  );

  const createNavLink = (href, text) => (
    <div className={styles.navLink}>
      <Link href={href} className={`${isActive(href)}`}>
        {text}
      </Link>
    </div>
  );

  const publicLinks = (
    <>
      <div className={styles.navLinkContainer}>
        <div className={styles.navLink}>
          <Link href="/home" className={isActive('/home')}>
            FEATURES <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
          </Link>
        </div>
        <div className={styles.dropdown}>
          {createNavLink('/home#stringSchoolApp', 'THE STRING SCHOOL APP')}
          {createNavLink('/home#concerts', 'STUDENT CONCERTS')}
          {createNavLink('/home#studio', 'STUDIO')}
          {createNavLink('/home#progress', 'PROGRESS TRACKING')}
          {createNavLink('/home#book', 'TEXTBOOK')}
          {createNavLink('/home#stringsmith', 'STRINGSMITH')}
          {createNavLink('/home#guitarPro', 'GUITAR PRO 8')}
          {createNavLink('/home#future', 'THE FUTURE')}
        </div>
      </div>

      <div className={styles.navLinkContainer}>
        <div className={styles.navLink}>
          <Link href="/about-lessons" className={isActive('/about-lessons')}>
            LESSON INFO <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
          </Link>
        </div>
        <div className={styles.dropdown}>
          {createNavLink('/about-lessons#approach', 'TEACHING APPROACH')}
          {createNavLink('/about-lessons#details', 'WHEN, WHERE & HOW MUCH')}
          {createNavLink('/about-lessons#policies', 'ATTENDANCE POLICIES')}
          {createNavLink('/about-lessons#studio', 'SEE THE STUDIO')}
          {createNavLink('/about-lessons#tim', 'ABOUT ME')}
        </div>
      </div>

      {createNavLink('/reviews', 'REVIEWS')}
      {createNavLink('/student-stuff-temp', 'STUDENTS')}
      <div className={styles.bookingLink}>
        {createNavLink('/contact', 'SCHEDULE A FREE INTRO')}
      </div>
    </>
  );

  const studentLinks = (
    <>
      {createNavLink('/students/home', 'HOME')}
      {createNavLink('/students/scheduling', 'SCHEDULING')}
      {createNavLink('/students/songs', 'SONGS')}
      {createNavLink('/students/resources', 'RESOURCES')}
      {createNavLink('/students/progress', 'PROGRESS')}
      {createNavLink('/students/practice', 'PRACTICE')}
      {createNavLink('/students/payments', 'PAYMENTS')}
      {createNavLink('/students/announcements', 'ANNOUNCEMENTS')}
    </>
  );

  const teacherLinks = (
    <>
      {createNavLink('/teacher/dashboard', 'HOME')}
    </>
  );

  const teacherTitle = (
    <h1 className={`smallerSectionTitleWhite ${styles.teacherTitle}`}>TEACHER HOME</h1>
  );

  return (
    <div className={styles.headerContainer}>
      {/* Left side of header */}
      <div className={styles.leftSideNav}>
        <div className={styles.logoWrapper}>
          <Link href="/home">
            <img src="/images/logos/final-title-white.png" alt="La Mesa String School Logo" className={styles.logo} />
          </Link>
        </div>
      </div>

      {/* Right side of header */}
      <div className={styles.rightSideNav}>
        {!signedIn && publicLinks}
        {signedIn && userEmail === 'tim@lamesastringschool.com' && teacherTitle}
        {signedIn && userEmail !== 'tim@lamesastringschool.com' && studentLinks}
        {signedIn ? settingsButton : loginButton}
      </div>
    </div>
  );
}
