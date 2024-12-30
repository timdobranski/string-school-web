import PublicHeader from '../../components/PublicHeader/PublicHeader';
import PublicTopbar from '../../components/PublicTopbar/PublicTopbar';
import PublicFooter from '../../components/PublicFooter/PublicFooter';
import styles from './layout.module.css'

export default function PublicLayout({ children }) {

  return (
    // <div className={styles.publicPageWrapper}>
    <>
      <PublicTopbar/>
      <PublicHeader/>
      {children}
      <PublicFooter />
    </>

    // </div>

  )
}
