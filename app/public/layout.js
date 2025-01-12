import PublicHeader from '../../components/Public/PublicHeader/PublicHeader';
import PublicTopbar from '../../components/Public/PublicTopbar/PublicTopbar';
import PublicFooter from '../../components/Public/PublicFooter/PublicFooter';
import styles from './layout.module.css'

export default function PublicLayout({ children }) {


  return (
    <>
      <PublicTopbar/>
      <PublicHeader/>
      {children}
      <PublicFooter />
    </>
  )
}
