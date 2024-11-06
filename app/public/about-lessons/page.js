import styles from './about-lessons.module.css'

export default function AboutLessons() {
  return (
    <div className='pageContentWrapper'>
      <h2 className='featureHeaders'>Teaching Approach</h2>
      <p className={'text'}>{`I believe each student requires their own
      unique approach, but there are common themes that I try to implment with most students:`}</p>

      <div className={styles.lessonInfoWrapper}>
        <div className={styles.lessonInfoSection}>
          <h2 className='featureHeaders'>Projects</h2>

          <p className={'text'}>{`I encourage every student to persue a project of some kind,
      and I've found tremendous success with students who engage with this idea. Projects can include my very own biannual concerts, recording a
      song here in my studio, starting their own social media channel through YouTube, starting a band with friends or classmates, etc.`}</p>

        </div>
        <div className={`${styles.lessonInfoSection} ${styles.middleInfoSection}`}>
          <h2 className='featureHeaders'>Tech</h2>

          <p className={'text'}>{`Whenever possible, I incorporate the latest tech into my lessons in ways that continue to make learning
to play an instrument much easier. I use and highly recommend Guitar Pro software, and all students have access to my 50% off code to buy it yourself.
 `}</p>
        </div>
        <div className={styles.lessonInfoSection}>
          <h2 className='featureHeaders'>Structure</h2>

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
          <p className='text'>{`Lessons are held at my home in Fletcher Hills, CA. As this is my personal residence as well,
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

      <h2 className='featureHeaders'>Lesson Policies</h2>
      <p className='text'>Good attendance is expected of every student.</p>
      <p className='text'>Missed lessons can be rescheduled as long as they are
      cancelled in the app with two hours notice. </p>
      <p className='text'>Missed lessons do not reduce monthly fees.</p>
      <p className='text'>Monthly fees are only reduced when I cancel a lesson if you opt for the bill
      credit instead of a makeup credit.</p>
      <p className='text'>New students can begin in the middle of the month at a prorated rate.</p>


    </div>
  )
}