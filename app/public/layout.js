import PublicHeader from '../../components/Public/PublicHeader/PublicHeader';
import PublicheaderMobile from '../../components/Public/PublicHeaderMobile/PublicHeaderMobile';
import PublicTopbar from '../../components/Public/PublicTopbar/PublicTopbar';
import PublicFooter from '../../components/Public/PublicFooter/PublicFooter';
import styles from './layout.module.css'

export default function PublicLayout({ children }) {


  return (
    <>
      <PublicTopbar/>
      <PublicHeader/>
      <PublicheaderMobile/>
      {children}
      <PublicFooter />
    </>
  )
}
