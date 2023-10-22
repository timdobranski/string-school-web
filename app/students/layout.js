import StudentNavbar from '../../components/StudentNavbar/StudentNavbar';

export default function Home({ children }) {
  return (
    <main>
      <StudentNavbar />
      {children}
    </main>
  )
}