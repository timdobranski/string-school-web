import PublicNavbar from '../../components/PublicNavbar/PublicNavbar';

export default function PublicLayout({ children }) {

  return (
    <>
      <PublicNavbar/>
      {children}

    </>

  )
}
