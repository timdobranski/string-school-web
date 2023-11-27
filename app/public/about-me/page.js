import styles from './about-me.module.css';
import Image from 'next/image';

export default function AboutMe() {


  return (
    <div className='infoCard'>
      <div className={styles.imgContainer}>
        <Image src='/images/me.jpeg' alt='photo of tim playing guitar'fill='true'/>
      </div>
      <p className='text'>{`My name is Tim and I teach guitar under the catchier name of The La Mesa String School.
        I'm a La Mesa native. I began offering private guitar lessons in college in 2009, and
        I've spent the last 13 years working for the La Mesa/Spring Valley School District with
        children grades K-8th. I currently teach my very own RockStar Guitar Troupe, traveling
        to various schools throughout the district to work with groups of 10-20 kids grades 4-8th.`}
      </p>

      <p className='text'>{`I picked up the guitar early in grade school and I've been playing ever
      since. In the 20 some years since then, I've learned from many of San Diego's best guitar
      instructors. I spent several years after high school in a band gaining experience as both a
      musician and a businessman. We were signed to a record label, released one album and then
      promptly broke up!`}
      </p>

      <p className='text'>{`My name is Tim and I teach guitar under the catchier name of The La Mesa String School.
        I'm a La Mesa native. I began offering private guitar lessons in college in 2009, and
        I've spent the last 13 years working for the La Mesa/Spring Valley School District with
        children grades K-8th. I currently teach my very own RockStar Guitar Troupe, traveling
        to various schools throughout the district to work with groups of 10-20 kids grades 4-8th.`}
      </p>


    </div>
  )
}