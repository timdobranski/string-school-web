'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './PublicFooter.module.css';
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';


export default function PublicHeader() {

  return (
    <div className={styles.wrapper}>

      {/* <div className={styles.socialMedia}>
        <FontAwesomeIcon icon={faYoutube} className={styles.icon} />
        <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
        <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
        <FontAwesomeIcon icon={faTiktok} className={styles.icon} />
      </div> */}

      <img src="/images/logos/final-title-white.png" alt="La Mesa String School Logo" className={styles.logo}/>
      {/* <p className={styles.text}>Copyright 2024, Tim Dobranski</p> */}
    </div>
  )

}