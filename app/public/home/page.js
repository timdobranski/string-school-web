import styles from './home.module.css';
// import PublicNavbar from '../../../components/PublicNavbar/PublicNavbar';
import PromoBlock from '../../../components/Public/PublicTextAndPhoto/PromoBlock';
import Hero from '../../../components/Public/PublicHero/Hero';

export default function PublicHome() {

  return (

    <div>

      <Hero
        type={'video'}
        title={['WELCOME TO STRING SCHOOL']}
        button={true}
        buttonHash={'welcome'}
        image={'/images/hero-3.png'}
        // textDirection={'right'}
        text={[]}
      />

      <div id='welcome'>
        <PromoBlock
          direction={'right'}
          background={'white'}
          title={'WELCOME!'}
          photo={{image: '/images/me/me.webp'}}
          text={`My name is Tim, and I provide guitar & ukulele lessons in Fletcher Hills (formerly La Mesa), California under the name The La Mesa String School.
          My lessons are designed to be fun and modern, with an emphasis on applying skills as they're learned through optional performances or recordings.
          Read more below to learn about some of the unique features of my lessons.`}
        />
      </div>

      <div id='book'>
        <PromoBlock
          direction={'left'}
          background={'lightBackground1'}
          title={'The String School Guitar Method'}
          photo={{image: '/images/book.webp'}}
          text={`The String School Guitar Method is my textbook, and it is currently in the second edition. Every student
      receives a free PDF copy, and printed copies are available at the cost of printing them. Much of the book teaches concepts through color-coded
      charts and information, which has been a big help for students but also raises the cost of printing to around $45 or so in 2025.`}
        />
      </div>

      <div id='stringSchoolApp'>
        <PromoBlock
          direction={'right'}
          background={'white'}
          title={'The String School App'}
          photo={{image: '/images/appStores.webp'}}
          text={`Coming soon (late 2024/early 2025).
        The String School app for web and iOS/Android will handle scheduling, tracking progress, and accessing sheet music and resources.
       Features of the app include an interactive tab & sheet music player to view, print, and listen to my vast collection of digital sheet music,
       weekly lesson logs, and various progress paths to view your achievements in various areas.`}
        />
      </div>
      <div id='concerts'>
        <PromoBlock
          direction={'left'}
          title={'String School Concerts'}
          background={'lightBackground1'}
          photo={{image: '/images/concerts.webp', styles: { border: 'solid 2px, rgba(255, 255, 255, .7'}}}
          text={`Student concerts can be one of the most fun and exciting ways to show off your skills. I hold concerts twice per year, and
          starting in March 2025 concerts are going to move to the next level with top tier lighting and sound, and a custom-built stage set that
          rivals any concert venue in San Diego!`}
        />
      </div>
      <div id='studio'>
        <PromoBlock
          direction={'right'}
          background={'white'}

          title={'String School Studio'}
          photo={{image: '/images/studio.webp', styles: { border: 'solid 2px, rgba(255, 255, 255, .7'}}}
          text={`For those that are less inclined to be performers, you can record a song instead! Twice a year I offer the choice
      of a concert performance or recording studio time to record your own song! It can be an original, or a cover song of your choice that
      we work on throughout the year. Learn more about the String School Studio`}
        />
      </div>
      <div id='progress'>
        <PromoBlock
          direction={'left'}
          background={'lightBackground1'}
          title={'Lesson Logs & Progress-Tracking'}
          photo={{image: '/images/progress.webp', styles: {border: 'solid 2px, rgba(255, 255, 255, .7'}}}
          text={`Through the String School app you can review lesson logs for each week you've attended a lesson to check
            on what we did, what to practice, and any notes or other info related to that week's session. You can also track skills you've
            learned and see them in relation to different skill paths for genres of music you'd like to learn or goals you'd like to accomplish.`}
        />
      </div>
      <div id='stringsmith'>
        <PromoBlock
          direction={'right'}
          background={'white'}
          tag={'Coming 2025'}
          title={'Stringsmith'}
          photo={{image: '/images/stringsmithGlitterbomb.webp', styles: { border: 'solid 2px, rgba(255, 255, 255, .7'}}}
          text={`All students receive access to my online learning platform and game, Stringsmith. Stringsmith is a collection of interactive lessons, games,
          and exercises designed to help you learn to play guitar and ukulele faster and more effectively. It's like an interactive version of my
          textbook! It features customizable guitar fretboards also integrates with my String School app to track your progress and your practice time. These two apps work together: The String
          School app is to handle scheduling and access to resources, and Stringsmith is for actual learning and practice.`}
        />
      </div>

      <div id='guitarPro'>
        <PromoBlock
          direction={'left'}
          background={'lightBackground1'}
          title={'Guitar Pro 8'}
          photo={{image: '/images/guitarPro.png', styles: {border: 'solid 2px, rgba(255, 255, 255, .7'}}}
          text={`All students receive my personal 50% off code to purchase Guitar Pro 8, an incredible program for reading, writing, and practicing music for guitar.`}
        />
      </div>



      <div id='future'>
        <PromoBlock
          direction={'right'}
          background={'white'}
          title={'Continual Improvements'}
          photo={{image: '/images/me/me.jpeg', styles: {border: 'solid 2px, rgba(255, 255, 255, .7'}}}
          text={`When I began giving lessons in 2009, I had none of these things. The most important thing that I can offer my students
      is the promise that I am always looking for new and unique ways to improve my lessons! At least once per year, I roll out a series of
      improvements designed to help you learn faster and more comfortably! `}
        />
      </div>


    </div>
  // </div>
  )
}