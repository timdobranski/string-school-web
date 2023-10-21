import './globals.css';
import Header from '../components/Header/Header';
import Image from 'next/image';
import background from '../public/images/background.jpeg'


export const metadata = {
  title: 'The La Mesa String School',
  description: 'Modern, Innovative, & Fun Guitar Lessons',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id='app'>
        {/* <div id='background'>
          <Image src={background} alt="La Mesa String School Logo" />
        </div> */}
        <Header />
        {children}
        </body>
    </html>
  )
}
