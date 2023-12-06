import styles from './StudentLessonLog.module.css';
import dateFormatter from '../../../utils/dateFormatter';

export default function StudentLessonLog({ log }) {

  const date = dateFormatter(log.created_at, {includeYear: false});

  return (

    <div className={styles.lessonLogWrapper}>
      <h1 className={styles.date}>{date}</h1>
      <div className={styles.lessonLogsHeader}>
        <h3>Lesson Summary</h3>
        <h3>Practice</h3>
        <h3>Notes</h3>

      </div>
      <div className={styles.logRowContainer}>
        <div className={styles.whatWeDidColumn}>
          {log.what_we_did}
        </div>

        <div className={styles.whatToPracticeColumn}>
          {log.what_to_practice}
        </div>

        <div className={styles.notesColumn}>
          {log.notes}
        </div>
      </div>
    </div>

  )
}