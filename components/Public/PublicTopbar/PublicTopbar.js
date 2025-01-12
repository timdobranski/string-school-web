'use client';

import styles from './PublicTopbar.module.css';
import Link from 'next/link';

export default function PublicTopbar() {

  return (
    <div className={styles.wrapper}>
      <p className={styles.messageText}>String School Mobile App coming soon!</p>
      <div className={styles.contactWrapper}>
        <p className={styles.contactItem} >tim@lamesastringschool.com</p>
        <p className={styles.contactItem} >(619) 663-8461</p>
      </div>
      {/* <Link href='/students/login' className={styles.loginButton}>STUDENT LOGIN</Link> */}
    </div>
  )

}