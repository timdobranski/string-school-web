'use client'

import styles from './about-lessons.module.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function AboutLessons() {
  const studioPhotos = ['/images/studio/studio1.webp', '/images/studio/studio2.webp'];
  const lobbyPhotos = ['/images/lobby/1.webp', '/images/lobby/2.webp'];
  const outsidePhotos= ['/images/outside/1.webp', '/images/outside/2.webp']

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

  return (
    <div className='pageContentWrapper'>
      <h2 className='pageHeaders'>Teaching Approach</h2>
      <p className={'text'}>{`I believe each student requires their own
      unique approach, but there are common themes that I try to implment with most students:`}</p>

      <div className={styles.lessonInfoWrapper}>
        <div className={styles.lessonInfoSection}>
          <h2 className='featureHeaders'>Projects</h2>

          <p className={'text'}>{`I encourage every student to persue an optional project of some kind,
      and I've found tremendous success with students who engage with this idea. Examples include my very own biannual concerts, recording a
      song here in my studio, starting their own social media channel through YouTube, starting a band with friends or classmates, etc.`}</p>

        </div>
        <div className={`${styles.lessonInfoSection} ${styles.middleInfoSection}`}>
          <h2 className='featureHeaders'>Technology</h2>

          <p className={'text'}>{`Whenever possible, I incorporate the latest tech into my lessons in ways that continue to make learning
            to play an instrument much easier. I'm also a software developer, and I am continually working to grow and improve my own
            guitar learning platform, Stringsmith. I use and highly recommend Guitar Pro software, and all students have access to my 50% off code to buy it yourself.`}
          </p>
        </div>
        <div className={styles.lessonInfoSection}>
          <h2 className='featureHeaders'>Personalization</h2>
          <p className={'text'}>{`Musicians view songs as a fluid collection of ideas, and the same song can be played many different ways and at different skill
          levels. In most cases, when we work on songs together, I'll transpose a version of it that is both fun and challenging for you. We call this the zone
          of proximal development, and it is the sweet spot for quick and effective learning.`}
          </p>
          <p className={'text'}>{``}</p>
        </div>

      </div>


      <h2 className='pageHeaders'>The Details</h2>
      <div className={styles.lessonInfoWrapper}>
        <div className={styles.lessonInfoSection}>
          <h2 className='featureHeaders'>When</h2>
          <p className='text'>{`Lessons are offered in 30 minute recurring weekly blocks at the following times:`}</p>
          <table className={styles.scheduleTable}>
            <tr>
              <td className={styles.days}>Mon-Thurs</td>
              <td className={styles.times}>4:30pm - 8:30pm</td>
            </tr>
            <tr>
              <td className={styles.days}>Fri</td>
              <td className={styles.times}>4:30pm - 6:00pm</td>
            </tr>
            <tr>
              <td className={styles.days}>Sun</td>
              <td className={styles.times}>10:00am - 12:00pm</td>
            </tr>
          </table>
          <p className='text'>{`Students interested in longer or more frequent lessons are welcome to book multiple lessons.`}</p>
        </div>

        <div className={`${styles.lessonInfoSection} ${styles.middleInfoSection}`}>
          {/* <div className={styles.verticalDividerLeft}></div> */}
          <h2 className='featureHeaders'>Where</h2>
          {/* <div className={styles.verticalDividerRight}></div> */}
          <p className='text'>{`Lessons are held at my home music studio in Fletcher Hills, CA. As this is my personal residence as well,
            the address is not listed here and is provided upon booking a lesson.`} </p>

          <p className='text'>{`I also offer lessons online via Zoom. These lessons can be much more convenient, but I don't recommend them
            for all situations. Feel free to reach out if this is something you'd like to discuss!`}
          </p>
        </div>

        <div className={styles.lessonInfoSection}>

          <h2 className='featureHeaders'>Fees</h2>
          <p className='text'>Fees are the same every month, regardless of the number of weeks/lessons in the month.</p>
          <p className='text'>Most months will include 4 weekly lessons; some will include an extra 5th.</p>
          <p className='text'></p>

          <div className={styles.fees}>
            <p className={styles.price}>$120/month</p>
            <p>Cash</p>
            <p>Personal Check</p>
            <p>Venmo</p>
            <p>Paypal</p>
            <p>Zelle</p>

          </div>

        </div>

      </div>

      <div className={styles.policiesWrapper}>
        <h2 className='pageHeaders'>Attendance & Payments Policies</h2>
        <p className='text'>Good attendance is expected of every student.</p>
        <p className='text'>Missed lessons can be rescheduled as long as they are
      cancelled in the app with two hours notice. </p>
        <p className='text'>Missed lessons do not reduce monthly fees.</p>
        <p className='text'>Monthly fees are only reduced when I cancel a lesson if you opt for the bill
      credit instead of a makeup credit.</p>
        <p className='text'>New students can begin in the middle of the month at a prorated rate.</p>
      </div>


      <h2 className='pageHeaders' >Photos</h2>
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
        <div className={styles.slide}>
          <img src={studioPhotos[0]} alt='Studio Photo 1' className={styles.hoizontalPhoto} />
          <p className={styles.caption}>Studio</p>
        </div>
        <div className={styles.slide}>
          <img src={studioPhotos[1]} alt='Studio Photo 2' className={styles.horizontalPhoto}/>
          <p className={styles.caption}>Studio</p>

        </div>
        {/* <div>
          <img src={studioPhotos[2]} alt='Studio Photo 3' />
        </div>
        <div>
          <img src={studioPhotos[3]} alt='Studio Photo 4' />
        </div> */}
      </Carousel>

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
        showIndicators={false}
        showThumbs={false}
      >
        {lobbyPhotos.map((src, index) => (
          <div className={styles.slide} key={index}>
            <img key={index} src={src} alt={`Photo ${index + 1}`} />
            <p className={styles.caption}>Waiting Room</p>

          </div>
        ))}
      </Carousel>


      {/* <h2 className='featureHeaders'>Outside Photos</h2>
      <Carousel className={styles.verticalCarousel} dynamicHeight={true}>
        {outsidePhotos.map((src, index) => (
          <img key={index} src={src} alt={`Photo ${index + 1}`} className={styles.vertPhoto}  />
        ))}
      </Carousel> */}

    </div>
  )
}