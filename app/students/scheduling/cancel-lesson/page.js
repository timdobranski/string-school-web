'use client';

import getUpcomingLessons from '../../../../utils/getUpcomingLessons';
import { supabase } from '../../../../utils/supabase';
import { useState, useEffect } from 'react';
import styles from './cancel-lesson.module.css';
import UpcomingLessons from '../../../../components/StudentComponents/UpcomingLessons/UpcomingLessons';
import ChooseCancellation from '../../../../components/StudentComponents/ChooseCancellation/ChooseCancellation';

export default function CancellationPage() {
  const student = {id: 21}
  // Components needed:

  // List of upcoming lessons [check]
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

    setUpcomingLessons(upcomingLessons);
  }, [scheduleDates]);






  return (
    <div className='infoCard'>
      {/* <h1 className='sectionHeaders'>Cancel Lesson</h1>
      <p className={styles.instructions}>{`Choose the lesson you'd like to cancel from the list of upcoming lessons below:`}</p>
      <UpcomingLessons scheduleDates={scheduleDates} /> */}
      <ChooseCancellation scheduleDates={scheduleDates} />
    </div>
  )
}