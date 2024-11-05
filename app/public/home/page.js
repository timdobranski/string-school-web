import styles from './home.module.css';
import PublicNavbar from '../../../components/PublicNavbar/PublicNavbar';
import PromoBlock from '../../../components/PromoBlock/PromoBlock';

export default function PublicHome() {

  return (
    // <div className='appContainer'>
    <div className='pageContentWrapper'>

      {/* <div className={styles.heroSectionWrapper}>
        <img src={'/images/heroBanner.jpg'} alt='crowd' className={styles.heroImage}/>
      </div> */}

      <div className={styles.welcomeSection}>

        <h1 className={styles.title}>Welcome!</h1>
        <p className='text'>
          {`My name is Tim, and I provide guitar & ukulele lessons in Fletcher Hills (formerly La Mesa), California under the name The La Mesa String School.
          Please check out my Yelp reviews here! My lessons are designed to be fun and tech-forward, with an emphasis on applying skills as they're learned.
          This includes student concerts twice a year, and recording studio time for those that prefer to record a song instead of performing live.`}
        </p>

      </div>

      {/* <div className={styles.divider}></div> */}


      <PromoBlock
        direction={'left'}
        title={'The String School Guitar Method'}
        photo={{image: '/images/bookCover.png', styles: { boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.5)', transform: 'rotate(10deg)'}}}
        text={`The String School Guitar Method is my textbook, and is currently in the second edition. Every student
      receives a free PDF copy, and printed copies are available at the cost of printing them, which is around $45 in 2023`}
      />

      <div className={styles.divider}></div>

      <PromoBlock
        direction={'right'}
        title={'The String School App'}
        photo={{image: '/images/appStores.webp'}}
        text={`Coming soon (late 2024/early 2025). Lessons include access to my String School app for web and iOS/Android. Features of the app include
      an interactive tab & sheet music player to view, print, and listen to my vast collection of sheet music, access to my lesson book
      and other online resources, robust options to track your progress and songs learned, rescheduling lessons,
      tracking payments, and more features on the way in 2024.`}
      />

      <div className={styles.divider}></div>

      <PromoBlock
        direction={'left'}
        title={'String School Concerts'}
        photo={{image: '/images/concerts.webp', styles: { border: 'solid 2px, rgba(255, 255, 255, .7'}}}
        text={`Since 2020, concerts have been hard to reimplement, but group concerts are back for 2024. These biannual
      performances are the best motivator, and a great opportunity for aspiring musicians to enjoy the payoff for all their hard work.`}
      />

      <div className={styles.divider}></div>


      <PromoBlock
        direction={'right'}
        title={'String School Studio'}
        photo={{image: '/images/studio.webp', styles: { border: 'solid 2px, rgba(255, 255, 255, .7'}}}
        text={`For those that are less inclined to be performers, you can record a song instead! Twice a year I offer the choice
      of a concert performance or recording studio time to record your own song! It can be an original, or a cover song of your choice that
      we work on throughout the year. Learn more about the String School Studio`}
      />

      <div className={styles.divider}></div>

      <PromoBlock
        direction={'left'}
        title={'Lesson Logs & Progress-Tracking'}
        photo={{image: '/images/progress.webp', styles: {border: 'solid 2px, rgba(255, 255, 255, .7'}}}
        text={`Through the String School app you can review lesson logs for each week you've attended a lesson to check
            on what we did, what to practice, and any notes or other info related to that week's session. You can also track skills you've
            learned and see them in relation to different skill paths for genres of music you'd like to learn or goals you'd like to accomplish.`}
      />

      <div className={styles.divider}></div>

      <PromoBlock
        direction={'right'}
        title={'A Commitment to Continually Improve'}
        photo={{image: '/images/me.jpeg', styles: {border: 'solid 2px, rgba(255, 255, 255, .7'}}}
        text={`When I began giving lessons in 2009, I had none of these things. The most important thing that I can offer my students
      is the promise that I am always looking for new and unique ways to improve my lessons! At least once per year, I roll out a series of
      improvements designed to help you learn faster and more comfortably! `}
      />



    </div>
  // </div>
  )
}