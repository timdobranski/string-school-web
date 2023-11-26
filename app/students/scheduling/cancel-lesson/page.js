'use client';

import { supabase } from '../../../../utils/supabase';
import { useState, useEffect } from 'react';
import StudentContext, { useAuth } from '../../layout.js';
import styles from './cancel-lesson.module.css';
import getUpcomingLessons from '../../../../utils/getUpcomingLessons.js';
import ChooseCancellation from '../../../../components/StudentComponents/ChooseCancellation/ChooseCancellation';
import ConfirmCancellation from '../../../../components/StudentComponents/ConfirmCancellation/ConfirmCancellation';
import SchedulingConfirm from '../../../../components/StudentComponents/SchedulingConfirm/SchedulingConfirm';

export default function CancellationPage() {
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();
  const [step, setStep] = useState(1);
  const [scheduleDates, setScheduleDates] = useState([]);
  const [upcomingLessons, setUpcomingLessons] = useState([]);
  const [cancellation, setCancellation] = useState({dateString: '', time: '', note: '', createdBy: '', dbDate: '', id: '', type:''});

  // get upcoming lessons
  useEffect(() => {
    if (!student) return;

    async function fetchScheduleDates() {
      try {
        const dates = await getUpcomingLessons(student.id, 10);
        console.log('dates from getUpcomingLessons: ', dates)
        setScheduleDates(dates);
      } catch (error) {
        console.error("Error fetching schedule dates:", error);
        // Handle the error appropriately
      }
    }
    fetchScheduleDates();
  }, [student]);

  useEffect(() => {
    console.log('supabaseUserData: ', supabaseUserData);
  }, [supabaseUserData])

  useEffect(() => {
    window.history.pushState({ step }, '', `?step=${step}`);
  }, [step]);

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state?.step) {
        setStep(event.state.step);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (supabaseUserData && student && scheduleDates && upcomingLessons) {
    return (
      <div className='infoCard'>

        { step === 1 ? <ChooseCancellation
          scheduleDates={scheduleDates}
          setCancellation={setCancellation}
          student={student}
          user={supabaseUserData}
          setStep={setStep} /> : null}

        { step === 2 ? <ConfirmCancellation
          scheduleDates={scheduleDates}
          setCancellation={setCancellation}
          cancellation={cancellation}
          setStep={setStep}
          student={student}
          user={supabaseUserData} /> : null}

        { step === 3 ? <SchedulingConfirm
          scheduleDates={scheduleDates}
          cancellation={cancellation}
          // setStep={setStep}
          student={student}
          type='cancellation' /> : null}
      </div>
    )
  } else {
    return (<h1>Loading...</h1>)
  }
}

