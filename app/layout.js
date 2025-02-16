import './globals.css';
import Header from '../components/Header/Header';
import Image from 'next/image';
import background from '../public/images/background.jpeg';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
// import Modal from 'react-modal';



export const metadata = {
  title: 'The La Mesa String School',
  description: 'Modern, Innovative, & Fun Guitar Lessons',
  metadataBase: new URL("https://string-school-web.vercel.app/"),
  openGraph: {
    images: "/images/opengraph-image.jpg",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='app'>
        {/* <Header /> */}
        {/* <div id='appContentContainer'> */}
        {children}
        {/* </div> */}
      </body>
    </html>
  )
}
