import styles from './StudentNavbar.module.css';
import Link from 'next/link';

export default function StudentNavbar() {

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
    </div>
  )
}