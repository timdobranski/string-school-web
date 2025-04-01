import './globals.css';
import Image from 'next/image';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Script from 'next/script';
config.autoAddCss = false;
// import Modal from 'react-modal';



export const metadata = {
  title: 'The La Mesa String School',
  description: 'Modern, Fun & Innovative Guitar Lessons in La Mesa, CA',
  metadataBase: new URL("https://string-school-web.vercel.app/"),
  openGraph: {
    images: "/images/opengraph-image.jpg",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
        {/* Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-529YQQGWYS"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-529YQQGWYS', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className='app'>
        {/* <Header /> */}
        {/* <div id='appContentContainer'> */}
        {children}
        {/* </div> */}
      </body>
    </html>
  )
}
