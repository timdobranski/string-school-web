import styles from './ChooseCancellation.module.css';
import UpcomingLessons from '../UpcomingLessons/UpcomingLessons';
import { getUpcomingLessons } from '../../../utils/getUpcomingLessons';

export default function ChooseCancellation({ scheduleDates, setStep, setCancellation }) {
    return (
      <div className={styles.chooseCancellationWrapper}>
        <h1 className='sectionHeaders'>Cancel Lesson</h1>
        <p className={styles.instructions}>{`Choose the lesson you'd like to cancel from the list of upcoming lessons below:`}</p>
        <UpcomingLessons scheduleDates={scheduleDates} setStep={setStep} setCancellation={setCancellation} />
      </div>

    )

}