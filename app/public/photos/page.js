'use client';

import styles from './photos.module.css';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function Photos() {
  const studioPhotos = ['/images/studio/1.webp', '/images/studio/2.webp', '/images/studio/3.webp', '/images/studio/4.webp'];
  const lobbyPhotos = ['/images/lobby/1.webp', '/images/lobby/2.webp'];
  const outsidePhotos= ['/images/outside/1.webp', '/images/outside/2.webp']

  return (
    <div className='infoCard'>
      <h2 className='featureHeaders' >Studio Photos</h2>
      <Carousel
        className={styles.carousel}
        showArrows={false}
        swipeable={true}
        dynamicHeight={false}
        emulateTouch={true}
        useKeyboardArrows={true}
        centerMode={true}
        centerSlidePercentage={100}
        transitionTime={500}
        swipeScrollTolerance={5}
      >
        <div>
          <img src={studioPhotos[0]} alt='Studio Photo 1' className={styles.hoizontalPhoto} />
        </div>
        <div>
          <img src={studioPhotos[1]} alt='Studio Photo 2' />
        </div>
        <div>
          <img src={studioPhotos[2]} alt='Studio Photo 3' />
        </div>
        <div>
          <img src={studioPhotos[3]} alt='Studio Photo 4' />
        </div>
      </Carousel>


      <h2 className='featureHeaders'>Lobby Photos</h2>
      <Carousel
        className={styles.carousel}
      >
        {lobbyPhotos.map((src, index) => (
          <img key={index} src={src} alt={`Photo ${index + 1}`} />
        ))}
      </Carousel>
      <h2 className='featureHeaders'>Outside Photos</h2>
      <Carousel className={styles.verticalCarousel} dynamicHeight={true}>
        {outsidePhotos.map((src, index) => (
          <img key={index} src={src} alt={`Photo ${index + 1}`} className={styles.vertPhoto}  />
        ))}
      </Carousel>
    </div>
  )
}