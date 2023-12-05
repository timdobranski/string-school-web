import styles from './StudentLessonLog.module.css';
import dateFormatter from '../../../utils/dateFormatter';

export default function StudentLessonLog({ log }) {

  const date = dateFormatter(log.created_at, {includeYear: false});
  console.log('log: ', log);
  return (

    <div className={styles.lessonLogWrapper}>
      <h1 className={styles.lessonLogHeader}>{date}</h1>
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