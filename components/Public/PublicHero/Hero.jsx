'use client';

import styles from './Hero.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Hero({type, title = [], text = [], videoSrc = '/videos/hero-video.mov', image, webp, imageStyles, direction, button, buttonHash,
  titleStyles, loopVideo, hideTitle }) {

  return (
    <div className={`${styles.wrapper}`}>

      {/* <Link href='/studentslogin' className={styles.loginButton}>STUDENT LOGIN</Link> */}
      {type === 'video' &&
      <div className={styles.videoWrapper}>
        <video
          src={videoSrc}
          className={styles.video}
          autoPlay
          loop={loopVideo}
          muted
          playsInline
        />
      </div>
      }

      {type === 'photo' &&
       <picture>
         <source srcSet={webp} type="image/webp" />
         <img
           src={image}
           className={styles.image}
           style={imageStyles}
         />
       </picture>
      }

      <div className={styles.contentWrapper}>
        {hideTitle ? null : <h3 className={styles.header} style={titleStyles}>
          {title.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h3>}


        {/* {text.map((paragraph, index) => (
          <p className={styles.text} key={index}>
            {paragraph}
          </p>
        ))} */}
      </div>
      {button ? <Link href={`#${buttonHash}`}>
        <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
      </Link> : null}
    </div>
  );
}
