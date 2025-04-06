'use client'

import styles from './about-lessons.module.css'
import { useState, useEffect, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import '@fortawesome/fontawesome-svg-core/styles.css';
// import { config } from '@fortawesome/fontawesome-svg-core';
// config.autoAddCss = false;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faMicrophone, faLaptop, faUser, faLocationDot, faClock, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import Hero from '../../../components/Public/PublicHero/Hero';

export default function AboutLessons() {
  const studioVideos= ['https://www.youtube.com/embed/EraS5O2kslY?si=JmyTG0q11QSwQBq8', 'https://www.youtube.com/embed/Yco7rXyXhaU?si=hOMpC-BJ2bUqJ4Uj']
  const studioPhotos = ['/images/studio/1.webp', '/images/studio/2.webp', '/images/studio/3.webp', '/images/studio/4.webp', '/images/studio/5.webp',
    '/images/studio/6.webp', '/images/studio/7.webp', '/images/studio/8.webp', '/images/studio/9.webp', '/images/studio/10.webp', '/images/studio/11.webp'];
  const studioCaptions = ['Studio Walkthrough', 'Studio Walkthrough', 'Studio (daytime)', 'Studio (daytime)', 'Studio (daytime)',
    'Studio (daytime)', 'Studio (nighttime)', 'Studio (nighttime)', 'Studio (nighttime)', 'Studio (nighttime)', 'Studio (nighttime)', 'Studio (nighttime)', 'Studio (nighttime)'];
  const lobbyVideos= ['https://www.youtube.com/embed/Bu_v4VPjqUo?si=l65ijgCSB3Ug4W_T']

  const lobbyPhotos = ['/images/lobby/1.webp', '/images/lobby/2.webp', '/images/lobby/3.webp', '/images/lobby/4.webp'];
  const lobbyCaptions = ['Waiting Room(daytime)', 'Waiting Room(daytime)', 'Waiting Room(nighttime)', 'Waiting Room(nighttime)'];
  const outsidePhotos= ['/images/outside/1.webp', '/images/outside/2.webp']

  const [studioCarousel, setStudioCarousel] = useState('videos');
  const [lobbyCarousel, setLobbyCarousel] = useState('videos');
  const [approachSlide, setApproachSlide] = useState(0);
  const [detailsSlide, setDetailsSlide] = useState(0);
  const [approachHeight, setApproachHeight] = useState(0)
  const [detailsHeight, setDetailsHeight] = useState(0)
  const approachRef = useRef(null)
  const detailsRef = useRef(null)

  const concertPhotos = [
    {image: '/images/me/me.webp',
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
  ]

  useEffect(() => {
    if (!approachRef.current) return

    const images = approachRef.current.querySelectorAll('img')
    let loadedCount = 0

    const updateHeight = () => {
      setApproachHeight(approachRef.current.scrollHeight)
    }

    const checkAllLoaded = () => {
      loadedCount++
      if (loadedCount === images.length) {
        updateHeight()
      }
    }

    if (images.length === 0) {
      updateHeight()
    } else {
      images.forEach((img) => {
        if (img.complete) {
          checkAllLoaded()
        } else {
          img.addEventListener('load', checkAllLoaded)
          img.addEventListener('error', checkAllLoaded)
        }
      })
    }

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', checkAllLoaded)
        img.removeEventListener('error', checkAllLoaded)
      })
    }
  }, [approachSlide])


  useEffect(() => {
    if (!detailsRef.current) return

    const images = detailsRef.current.querySelectorAll('img')
    let loadedCount = 0

    const updateHeight = () => {
      setDetailsHeight(detailsRef.current.scrollHeight)
    }

    const checkAllLoaded = () => {
      loadedCount++
      if (loadedCount === images.length) {
        updateHeight()
      }
    }

    if (images.length === 0) {
      updateHeight()
    } else {
      images.forEach((img) => {
        if (img.complete) {
          checkAllLoaded()
        } else {
          img.addEventListener('load', checkAllLoaded)
          img.addEventListener('error', checkAllLoaded)
        }
      })
    }

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', checkAllLoaded)
        img.removeEventListener('error', checkAllLoaded)
      })
    }
  }, [detailsSlide])

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
        title={['LESSON INFO']}
        button={false}
        image={'/images/hero-2.jpg'}
        webp={'/images/hero-2.webp'}
        imageStyles={{ filter: 'brightness(80%)' }}
        // textDirection={'right'}
        text={[]}
      />
      <div className={styles.section0Container} id='intro'>
        <h2 className={"sectionTitle"}>About Lessons</h2>
        <div className={`pageContentWidth`}>
        <p className={'text vertMarginSmall'}>{`For over 15 years I have taught students of all ages and from beginner to advanced playing levels.
       I am comfortable and familiar working with any genre of music. My students are generally about 1/3 adults and 2/3 children & teens.
       Most students are either beginners learning the fundamentals, or lifelong players looking to improve their improvisation, songwriting, or music theory skills.
       `}</p>
        <p className={'text vertMarginSmall'}>{`There are some limits to my knowledge and experience, mostly relating to advanced jazz theory. If you are an advanced player
        and curious if I can help you, please reach out and I will be happy to discuss your needs.
       `}</p>
        <p className={'text vertMarginSmall'}>{`A few of the things we can work on in your lessons include:
       `}</p>
       </div>
         <div className={styles.curriculumGrid}>
           <ul className={styles.curriculumList}>
             <li>Playing Mechanics</li>
             <li>Strumming</li>
             <li>Music Theory</li>
             <li>Ear Training</li>

             <li>Songwriting</li>
             <li>Improvisation</li>
             <li>Tab or Standard Notation</li>
             <li>Transcription</li>
           </ul>
         </div>
      </div>

      <div className={styles.section1Container} id='approach'>
        <h2 className={"sectionTitle"}>Teaching Approach</h2>

        {/* <img src='/images/teaching-approach.jpg' alt='Studio Photo 1' className={styles.section1Image} /> */}

        <div className={styles.lessonInfoWrapper}>
          <div onClick={approachSlide === 1 ? () => setApproachSlide(0) : () => setApproachSlide(1)} className={`${styles.lessonInfoSection} ${approachSlide === 1 && styles.selected}`}>
            <FontAwesomeIcon icon={faMicrophone} className={`${approachSlide === 1 ? styles.selectedIcon : styles.icon}`} />
            <h2 className={`${approachSlide === 1 ? 'smallerSectionTitleWhite' : 'smallerSectionTitle'} ${styles.iconTabTitles}`}>Projects</h2>

          </div>
          <div onClick={approachSlide === 2 ? () => setApproachSlide(0) : () => setApproachSlide(2)} className={`${styles.lessonInfoSection} ${styles.middleInfoSection} ${approachSlide === 2 && styles.selected}`}>
            <FontAwesomeIcon icon={faLaptop} className={`${approachSlide === 2 ? styles.selectedIcon : styles.icon}`} />
            <h2 className={`${approachSlide === 2 ? 'smallerSectionTitleWhite' : 'smallerSectionTitle'}  ${styles.iconTabTitles}`}>Technology</h2>

          </div>
          <div onClick={approachSlide === 3 ? () => setApproachSlide(0) : () => setApproachSlide(3)} className={`${styles.lessonInfoSection} ${approachSlide === 3 && styles.selected}`}>
            <FontAwesomeIcon icon={faUser} className={`${approachSlide === 3 ? styles.selectedIcon : styles.icon}`} />
            <h2 className={`${approachSlide === 3 ? 'smallerSectionTitleWhite' : 'smallerSectionTitle'}  ${styles.iconTabTitles}`}>Custom</h2>
          </div>

        </div>

        <div
          className={`${styles.contentSectionWrapper}`}
          style={{
            height: `${approachHeight}px`,
            transition: 'height 0.7s ease',
            overflow: 'hidden'
          }}
        >
          <div className={styles.iconSwitchContent} ref={approachRef}>
            {approachSlide === 0 && (
              <div className="fadeIn">
                <p className="text">Select one of the choices above to learn more about my lessons.</p>
              </div>
            )}
            {approachSlide === 1 && (
              <div className="fadeIn">
                <p className="text"> {`I encourage every student to pursue an optional project of some kind, and I've found tremendous success with students who engage with this idea.
                My biannual concerts and recording sessions are great stand-ins for when a student is just starting out but here are just a few examples of projects
                that both inspire and motivate students:`}</p>
                {/* <div className={styles.projectsWrapper}> */}
                <div className={styles.projectWrapper}>
                  <picture>
                    <source srcSet="/images/projects/band.webp" type="image/webp" />
                    <img src="/images/projects/band.jpg" alt="Concert Photo 1" className={styles.projectImage} />
                  </picture>
                  <div className={styles.projectTextWrapper}>
                  <p className={styles.projectTitle}>Start A Band With Friends</p>
                  <p className={styles.projectDescription}>{`This is the most fun and engaging way to build musical skills. Find some friends and make some noise!
                  Band practice once or twice a week is a great chance to try new songs together, stay motivated, and inspire new musical ideas.`}</p>
                  </div>
                </div>

                <div className={styles.projectWrapperReverse}>
                  <picture>
                    <source srcSet="/images/projects/social.webp" type="image/webp" />
                    <img src="/images/projects/social.jpg" alt="Concert Photo 1" className={styles.projectImage} />
                  </picture>
                  <div className={styles.projectTextWrapperReverse}>
                  <p className={styles.projectTitle}>Start A YouTube Channel</p>

                    <p className={styles.projectDescription}>{`Social media can be a divisive subject and should be treated with caution,
                     but it has brought unprecedented opportunity for musicians to easily share their work. Social media channels can be public,
                     or set to private and shared only with friends and family.`}</p>
                  </div>
                </div>

                <div className={styles.projectWrapper}>
                  <picture>
                    <source srcSet="/images/projects/recording.webp" type="image/webp" />
                    <img src="/images/projects/recording.jpg" alt="Concert Photo 1" className={styles.projectImage} />
                  </picture>
                  <div className={styles.projectTextWrapper}>
                    <p className={styles.projectTitle}>Write & Record Your Own Music</p>
                    <p className={styles.projectDescription}>{`Not every musician wants to perform, and that's ok. Writing and recording music can be done
                    without the pressure of a live audience or a camera, and can allow more artistic freedom.`}</p>
                  </div>
                {/* </div> */}
                </div>
                      <a href='#approach' className={styles.topOfSectionLink} >Back To All Teaching Approaches</a>

              </div>
            )}
            {approachSlide === 2 && (
              <div className="fadeIn">
                <p className="text">{`Whenever possible, I incorporate the latest technology into my lessons in ways that continue to make learning
                 to play an instrument much easier. Some of the tech I use includes:
                 `}</p>
                <ul className={styles.techList}>
                  <li>
                    <div className={styles.techListItemWrapper}>
                    <img src='/images/tech-icons/gp8.png' alt='Guitar Pro 8' className={styles.techListItemImage} />
                    <p className={styles.techListItemDescription}>
                      <span className={styles.techListItemTitle}>Guitar Pro 8</span> for practicing & writing interactive music pages with sound
                    </p>
                    </div>
                    </li>
                  <li>
                  <div className={styles.techListItemWrapper}>
                    <img src='/images/tech-icons/ripx.png' alt='RipX DAW' className={styles.techListItemImage} />
                    <span className={styles.techListItemDescription}>
                    <span className={styles.techListItemTitle}>RipX DAW </span>for editing songs to remove or modify the guitar and create backing tracks
                    </span>
                  </div>
                  </li>
                  <li>
                  <div className={styles.techListItemWrapper}>
                  <img src='/images/logos/icon-blue-background.png' alt='String School app' className={`${styles.techListItemImage} ${styles.circularIcon}`} />
                  <span className={styles.techListItemDescription}>
                  My <span className={styles.techListItemTitle}>String School</span> app for scheduling and managing lessons & progress
                    </span>
                      </div>
                      </li>
                  <li>
                  <div className={styles.techListItemWrapper}>
                  <img src='/images/tech-icons/pro-tools.png' alt='Pro Tools' className={`${styles.techListItemImage} `} />
                  <span className={styles.techListItemDescription}>
                  <span className={styles.techListItemTitle}>Pro Tools</span> for recording student tracks in professional quality
                    </span>
                    </div>
                    </li>
                  <li>
                  <div className={styles.techListItemWrapper}>
                  <img src='/images/tech-icons/lmss-2.png' alt='String School toolbox' className={`${styles.techListItemImage} ${styles.addedContrastEdges}`}/>
                  <span className={styles.techListItemDescription}>
                  <span className={styles.techListItemTitle}>String School Toolbox</span> - My very own collection of interactive teaching tools
                  </span>
                    </div>
                    </li>
                    <li>
                  <div className={styles.techListItemWrapper}>
                  <img src='/images/tech-icons/spotify.png' alt='Spotify' className={`${styles.techListItemImage} `} />
                  <span className={styles.techListItemDescription}>
                  <span className={styles.techListItemTitle}>Spotify</span> for sharing playlists for song suggestions, examples of topics, or just for fun!
                    </span>
                    </div>
                    </li>
                  <li>
                  <div className={styles.techListItemWrapper}>
                  <img src='/images/tech-icons/classroom.png' alt='Google classroom icon' className={`${styles.techListItemImage}`} />
                  <span className={styles.techListItemDescription}>
                  <span className={styles.techListItemTitle}>Google Classroom</span> Quizzes & Forms to test student knowledge
                    </span>
                  </div>
                  </li>
                </ul>
                <p className="text"> {`These tools enable students to learn more, learn faster, and have way more fun doing it. I strongly recommend that
                practice sessions at home take place with a PC or Mac nearby to access the full suite of advantages that these tools offer. Mobile devices
                unfortunately do not provide the same experience at this time.`}</p>
                <a href='#approach' className={styles.topOfSectionLink} >Back To All Teaching Approaches</a>

              </div>
            )}
            {approachSlide === 3 && (
              <div className="fadeIn">
                <p className="text">Each song we work on is customized to fit your playing level. We can work with prearranged versions that I have written in the past, or start a whole new version with adjustments for difficulty or just for a fun, unique twist on any song. Students learn the best when they have a moderate but attainable challenge. We call this the zone of proximal development, and it is the sweet spot for quick and effective learning.</p>
                <picture>
                  <source
                    srcSet="/images/custom-tracks-mockup-mobile.webp"
                    type="image/webp"
                    media="(max-width: 768px)"
                  />
                  <source
                    srcSet="/images/custom-tracks-mockup-mobile.png"
                    type="image/png"
                    media="(max-width: 768px)"
                  />
                  <source
                    srcSet="/images/custom-tracks-mockup.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/custom-tracks-mockup.png"
                    alt="Guitar Pro 8 screenshot"
                    className={styles.customTracksImage}
                  />
                </picture>

                <p className="text"> {`My song library is stored in Guitar Pro format, which allows me to create different versions of any song in the same file. When you
                open one of my song files, you will find some combination of the following versions:`}</p>

                <ul className={styles.customTracksList}>
                <li>
                    <span className={`${styles.trackDot} ${styles.trackDotGreen}`}></span>
                    <span className={styles.trackTitle}>Easy Version</span>
                    <p className={`text ${styles.trackDescription}`}>{`These versions are a bare minimum interpretation that can be used to build skills when just starting out. They are great for
                    your first few songs.`}</p>
                  </li>

                  <li>
                    <span className={`${styles.trackDot} ${styles.trackDotYellow}`}></span>
                    <span className={styles.trackTitle}>Medium Version</span>
                    <p className={`text ${styles.trackDescription}`}>{`These versions have been adapted to suite players at a mid-level range of playing skill. They often sound almost identical to
                    the original versions, but are easier to play.`}</p>
                  </li>

                  <li>
                    <span className={`${styles.trackDot} ${styles.trackDotRed}`}></span>
                    <span className={styles.trackTitle}>Full Version</span>
                    <p className={`text ${styles.trackDescription}`}>{`This is the original version of the song, accurate or nearly accurate to the original recording.`}</p>
                  </li>

                  <li>
                    <span className={`${styles.trackDot} ${styles.trackDotBlue}`}></span>
                    <span className={styles.trackTitle}>Custom Versions</span>
                    <p className={`text ${styles.trackDescription}`}>{`Blue tracks can include custom versions for a particular student, or other versions irrespective of difficulty such as
                    chord versions, interpretations in a different genre, a blending of two guitar parts into one part, etc.`}</p>
                  </li>
                  </ul>

                <a href='#approach' className={styles.topOfSectionLink} >Back To All Teaching Approaches</a>
              </div>
            )}
          </div>
        </div>



      <div className={styles.section2Container} id='details'>
        <h2 className={"sectionTitle"}>The Details</h2>
        <div className={styles.lessonInfoWrapper}>
          <div onClick={detailsSlide === 1 ? () => setDetailsSlide(0) : () => setDetailsSlide(1)} className={`${styles.lessonInfoSection} ${detailsSlide === 1 && styles.selected}`}>
            <FontAwesomeIcon icon={faClock} className={`${detailsSlide === 1 ? styles.selectedIcon : styles.icon} `} />
            <h2 className={`${detailsSlide === 1 ? 'smallerSectionTitleWhite' : 'smallerSectionTitle'}  ${styles.iconTabTitles}`}>When</h2>

          </div>

          <div onClick={detailsSlide === 2 ? () => setDetailsSlide(0) : () => setDetailsSlide(2)} className={`${styles.lessonInfoSection} ${detailsSlide === 2 && styles.selected}`}>
            {/* <div className={styles.verticalDividerLeft}></div> */}
            <FontAwesomeIcon icon={faLocationDot} className={`${detailsSlide === 2 ? styles.selectedIcon : styles.icon}`} />
            <h2 className={`${detailsSlide === 2 ? 'smallerSectionTitleWhite' : 'smallerSectionTitle'}  ${styles.iconTabTitles}` }>Where</h2>
            {/* <div className={styles.verticalDividerRight}></div> */}
          </div>

          <div onClick={detailsSlide === 3 ? () => setDetailsSlide(0) : () => setDetailsSlide(3)} className={`${styles.lessonInfoSection} ${detailsSlide === 3 && styles.selected}`}>
            <FontAwesomeIcon icon={faDollarSign} className={`${detailsSlide === 3 ? styles.selectedIcon : styles.icon}`} />
            <h2 className={`${detailsSlide === 3 ? 'smallerSectionTitleWhite' : 'smallerSectionTitle'}  ${styles.iconTabTitles}`}>Fees</h2>
          </div>
        </div>
        <div className={`${styles.contentSectionWrapper} ${styles.iconSwitchContentGray}`}
          style={{
            height: `${detailsHeight}px`,
            transition: 'height 0.7s ease',
            overflow: 'hidden'
          }}
        >
          <div className={styles.iconSwitchContent} ref={detailsRef}>

          {/* <div className={styles.iconSwitchContent} ref={detailsRef}> */}
          <div className={`${styles.tabContent} ${detailsSlide !== 0 ? styles.notSelected : styles.selectedText}`}>
            <p className={`text`}>{`Select one of the choices above to learn more about my lessons.`}</p>
          </div>
          <div className={`${styles.tabContent} ${detailsSlide !== 1 ? styles.notSelected : styles.selectedText}`}>
            <p className="text">
              Lessons are offered in 30 minute recurring weekly blocks at the following times.
              Students interested in longer or more frequent lessons are welcome to book multiple spots.
              View my current schedule openings through a live Google Doc{' '}
              <a
                href="https://docs.google.com/document/d/18_k8ToYmk2PYpF2TiPqBhdFUpaXBPx7VqTcrwoZfQxk/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                here
              </a>.
            </p>
            <table className={styles.scheduleTable}>
              <tbody>
                <tr>
                  <td className={styles.days}>Mon-Thu</td>
                  <td className={styles.times}>4:30pm - 8:00pm</td>
                </tr>
                <tr>
                  <td className={styles.days}>Fri</td>
                  <td className={styles.times}>4:30pm - 6:00pm</td>
                </tr>
                <tr>
                  <td className={styles.days}>Sun</td>
                  <td className={styles.times}>10:00am - 12:00pm</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={`text ${detailsSlide !== 2 ? styles.notSelected : styles.selectedText}`}>
            <p className={'text'}>{`Lessons are held at my home music studio in Fletcher Hills, CA, near Grossmont High School. As this is my personal residence as well,
              the address is not listed here and is provided upon booking a lesson.`} </p>

            <iframe
              title="Lesson Area"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13415.977491273556!2d-117.00753623060034!3d32.79240847851275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1743892392143!5m2!1sen!2sus"
              className={styles.map}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <p className={'text'}>{`I also offer lessons online via Zoom. These lessons can be much more convenient, but I don't recommend them
              for all situations. Feel free to reach out if this is something you'd like to discuss!`}
            </p>
          </div>


          <div className={`text ${detailsSlide !== 3 ? styles.notSelected : styles.selectedText}`}>
            <p className={'text'}>Fees are the same every month, regardless of attendance or the number of weeks/lessons in the month.</p>
            <p className={'text'}>Most months will include 4 weekly lessons; some will include an extra 5th depending on how the calendar lines up.</p>

            <div className={styles.fees}>
              <p className={styles.price}>$120/month</p>
              <p className={'text'}>{`Payments can be made via cash, check, Venmo, Zelle, and Paypal`}</p>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className={styles.section3Container} id='policies'>
        <div className={styles.policiesWrapper}>
          <>
            {/* Desktop Version */}
            <h2 className="sectionTitleWhite sectionTitleDesktop">Attendance & Payments Policies</h2>

            {/* Mobile Version (Split into Two Lines) */}
            <h2 className="sectionTitleWhite sectionTitleMobile">
              Attendance &
            </h2>
            <h2 className="sectionTitleWhite sectionTitleMobile">
              Payments Policies
            </h2>
          </>
          <p className={'whiteText'}>Good attendance is expected of every student.</p>
          <p className={'whiteText'}>Missed lessons can be rescheduled as long as they are
      cancelled in the app with two hours notice. </p>
          <p className={'whiteText'}>Missed lessons do not reduce monthly fees - fees are the same regardless of attendance.</p>
          <p className={'whiteText'}>New students can begin in the middle of the month at a prorated fee based on the number of remaining weeks in the month.</p>
        </div>

      </div>


      <div className={styles.section4Container} id='studio'>
        <h2 className={"sectionTitle"} >See The Studio</h2>
        <div className={styles.lessonInfoWrapperMidMargin}>
          <p className='text'>{`My home studio is both a fun and professional environment for kids and adults alike to learn. When you arrive, you'll enter into the waiting room
            where you can access the wifi and use the restroom while you wait. Parents are welcome to sit in on lessons, wait in the waiting room, or drop their kiddos
            off, so long as they are sure to return before the end of the lesson.`}</p>
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
          {studioVideos.map((src, index) => (
            <div className={styles.slide} key={index}>
              <div className={styles.videoSlide}>
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                  <iframe
                    src={studioVideos[index]}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: 0,
                      margin: 0
                    }}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <p className={styles.caption}>{studioCaptions[index]}</p>
              </div>
            </div>
          ))}


          {studioPhotos.map((src, index) => (
            <div className={styles.slide} key={index}>
              <img key={index} src={src} alt={`Photo ${index + 1}`} />
              <p className={styles.caption}>{studioCaptions[index + studioVideos.length]}</p>

            </div>
          ))}
        </Carousel>
        <br></br>

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
          {lobbyVideos.map((src, index) => (
            <div className={styles.slide} key={index}>
              <div className={styles.videoSlide}>
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                  <iframe
                    src={lobbyVideos[index]}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: 0,
                      margin: 0
                    }}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <p className={styles.caption}>{studioCaptions[index]}</p>
              </div>
            </div>
          ))}

          {lobbyPhotos.map((src, index) => (
            <div className={styles.slide} key={index}>
              <img key={index} src={src} alt={`Photo ${index + 1}`} />
              <p className={styles.caption}>Waiting Room</p>

            </div>
          ))}

        </Carousel>

      </div>

      <div className={styles.section5Container} id='tim'>
        <h2 className={"sectionTitle"} >Meet Tim</h2>
        <div className={styles.textContainer}>
          {/* <h2 className={styles.title}>My Roots</h2> */}
          <p className='text'>{`My name is Tim and I teach guitar under the name of The La Mesa String School.
        I'm a La Mesa native. I picked up the guitar early in grade school and I've been playing ever
      since. In the 20 some years since then, I've learned from many of San Diego's best guitar
      instructors. I spent several years after high school in a band gaining experience as both a
      musician and a businessman. We were signed to a record label, released one album and then
      promptly broke up!`}
          </p>
        </div>


        <div className={styles.textContainer}>
          <h2 className={"smallerSectionTitle"}>Teaching</h2>
          <p className='text'>{`I began working for the La Mesa/Spring Valley School District in 2006 in the after school program with
        children grades K-8th. For several years I taught my very own RockStar Guitar Troupe, traveling
        to various schools throughout the district to teach guitar and culminating in a student concert. In 2009
        I began offering private guitar lessons while attending San Diego State University. As I continued to teach, I began to develop a deep
        interest in music pedagogy and in finding ways to help my students learn quickly and more effectively. In the years since then,
        I've prided myself in offering innovative and effective ideas to improve my lessons and help students learn quickly and more effectively.`}
          </p>
        </div>


        <div className={styles.textContainer}>
          <h2 className={"smallerSectionTitle"}>Software Development</h2>
          <p className='text'>{`Around 2021 I returned to school myself to study software development. In 2024 I left the LMSV school district to
        pursue a career in software development. I now work as a web developer for a media company in San Francisco and continue to teach in the evenings.
        In my spare time I'm continuing to develop Stringsmith, my very own guitar learning and practice platform, which I hope to launch in early 2025.`}
          </p>
        </div>

        <div className={styles.textContainer}>
          <h2 className={"smallerSectionTitle"}>The Future</h2>
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
          showIndicators={false}
          showThumbs={false}
        >
          {concertPhotos.map((src, index) => (
            <div className={styles.slide} key={index}>
              <img key={index} src={src.image} alt={`Photo ${index + 1}`} />
              <p className={styles.caption}>{src.caption}</p>

            </div>
          ))}

        </Carousel>


      </div>
          </div>
    </div>
  )
}