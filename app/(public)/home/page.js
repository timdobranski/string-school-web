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
        videoSrc={'/videos/home-hero-2.mp4'}

        loopVideo={true}
        hideTitle={true}
        // textDirection={'right'}
        text={[]}
      />

      <div id='welcome'>
        <PromoBlock
          direction={'left'}
          background={'lightBackground1'}
          title={'WELCOME!'}
          // titleClassName={'whiteTitle'}
          photo={{
            image: '/images/me/me-2.jpg',
            webp: '/images/me/me-2.webp',
          }}
          text={`My name is Tim, and I provide guitar & ukulele lessons in Fletcher Hills (formerly La Mesa), California under the name The La Mesa String School.
          My lessons are designed to be fun and modern, with an emphasis on applying skills as they're learned through optional performances or recordings.
          Read more below to learn about some of the unique features of my lessons.`}
        />
      </div>

      <div id='stringSchoolApp'>
        <PromoBlock
          direction={'right'}
          background={'white'}
          title={'The String School App'}
          photo={{
            image: '/images/home-page/tech-green-background.jpg',
            webp: '/images/home-page/tech-green-background.webp',
          }}
          text={`This is the String School web app, and while features for students are still being finalized, it will eventually handle scheduling, tracking progress, and accessing sheet music and resources.
       Other features include an interactive tab & sheet music player to view, print, and listen to my vast collection of digital sheet music,
       weekly lesson logs, and various progress paths to view your achievements in different areas of focus. Once the web app is complete, work will begin on finalizing the mobile
       app for iOS and Android as well.`}
        />
      </div>
      <div id='concerts'>
        <PromoBlock
          direction={'left'}
          title={'String School Concerts'}
          background={'lightBackground1'}
          photo={{
            image: '/images/home-page/concerts-2.jpg',
            webp: '/images/home-page/concerts-2.webp',
            styles: { border: 'solid 2px, rgba(255, 255, 255, .7'}}}
          text={`Student concerts can be one of the most fun and exciting ways to show off your skills. I hold concerts twice per year, they include
           top tier lighting and sound, and a custom-built stage set that rivals any concert venue in San Diego! Learn more about concerts <a style='text-decoration: underline' href="/concerts">here</a>.`}
        />
      </div>
      <div id='stringsmith'>
        <PromoBlock
          direction={'right'}
          background={'white'}
          tag={'Coming 2025'}
          title={`Custom Tools\u00A0&\u00A0Games`}
          photo={{
            image: '/images/home-page/stringsmith-mockup-blue.jpg',
            webp: '/images/home-page/stringsmith-mockup-blue.webp',
            styles: { }}}
          text={`I use my skills as a software developer to create custom interactive virtual tools and games for my students. When I find that a student is struggling with a concept,
             I either find or create a tool or game to help them learn it faster and more effectively. These tools are available to all students through the String School app and will
             be launched as a standalone learning platform for those who are not students in the future. Check out a free preview example <a style='text-decoration: underline' href="https://stringsmith.vercel.app/fretboard">here</a>.`}
        />
      </div>
      <div id='studio'>
        <PromoBlock
          direction={'left'}
          background={'lightBackground1'}

          title={'String School Studio'}
          photo={{
            image: '/images/home-page/studio.jpg',
            webp: '/images/home-page/studio.webp',
            styles: { border: 'solid 2px, rgba(255, 255, 255, .7'}}}
          text={`For those that are less inclined to be performers, you can record a song instead! Twice a year I offer the choice
      of a concert performance or recording studio time to record your own song! It can be an original, or a cover song of your choice that
      we work on throughout the year. Learn more about the String School Studio`}
        />
      </div>

      <div id='book'>
        <PromoBlock
          direction={'right'}
          background={'white'}
          title={'The String School Book'}
          photo={{
            image: '/images/home-page/book-mockup-wide.jpg',
            webp: '/images/home-page/book-mockup-wide.webp',
          }}
          text={`The String School Guitar Method is my textbook, and it is currently in the second edition. Every student
      receives a free PDF copy, and printed copies are available at the cost of printing them. Much of the book teaches concepts through color-coded
      charts and information, which has been a big help for students but also raises the cost of printing to around $45 or so in 2025.`}
        />
      </div>

      <div id='progress'>
        <PromoBlock
          direction={'left'}
          background={'lightBackground1'}
          title={'Lesson Logs'}
          photo={{
            image: '/images/home-page/progress.jpg',
            webp: '/images/home-page/progress.webp',
            styles: {border: 'solid 2px, rgba(255, 255, 255, .7'}}}
          text={`Through the String School app you can review lesson logs for each week you've attended a lesson to check
            on what we did, what to practice, and any notes or other info related to that week's session. You can also track skills you've
            learned and see them in relation to different skill paths for genres of music you'd like to learn or goals you'd like to accomplish.`}
        />
      </div>

      <div id='guitarPro'>
        <PromoBlock
          direction={'right'}
          background={'white'}
          title={'Guitar Pro 8'}
          photo={{
            image: '/images/home-page/guitar-pro.jpg',
            webp: '/images/home-page/guitar-pro.webp',
            styles: {border: 'solid 2px, rgba(255, 255, 255, .7'}}}
          text={`All students receive my personal 50% off code to purchase Guitar Pro 8, an incredible program for reading, writing, and practicing music for guitar.`}
        />
      </div>



      <div id='future'>
        <PromoBlock
          direction={'left'}
          background={'lightBackground1'}
          title={'The Future'}
          photo={{
            image: '/images/me/me-2.jpg',
            webp: '/images/me/me-2.webp',
            styles: {margin: '2rem 0 2rem 0'}}}
          text={`When I began giving lessons in 2009, I had none of these things. The most important thing that I can offer my students
      is the promise that I am always looking for new and unique ways to improve my lessons! At least once per year, I roll out a series of
      improvements designed to help you learn faster and more comfortably! `}
        />
      </div>


    </div>
  // </div>
  )
}