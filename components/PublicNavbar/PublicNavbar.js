import styles from './PublicNavbar.module.css';
import Link from 'next/link';

export default function PublicNavbar() {

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navLink}>
        <Link href='/'>HOME</Link>
      </div>
      <div className={styles.navLink}>
        <Link href='/'>ABOUT LESSONS</Link>
      </div>
      <div className={styles.navLink}>
        <Link href='/'>BOOK AN INTRO</Link>
      </div>
      <div className={styles.navLink}>
        <Link href='/'>PHOTOS</Link>
      </div>
      <div className={styles.navLink}>
        <Link href='/'>ABOUT ME</Link>
      </div>




    </div>
  )

}