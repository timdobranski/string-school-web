import styles from './about-lessons.module.css'

export default function AboutLessons() {
  return (
    <div className='infoCard'>
      <h2 className='featureHeaders'>Lesson Schedule</h2>
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


      <h2 className='featureHeaders'>Lesson Fees</h2>
      <p className='text'>Fees are the same every month, regardless of the number of weeks/lessons in the month.</p>
      <p className='text'>Most months will include 4 weekly lessons; some will include an extra 5th.</p>
      <p className='text'></p>

      <div className={styles.feeDivider}>
        <div className={styles.feesLeft}>
          <p className={styles.price}>$120/month</p>
          <p>Cash</p>
        </div>
        <div className={styles.feesColumn}>
          or
        </div>
        <div className={styles.feesRight}>
          <p className={styles.price}>$140/month</p>
          <p>Venmo</p>
          <p>Paypal</p>
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