'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './PublicHeader.module.css';
import { supabase } from '../../../utils/supabase';
import { useEffect, useState, useRef } from 'react';
import PublicTopbar from '../PublicTopbar/PublicTopbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faHouse, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;


export default function PublicHeader() {
  const [signedIn, setSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [picture, setPicture] = useState(null);
  const pathname = usePathname(); // Get the current route
  const isStudentOrTeacherPage = pathname.startsWith('/students') || pathname.startsWith('/teacher');
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSettingsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  // const createNavLink = (href, text, dropdown = false, icon = null) => (
  //   <div className={dropdown ? styles.flexRow : styles.navLink}>
  //     {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />} {/* Only render if icon is passed */}
  //     <Link href={href} className={isActive(href)}>
  //       {text}
  //     </Link>
  //   </div>
  // );

  const createNavLink = (href, text, dropdown = false, icon = null, onClick = null) => (
    <div
      className={dropdown ? styles.flexRow : styles.navLink} // Correct classnames from the top version
      onClick={onClick ? onClick : null} // Correct functionality from the bottom version
    >
      {/* Only render the icon if passed */}
      {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}

      {/* Conditionally render a span for onClick or a Link for regular navigation */}
      {onClick ? (
        <span className={styles.linkText}>{text}</span> // Keeps the look the same as other links
      ) : (
        <Link href={href} className={isActive(href)}>
          {text}
        </Link>
      )}
    </div>
  );



  const settingsHref = userEmail === 'tim@lamesastringschool.com' ? '/teacher/settings' : '/student/settings';

  const settingsButton = (
    <div
      className={styles.settingsButton}
      ref={dropdownRef}
      onClick={() => setSettingsDropdownOpen(!settingsDropdownOpen)}
    >
      {/* Profile Image */}
      <div className={styles.profileImgContainer}>
        <Image
          src={picture}
          alt="User Photo"
          fill
          sizes="(max-width: 768px) 50px, 50px"
        />
      </div>

      {/* Dropdown Content */}
      {settingsDropdownOpen && (
        <div className={styles.settingsDropdown}>
          {/* Dynamic Home Link based on email */}
          {createNavLink(
            userEmail === 'tim@lamesastringschool.com' ? '/teacher/home' : '/students/home',
            'HOME',
            true,
            faHouse
          )}

          {/* Settings Link */}
          {createNavLink(
            settingsHref, // Dynamic settings based on user type
            'SETTINGS',
            true,
            faGear
          )}

          {/* Logout Button Styled Correctly */}
          {createNavLink(
            '#', // Use # to prevent navigation
            'LOG OUT',
            true,
            faRightFromBracket,
            async () => {
              await supabase.auth.signOut();
              window.location.href = '/'; // Redirect after logout if necessary
            }
          )}
        </div>
      )}
    </div>
  );


  const publicLinks = (
    <>
      <div className={styles.navLinkContainer}>
        <div className={styles.navLink}>
          <Link href="/home" className={isActive('/home')}>
            HOME <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
          </Link>
        </div>
        <div className={styles.dropdown}>
          {createNavLink('/home#stringSchoolApp', 'THE STRING SCHOOL APP', true)}
          {createNavLink('/home#concerts', 'STUDENT CONCERTS', true)}
          {createNavLink('/home#studio', 'STUDIO', true)}
          {createNavLink('/home#progress', 'PROGRESS TRACKING', true)}
          {createNavLink('/home#book', 'TEXTBOOK', true)}
          {createNavLink('/home#stringsmith', 'STRINGSMITH', true)}
          {createNavLink('/home#guitarPro', 'GUITAR PRO 8', true)}
          {createNavLink('/home#future', 'THE FUTURE', true)}
        </div>
      </div>

      <div className={styles.navLinkContainer}>
        <div className={styles.navLink}>
          <Link href="/about-lessons" className={isActive('/about-lessons')}>
            LESSON INFO <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
          </Link>
        </div>
        <div className={styles.dropdown}>
          {createNavLink('/about-lessons#approach', 'TEACHING APPROACH', true)}
          {createNavLink('/about-lessons#details', 'WHEN, WHERE & HOW MUCH', true)}
          {createNavLink('/about-lessons#policies', 'ATTENDANCE POLICIES', true)}
          {createNavLink('/about-lessons#studio', 'SEE THE STUDIO', true)}
          {createNavLink('/about-lessons#tim', 'ABOUT ME', true)}
        </div>
      </div>

      {createNavLink('/reviews', 'REVIEWS')}
      {createNavLink('/concerts', 'CONCERTS')}
      {createNavLink('/student-stuff-temp', 'STUDENTS')}
      <div className={styles.bookingLink}>
        <Link href="/contact">SCHEDULE A FREE&nbsp;INTRO</Link>
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
      {createNavLink('/teacher/home', 'HOME')}
      {createNavLink('/home', 'PUBLIC HOME')}
      {/* {createNavLink('/teacher/home', 'HOME')} */}
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
        {/* Show public links when not on /students or /teacher */}
        {!isStudentOrTeacherPage && publicLinks}

        {/* Show student or teacher links when signed in and on student/teacher pages */}
        {isStudentOrTeacherPage && signedIn && userEmail === 'tim@lamesastringschool.com' && teacherLinks}
        {isStudentOrTeacherPage && signedIn && userEmail !== 'tim@lamesastringschool.com' && studentLinks}
        {signedIn ? settingsButton : null}
      </div>
    </div>
  );
}
