'use client';

import { supabase } from '../../../../utils/supabase';
import { useState, useEffect } from 'react';
import StudentContext, { useAuth } from '../../layout.js';
import styles from './cancel-lesson.module.css';
import getUpcomingLessons from '../../../../utils/getUpcomingLessons.js';
import ChooseCancellation from '../../../../components/StudentComponents/ChooseCancellation/ChooseCancellation';
import ConfirmCancellation from '../../../../components/StudentComponents/ConfirmCancellation/ConfirmCancellation';
import CancellationConfirmed from '../../../../components/StudentComponents/CancellationConfirmed/CancellationConfirmed';

export default function CancellationPage() {
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();
  const [step, setStep] = useState(1);
  // !!!!!!!!!!!!! NEED TO UPDATE TO REAL STUDENT ID !!!!!!!!!!!!!
  // const student = {id: 21}

  const [scheduleDates, setScheduleDates] = useState([]);
  const [upcomingLessons, setUpcomingLessons] = useState([]);
  const [cancellation, setCancellation] = useState({dateString: '', time: '', note: '', createdBy: '', dbDate: '', id: '', type:''});

  // get upcoming lessons
  useEffect(() => {
    if (!student) return;

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
  }, [student]);

  useEffect(() => {
    console.log('supabaseUserData: ', supabaseUserData);
  }, [supabaseUserData])


  if (supabaseUserData && student && scheduleDates && upcomingLessons) {
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
          setStep={setStep}
          student={student}
          user={supabaseUserData} /> : null}

        { step === 3 ? <CancellationConfirmed
          scheduleDates={scheduleDates}
          cancellation={cancellation}
          setStep={setStep}
          student={student} /> : null}
      </div>
    )
  } else {
    return (<h1>Loading...</h1>)
  }
}