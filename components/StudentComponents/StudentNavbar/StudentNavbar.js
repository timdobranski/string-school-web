import styles from './StudentNavbar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import StudentContext, { useAuth } from '../../../app/students/layout.js';

export default function StudentNavbar() {

  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();

  if (googleUserData) {
    return (
      <div className={styles.navbarContainer}>
        <Link href='/students/home'>
          <h3 className={styles.navLink}>HOME</h3>
        </Link>
        <Link href='/students/scheduling'>
          <h3 className={styles.navLink}>SCHEDULING</h3>
        </Link>
        <Link href='/students/songs'>
          <h3 className={styles.navLink}>SONGS</h3>
        </Link>
        <Link href='/students/settings'>
          <div className={styles.navLink}>SETTINGS</div>
        </Link>
        <div className={styles.profileImgContainer}>
          <Image src={googleUserData.user_metadata.picture} alt="Student Photo" fill='true' />
        </div>
      </div>
    )
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}