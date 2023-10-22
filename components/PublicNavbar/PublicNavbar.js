import styles from './PublicNavbar.module.css';
import Link from 'next/navigation';

export default function PublicNavbar() {

  return (
    <div id={styles.navbarContainer}>
      <Link href='/'>HOME</Link>
      <Link href='/'>ABOUT LESSONS</Link>
      <Link href='/'>BOOK AN INTRO</Link>
      <Link href='/'>PHOTOS</Link>
      <Link href='/'>ABOUT ME</Link>
    </div>
  )

}