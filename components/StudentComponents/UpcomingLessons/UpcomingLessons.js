import styles from './UpcomingLessons.module.css';
import { getLessonClassNames } from '../../../utils/getLessonClassNames';
import { useState, useEffect } from 'react';
import getUpcomingLessons from '../../../utils/getUpcomingLessons';

// Renders a table of upcoming lessons. Requires studentId and numOfLessons props.
// Optional props: setStep, setCancellation (for use in the cancel-lesson page)
export default function UpcomingLessons({  setStep, setCancellation, studentId, numOfLessons }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scheduleDates, setScheduleDates] = useState([]);

  // fetch upcoming lesson dates
  useEffect(() => {
    async function fetchScheduleDates() {
      try {
        const dates = await getUpcomingLessons(studentId, numOfLessons);
        setScheduleDates(dates);
      } catch (error) {
        console.error("Error fetching schedule dates:", error);
        // Handle the error appropriately
      }
    }
    fetchScheduleDates();
  }, [])
  // convert upcoming lesson dates to jsx table rows
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
    const typeAttribute = lesson.type ? { 'data-type': lesson.type } : {};

    return (
      <tr key={index} className={rowClassName} {...lessonIdAttribute} {...dbDateAttribute} {...typeAttribute} onClick={(e) =>{handleClick(e)}}>
        <td className={`${styles.lesson} ${dateClassName}`}  >{`${lesson.date} @ ${lesson.time}`}</td>
        <td className={`${styles.lessonType} ${typeClassName}`}>{lessonTypeDisplay}</td>
        <td className={styles.lessonNote}>{lesson.note || '-'}</td>
      </tr>
    );
  });

  // sets the cancellation data and moves to the next step,
  // after checking if the cancellation is an un-cancellation
  // and less than 24hours before the lesson
  const handleClick = (e) => {
    const clickedElement = e.currentTarget;
    const lessonId = clickedElement.getAttribute('data-id');
    const dbDate = clickedElement.getAttribute('data-dbdate');
    const type = clickedElement.getAttribute('data-type');
    const lessonTextContent = clickedElement.querySelector(`.${styles.lesson}`).textContent;
    const [dateString, time] = lessonTextContent.split(' @ ');

    function parseCustomDateString(dateString, time) {
      const now = new Date();
      const currentYear = now.getFullYear();

      // Remove the day of the week ("Monday, ")
      let datePart = dateString.split(', ')[1];

      // Remove the "th" from the date
      datePart = datePart.replace(/(\d+)(st|nd|rd|th)/, '$1');

      // Convert 12-hour time to 24-hour time
      let timePart = time.toUpperCase(); // Ensure PM/AM is uppercase
      let [hours, minutesPart] = timePart.split(':');
      let [minutes, modifier] = minutesPart.split(/(AM|PM)/);

      hours = parseInt(hours);
      minutes = parseInt(minutes);

      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      // Create a temporary date object with the current year
      let tempDate = new Date(`${currentYear}-${datePart} ${hours}:${minutes}`);

      // If the tempDate has already passed, use the next year
      if (tempDate < now) {
        tempDate.setFullYear(currentYear + 1);
      }
      return tempDate;
    }

    // Parse the cancellation date and time
    const cancellationDateTime = parseCustomDateString(dateString, time);
    const now = new Date();

    // Check if the cancellation is at least 20 hours in the future
    const hoursDifference = (cancellationDateTime - now) / (1000 * 60 * 60);
    if (type === 'cancellation' && hoursDifference < 20) {
      setModalIsOpen(true);
      return; // Exit the function early if the condition is met
    }

    // Update the cancellation object with dateString and time, along with id or dbDate
    if (lessonId) {
      setCancellation(prevCancellation => ({ ...prevCancellation, id: lessonId, time, dateString, type }));
    } else if (dbDate) {
      setCancellation(prevCancellation => ({ ...prevCancellation, dbDate, time, dateString, type }));
    }

    setStep(prevStep => prevStep + 1);
  };
  // conditionally render message or no table
  if (scheduleDates.length === 0) {
    return <p>Searching for upcoming lessons...</p>;
  }
  return (
    <>
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
  {modalIsOpen ?
  (<div className={styles.modal} onClick={() => setModalIsOpen(false)}>
    <div className={styles.modalContent}>
      <p>Sorry, you cannot un-cancel a lesson less than 24 hours before the lesson time.</p>
      </div>
    </div>
  )
    : null}
    </>
  )
}