import Image from 'next/image';
import logo from '../../public/images/logo.png';
import logoWhite from '../../public/images/logo-white-bg.png';
import styles from './Header.module.css';


export default function Header() {
  return (
    <div id={styles.headerContainer}>
      <div id={styles.logoContainer}>
        <Image src={logo} fill='true' alt="La Mesa String School Logo" />
      </div>
      <button className='button' id={styles.loginButton}>STUDENT LOGIN</button>
    </div>
  )
}