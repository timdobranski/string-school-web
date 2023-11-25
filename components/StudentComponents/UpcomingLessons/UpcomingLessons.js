import styles from './UpcomingLessons.module.css';
import { getLessonClassNames } from '../../../utils/getLessonClassNames';
import { useState, useEffect } from 'react';
import getUpcomingLessons from '../../../utils/getUpcomingLessons';
import getAllUpcomingLessons from '../../../utils/getAllUpcomingLessons';

// Renders a table of upcoming lessons. Requires studentId and numOfLessons props.
// Optional props: setStep, setCancellation (for use in the cancel-lesson page)
export default function UpcomingLessons({  setStep, setCancellation, studentId, numOfLessons }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scheduleDates, setScheduleDates] = useState([]);

  // fetch upcoming lesson dates
  useEffect(() => {
    async function fetchScheduleDates() {
      try {
        const dates = await getAllUpcomingLessons(10, false, 20);
        console.log('dates from getUpcomingLessons: ', dates)
        setScheduleDates(dates);
      } catch (error) {
        console.error("Error fetching schedule dates:", error);
        // Handle the error appropriately
      }
    }
    fetchScheduleDates();
  }, [])
  // convert upcoming lesson dates to jsx table rows


  return (
    <p>testing</p>
  )
}