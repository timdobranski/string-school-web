import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/logo.png';
import logoWhite from '../../public/images/logo-white-bg.png';
import styles from './Header.module.css';


export default function Header() {
  return (
    <div id={styles.headerContainer}>
      <Link href='/' id={styles.homeButton}>
        <div id={styles.logoContainer}>
          <Image src={logo} fill='true' alt="La Mesa String School Logo" />
        </div>
      </Link>
      <Link href='/login' className='button' id={styles.loginButton}>STUDENT LOGIN</Link>
    </div>
  )
}