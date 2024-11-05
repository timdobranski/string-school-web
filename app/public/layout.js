import PublicHeader from '../../components/PublicHeader/PublicHeader';
import styles from './layout.module.css'

export default function PublicLayout({ children }) {

  return (
    <div className={styles.publicPageWrapper}>
      <PublicHeader/>
      {children}

    </div>

  )
}
