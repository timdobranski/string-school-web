import styles from './home.module.css';
import PublicNavbar from '../../../components/PublicNavbar/PublicNavbar';

export default function PublicHome() {

  return (
    <main className='appContainer'>
      {/* <PublicNavbar /> */}


      <div className='infoCard'>
        <h1>Welcome!</h1>
        <p className='text'>
          {`My name is Tim, and I provide guitar & ukulele lessons in Fletcher Hills (formerly La Mesa), California.
        You can learn more about me here.`}
        </p>
        <p className='text'>{`The La Mesa String School is simply the catchier name that I use for my lessons.
        I began teaching in Fall of 2009 and in each year since, I have added new and exciting improvements to my lessons.
        Please check out my Yelp reviews here!`}</p>
        <p className='text'>{` I offer professional, affordable music instruction and serve students of all musical backgrounds and all ages.
      This includes all major styles of guitar (acoustic, electric and classical), and ukulele as well as general musical training.
      Lessons are given at my home studio in Fletcher Hills. There are several good options for guitar instructors in the San Diego area,
      but I have worked hard to incorporate some truly innovative ideas into my lessons that I believe make them the very best.
      Here are a few of the innovations that I offer:`}</p>

        <h2 className='featureHeaders'>The String School Guitar Method</h2>
        <p className='text'>{`The String School Guitar Method is my textbook, and is currently in the second edition. Every student
      receives a free PDF copy, and printed copies are available at the cost of printing them, which is around $45 in 2023`}</p>

        <h2 className='featureHeaders'>The String School App</h2>
        <p className='text'>{`Lessons include access to my String School app for web and iOS/Android. Features of the app include
      an interactive tab & sheet music player to view, print, and listen to my vast collection of sheet music, access to my lesson book
      and other online resources, robust options to track your progress and songs learned, rescheduling lessons,
      tracking payments, and more features on the way in 2024.`}</p>

        <h2 className='featureHeaders'>String School Concerts</h2>
        <p className='text'>{`Since 2020, concerts have been hard to reimplement, but group concerts are back for 2024. These biannual
      performances are the best motivator, and a great opportunity for aspiring musicians to enjoy the payoff for all their hard work.`}</p>

        <h2 className='featureHeaders'>String School Studio</h2>
        <p className='text'>{`For those that are less inclined to be performers, you can record a song instead! Twice a year I offer the choice
      of a concert performance or recording studio time to record your own song! It can be an original, or a cover song of your choice that
      we work on throughout the year. Learn more about the String School Studio`}</p>

        <h2 className='featureHeaders'>Lesson Logs & Progress-Tracking</h2>
        <p className='text'>{`Through the String School app you can review lesson logs for each week you've attended a lesson to check
      on what we did, what to practice, and any notes or other info related to that week's session. You can also track skills you've
      learned and see them in relation to different skill paths for genres of music you'd like to learn or goals you'd like to accomplish.`}</p>

        {/* <h2 className='featureHeader'></h2>
      <p className='text'></p>

      <h2 className='featureHeader'></h2>
      <p className='text'></p> */}

        <h2 className='featureHeaders'>{`A Commitment To Constantly Improve`}</h2>
        <p className='text'>{`When I began giving lessons in 2009, I had none of these things. The most important thing that I can offer my students
      is the promise that I am always looking for new and unique ways to improve my lessons! At least once per year, I roll out a series of
      improvements designed to help you learn faster and more comfortably! `}</p>




      </div>
    </main>
  )
}