'use client';

import styles from './ChooseCancellation.module.css';
import UpcomingLessons from '../UpcomingLessons/UpcomingLessons';

export default function ChooseCancellation({ setStep, setCancellation }) {
    return (
      <div className={styles.chooseCancellationWrapper}>
        <h1 className='sectionHeaders'>Cancel Lesson</h1>
        <p className={styles.instructions}>{`Choose the lesson you'd like to cancel (or uncancel) from the list of upcoming lessons below:`}</p>
        <UpcomingLessons studentId={21} numOfLessons={10} setStep={setStep} setCancellation={setCancellation} />
      </div>

    )

}