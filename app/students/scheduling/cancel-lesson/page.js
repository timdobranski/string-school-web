'use client';

import { supabase } from '../../../../utils/supabase';
import { useState, useEffect } from 'react';
import styles from './cancel-lesson.module.css';
import getUpcomingLessons from '../../../../utils/getUpcomingLessons';
import ChooseCancellation from '../../../../components/StudentComponents/ChooseCancellation/ChooseCancellation';
import ConfirmCancellation from '../../../../components/StudentComponents/ConfirmCancellation/ConfirmCancellation';
import CancellationConfirmed from '../../../../components/StudentComponents/CancellationConfirmed/CancellationConfirmed';

export default function CancellationPage() {
  const [step, setStep] = useState(1);
  // !!!!!!!!!!!!! NEED TO UPDATE TO REAL STUDENT ID !!!!!!!!!!!!!
  const student = {id: 21}

  const [scheduleDates, setScheduleDates] = useState([]);
  const [upcomingLessons, setUpcomingLessons] = useState([]);
  const [cancellation, setCancellation] = useState({time: '', note: '', createdBy: '', dbDate: ''});

  // get upcoming lessons
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

  // set upcoming lessons
  useEffect(() => {
    setUpcomingLessons(upcomingLessons);
  }, [scheduleDates]);

  useEffect(() => {
    console.log('cancellation: ', cancellation)
  }, [cancellation]);

  return (
    <div className='infoCard'>
      { step === 1 ? <ChooseCancellation
        scheduleDates={scheduleDates}
        setCancellation={setCancellation}
        setStep={setStep} /> : null}
      { step === 2 ? <ConfirmCancellation
        scheduleDates={scheduleDates}
        setCancellation={setCancellation}
        cancellation={cancellation}
        setStep={setStep} /> : null}
      { step === 3 ? <CancellationConfirmed scheduleDates={scheduleDates} setStep={setStep} /> : null}
    </div>
  )
}