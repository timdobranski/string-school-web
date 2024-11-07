import styles from './about-me.module.css';
import Image from 'next/image';

export default function AboutMe() {


  return (
    <div className='pageContentWrapper'>
      <div className={styles.imgContainer}>
        <Image src='/images/me.jpeg' alt='photo of tim playing guitar'fill='true'/>
      </div>

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
        <p className='text'>{`I began working for the La Mesa/Spring Valley School District in 2006 with
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

    </div>
  )
}