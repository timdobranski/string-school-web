'use client';

import styles from './ChooseCancellation.module.css';
import UpcomingLessons from '../UpcomingLessons/UpcomingLessons';

export default function ChooseCancellation({ setStep, setCancellation, student, user }) {

  const handleCancellationSelect = (date, time, note, dbDate, type, day) => {
    setCancellation({ date, time, note, dbDate, type, day });
    setStep(2);
  }

  return (
    <div className={styles.chooseCancellationWrapper}>
      {/* <h1 className='sectionHeaders'>Cancel Lesson</h1> */}
      <p className={styles.instructions}>{`Choose the lesson you'd like to cancel (or uncancel) from the list of upcoming lessons below:`}</p>
      <UpcomingLessons studentId={student.id} numOfLessons={10} handler={handleCancellationSelect} />
    </div>

  )

}