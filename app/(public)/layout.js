import PublicHeader from '../../components/Public/PublicHeader/PublicHeader';
import PublicheaderMobile from '../../components/Public/PublicHeaderMobile/PublicHeaderMobile';
import PublicTopbar from '../../components/Public/PublicTopbar/PublicTopbar';
import PublicFooter from '../../components/Public/PublicFooter/PublicFooter';
import styles from './layout.module.css'
import Link from 'next/link';

export default function PublicLayout({ children }) {


  return (
    <>
      <PublicheaderMobile/>
      {/* <PublicTopbar/> */}
      <PublicHeader/>
      {children}
      {/* <div className={styles.studentLoginWrapper}>
        <img src="/images/logos/icon-blue-background.png" alt="Student Login Icon" className={styles.studentLoginIcon}/>
        <a href="/login" className={styles.studentLogin}>Student Login</a>
      </div> */}

      <PublicFooter />
    </>
  )
}
