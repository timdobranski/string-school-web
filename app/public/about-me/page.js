'use client'

import styles from './about-me.module.css';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function AboutMe() {

  const nextSlideArrow = (handleClick, hasNext) => (
    <button disabled={!hasNext} className={hasNext ? styles.slideButtonRight : styles.slideButtonRightDisabled} onClick={handleClick}>
      <FontAwesomeIcon icon={faChevronRight}  className={styles.slideButtonIcon}/>
    </button>
  );

  const prevSlideArrow = (handleClick, hasPrev) => (
    <button disabled={!hasPrev} className={hasPrev ? styles.slideButtonLeft : styles.slideButtonLeftDisabled} onClick={handleClick}>
      <FontAwesomeIcon icon={faChevronLeft} className={styles.slideButtonIcon}/>
    </button>
  );

  const concertPhotos = [
    {image: '/images/me/me.jpeg',
      caption: 'Home Studio, 2022'
    },
    {image: '/images/me/concert1.jpg',
      caption: 'Soma San Diego, circa 2005'
    },
    {image: '/images/me/concert2.jpg',
      caption: 'Soma San Diego, circa 2005'
    },
    {image: '/images/me/concert3.jpg',
      caption: 'Soma San Diego, circa 2005'
    },
    {image: '/images/me/concert4.jpg',
      caption: 'Soma San Diego, circa 2005'
    },
    {image: '/images/me/concert5.webp',
      caption: 'Starlight Theater, Los Angeles 2013'
    },
    {image: '/images/me/concert5.webp',
      caption: 'Starlight Theater, Los Angeles 2013'
    },
  ]

  return (
    <div>
      {/* <div className={styles.imgContainer}> */}
      {/* <img src='/images/me/me.jpeg' alt='photo of tim playing guitar' className={styles.me}/> */}
      {/* </div> */}

      <div className={styles.textContainer}>
        <h2 className='featureHeaders'>About Me</h2>
        <p className='text'>{`My name is Tim and I teach guitar under the name of The La Mesa String School.
        I'm a La Mesa native. I picked up the guitar early in grade school and I've been playing ever
      since. In the 20 some years since then, I've learned from many of San Diego's best guitar
      instructors. I spent several years after high school in a band gaining experience as both a
      musician and a businessman. We were signed to a record label, released one album and then
      promptly broke up!`}
        </p>
      </div>


      <div className={styles.textContainer}>
        <h2 className='featureHeaders'>Teaching</h2>
        <p className='text'>{`I began working for the La Mesa/Spring Valley School District in 2006 in the after school program with
        children grades K-8th. For several years I taught my very own RockStar Guitar Troupe, traveling
        to various schools throughout the district to teach guitar and culminating in a student concert. In 2009
        I started offering private guitar lessons in college. Since then I've prided myself in offering innovative and effective
        ideas to improve my lessons and help students learn quickly and more effectively.`}
        </p>
      </div>


      <div className={styles.textContainer}>
        <h2 className='featureHeaders'>Software Development</h2>
        <p className='text'>{`Around 2021 I returned to school myself to study software development. In 2024 I left the LMSV school district to
        pursue a career in software development. I now work as a web developer for a media company in San Francisco and continue to teach in the evenings.
        In my spare time I'm continuing to develop Stringsmith, my very own guitar learning and practice platform, which I hope to launch in early 2025.`}
        </p>
      </div>

      <div className={styles.textContainer}>
        <h2 className='featureHeaders'>The Future</h2>
        <p className='text'>{`As 2024 begins to conclude, I'm still working closely with the LMSV school district to construct a very exciting and elaborate
        stage set and lighting system for future String School concerts and school events. The set I've designed and am constructing alongside the Parkway
        Academy engineering class will outshine almost any real concert venue in San Diego, and I'm beyond excited to unveil this at the next concert
        in March 2025!`}
        </p>
      </div>

      <Carousel
        className={styles.carousel}
        showArrows={true}
        swipeable={true}
        dynamicHeight={false}
        emulateTouch={true}
        useKeyboardArrows={true}
        centerMode={true}
        centerSlidePercentage={100}
        transitionTime={500}
        swipeScrollTolerance={5}
        renderArrowPrev={prevSlideArrow}
        renderArrowNext={nextSlideArrow}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
      >
        {concertPhotos.map((photo, index) => {
          return (
            <div className={styles.slide} key={index}>
              <img src={photo.image} alt='photo of time playing guitar' className={styles.slidePhoto} />
              <p className={styles.caption}>{photo.caption}</p>
            </div>)
        })}

      </Carousel>


    </div>
  )
}