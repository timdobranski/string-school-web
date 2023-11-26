import styles from './UpcomingLessons.module.css';
import { getLessonClassNames } from '../../../utils/getLessonClassNames';
import { useState, useEffect } from 'react';
import getUpcomingLessons from '../../../utils/getUpcomingLessons';
import getAllUpcomingLessons from '../../../utils/getAllUpcomingLessons';

// Renders a table of upcoming lessons. Requires studentId and numOfLessons props.
// Optional props: setStep, setCancellation (for use in the cancel-lesson page)
export default function UpcomingLessons({  handler, studentId, numOfLessons }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scheduleDates, setScheduleDates] = useState([]);

  // fetch upcoming lesson dates
  useEffect(() => {
    async function fetchScheduleDates() {
      try {
        const dates = await getAllUpcomingLessons(10, false, 21);
        console.log('dates from getUpcomingLessons: ', dates)
        setScheduleDates(dates);
      } catch (error) {
        console.error("Error fetching schedule dates:", error);
        // Handle the error appropriately
      }
    }
    fetchScheduleDates();
  }, [])


  if (scheduleDates.schedule) {
    return (
      <div>
        <table className={styles.scheduleTable}>
          <thead>
            <tr>
              <th className={styles.columnHeader1}>Date</th>
              <th className={styles.columnHeader2}>Type</th>
              <th className={styles.columnHeader3}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {scheduleDates.schedule.map((date, index) => (
              <tr key={index}>
                <td className={`${styles.dateColumn} ${date.className}`}>
                  {`${date.day}, ${date.date} @ ${date.time}`}
                </td>
                <td className={styles.typeColumn}>
                  {date.type}
                </td>
                <td className={styles.noteColumn}>
                  {date.note || ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <p>Loading...</p>
      </div>)
  }
}