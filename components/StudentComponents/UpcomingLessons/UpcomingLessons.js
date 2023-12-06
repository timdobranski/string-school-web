import styles from './UpcomingLessons.module.css';
// import { getLessonClassNames } from '../../../utils/getLessonClassNames';
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

        //Remove lessons that are in the past:
        const pacificTime = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
        const currentDate = new Date(pacificTime);
        const formattedDate = currentDate.toISOString().split('T')[0];

        dates.schedule = dates.schedule.filter(date => date.dbDate >= formattedDate);

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
      <table className={styles.scheduleTable}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.columnHeader1}>Date</th>
            <th className={styles.columnHeader2}>Type</th>
            <th className={styles.columnHeader3}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {scheduleDates.schedule.map((date, index) => (
            <tr key={index} className={styles.lessonRow}>
              <td
                className={`${styles.dateColumn} ${styles[`${date.className}Date`]}`}
                onClick={() => {handler(date.date, date.time, date.note, date.dbDate, date.type, date.day, date.id, date.associated_makeup, date.associated_cancellation)}} >
                {`${date.day}, ${date.date} @ ${date.time}`}
              </td>
              <td className={`${styles.typeColumn} ${styles[date.className]}`}>
                {date.type}
              </td>
              <td className={styles.noteColumn}>
                {date.note || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  } else {
    return (
      <div>
        <p>Loading...</p>
      </div>)
  }
}