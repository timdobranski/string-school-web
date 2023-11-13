'use client';

// import getDates from '../../../../utils/getDates';
import getUpcomingLessons from '../../../../utils/getUpcomingLessons';
import { supabase } from '../../../../utils/supabase';
import { useState, useEffect } from 'react';
import styles from './cancel-lesson.module.css';
// import populateScheduleDates from '../../../../utils/getDates';

export default function CancellationPage() {
  const student = {id: 21}
  // Components needed:

  // List of upcoming lessons
  // Confirmation?
  // Confirmed

  const [scheduleDates, setScheduleDates] = useState([]);
  const [upcomingLessons, setUpcomingLessons] = useState([]);

  useEffect(() => {
    async function fetchScheduleDates() {
      try {
        const dates = await getUpcomingLessons(student.id, 10);
        setScheduleDates(dates);
      } catch (error) {
        console.error("Error fetching schedule dates:", error);
        // Handle the error appropriately
      }
    }

    fetchScheduleDates();
  }, []);

  useEffect(() => {
  console.log('scheduleDates: ', scheduleDates);
  const upcomingLessons = scheduleDates.map((lesson, index) => (
    <tr key={index} className={styles.regularRow}>
    <td className={`${styles.lesson} ${lesson.type === 'cancellation' ? styles.cancellationRow : ''}`}>{lesson.date}</td>
    <td className={styles.lessonType}>{lesson.type}</td>
    <td className={styles.lessonNote}>{lesson.note || 'N/A'}</td>
  </tr>
  ));
  setUpcomingLessons(upcomingLessons)
  }, [scheduleDates])






  return (
    <div className='infoCard'>
      <h1 className='sectionHeaders'>Cancel Lesson</h1>
      <p className={styles.instructions}>{`Choose the lesson you'd like to cancel from the list of upcoming lessons below:`}</p>
      <table className={styles.lessonsTable}>
    <thead>
      <tr>
        <th className='featureHeaders'>Lesson Time</th>
        <th className='featureHeaders'>Type</th>
        <th className='featureHeaders'>Note</th>
      </tr>
    </thead>
    <tbody>
      {scheduleDates ? upcomingLessons : <h2>Loading...</h2>}
    </tbody>
  </table>
    </div>
  )
}