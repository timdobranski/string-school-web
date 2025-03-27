'use client'

import styles from './page.module.css';
import Hero from '../../../components/Public/PublicHero/Hero';
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";



export default function ConcertsPage() {
  const concertPhotos = [
    {image: '/images/concerts/hero/5.jpg',
      caption: 'String School Concert, 2025'
    },
    {image: '/images/concerts/hero/6.jpg',
      caption: 'String School Concert, 2025'
    },
    {image: '/images/concerts/hero/7.jpg',
      caption: 'String School Concert, 2025'
    },
    {image: '/images/concerts/hero/8.jpg',
      caption: 'String School Concert, 2025'
    },
    {image: '/images/concerts/hero/9.jpg',
      caption: 'String School Concert, 2025'
    },
    {image: '/images/concerts/hero/10.jpg',
      caption: 'String School Concert, 2025'
    },
    {image: '/images/concerts/hero/11.jpg',
      caption: 'String School Concert, 2025'
    },
    {image: '/images/concerts/hero/12.jpg',
      caption: 'String School Concert, 2025'
    },
  ]

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
    <div className={styles.wrapper}>
      <Hero
        type={'photo'}
        title={['CONCERTS']}
        button={false}
        image={'/images/concerts/hero/12.jpg'} // 5-12
        imageStyles={{ filter: 'brightness(80%)' }}
        // textDirection={'right'}
        text={[]}
      />
      <div className={styles.contentWrapper}>
        {/* <h1 className={'sectionTitle'}>CONCERTS</h1> */}
        <p className={styles.text}>{`String School Concerts are one of the most fun ways to build motivation and experience as a musician. These are designed to be real concerts, featuring professional, custom lighting and sound, food, games, and a welcoming atmosphere. They’re also a great opportunity for students to meet, connect, and build friendships through music.`}</p>
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
        {concertPhotos.map((src, index) => (
          <div className={styles.slide} key={index}>
            <img key={index} src={concertPhotos[index].image} alt={`Photo ${index + 1}`} />
            <p className={styles.caption}>{concertPhotos[index].caption}</p>

          </div>
        ))}
      </Carousel>
    </div>
  );
}