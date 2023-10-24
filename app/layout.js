import './globals.css';
import Header from '../components/Header/Header';
import Image from 'next/image';
import background from '../public/images/background.jpeg'
import Script from 'next/script';


export const metadata = {
  title: 'The La Mesa String School',
  description: 'Modern, Innovative, & Fun Guitar Lessons',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body id='app'>
        <Header />
        <div id='appContentContainer'>
          {children}
          <Script src="https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/alphaTab.js" />
        </div>
      </body>
    </html>
  )
}
