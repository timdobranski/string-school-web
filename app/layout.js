import './globals.css';
import Header from '../components/Header/Header';
import Image from 'next/image';
import background from '../public/images/background.jpeg';
// import Modal from 'react-modal';



export const metadata = {
  title: 'The La Mesa String School',
  description: 'Modern, Innovative, & Fun Guitar Lessons',
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
