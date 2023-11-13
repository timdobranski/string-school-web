import styles from './UpcomingLessons.module.css';
import { getLessonClassNames } from '../../../utils/getLessonClassNames';

export default function UpcomingLessons({ scheduleDates }) {
  const upcomingLessons = scheduleDates.map((lesson, index) => {

    const { rowClassName, dateClassName, typeClassName } = getLessonClassNames(lesson.type, styles);

    // Check if the lesson type is a cancellation and render a custom message
    const lessonTypeDisplay = lesson.type === 'cancellation'
      ? `Cancelled by ${lesson.createdBy}`
      : lesson.type;

    // Use data-id attribute to store the lesson id
    const lessonIdAttribute = lesson.id ? { 'data-id': lesson.id } : {};

    // Add dbDate as data-dbdate attribute if it exists
    const dbDateAttribute = lesson.dbDate ? { 'data-dbdate': lesson.dbDate } : {};

    return (
      <tr key={index} className={rowClassName} {...lessonIdAttribute} {...dbDateAttribute}>
        <td className={`${styles.lesson} ${dateClassName}`}>{`${lesson.date} @ ${lesson.time}`}</td>
        <td className={`${styles.lessonType} ${typeClassName}`}>{lessonTypeDisplay}</td>
        <td className={styles.lessonNote}>{lesson.note || '-'}</td>
      </tr>
    );
  });

  return (
    <table className={styles.lessonsTable}>
    <thead>
      <tr>
        <th className='featureHeaders'>Lesson Time</th>
        <th className='featureHeaders'>Type</th>
        <th className='featureHeaders'>Note</th>
      </tr>
    </thead>
    <tbody>
      {upcomingLessons}
    </tbody>
  </table>
  )
}