import styles from './StudentPracticeSession.module.css';
import dateFormatter from '../../../utils/dateFormatter';

export default function StudentPracticeSession({ session }) {
  const date = dateFormatter(session.day, {includeYear: false});
  return (
    <div className={styles.practiceSessionWrapper}>
      <h3 className={styles.date}>{date}</h3>
      <h3 className={styles.duration}>{`${session.duration} mins`}</h3>
      <h3 className={styles.notes}>{session.notes}</h3>

    </div>
  )

}