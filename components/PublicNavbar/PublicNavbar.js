import styles from './PublicNavbar.module.css';
import Link from 'next/link';

export default function PublicNavbar() {

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navLink}>
        <Link href='/'>HOME</Link>
      </div>
      <div className={styles.navLink}>
        <Link href='/public/about-lessons'>ABOUT LESSONS</Link>
      </div>
      <div className={styles.navLink}>
        <Link href='/public/book-intro'>BOOK AN INTRO</Link>
      </div>
      <div className={styles.navLink}>
        <Link href='/public/photos'>PHOTOS</Link>
      </div>
      <div className={styles.navLink}>
        <Link href='/public/about-me'>ABOUT ME</Link>
      </div>
    </div>
  )

}