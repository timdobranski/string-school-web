'use client';

import { useState, useEffect } from 'react';
import styles from './reschedule-lesson.module.css';
import StudentContext, { useAuth } from '../../layout.js';
import ChooseMakeup from '../../../../components/StudentComponents/ChooseMakeup/ChooseMakeup';
import ChooseCancellation from '../../../../components/StudentComponents/ChooseCancellation/ChooseCancellation';
import ConfirmReschedule from '../../../../components/StudentComponents/ConfirmReschedule/ConfirmReschedule';
import SchedulingConfirm from '../../../../components/StudentComponents/SchedulingConfirm/SchedulingConfirm';

export default function RescheduleLesson() {
  const [step, setStep] = useState(1); // choose cancel, choose makeup, confirm, confirmed
  const [cancellation, setCancellation] = useState({date: '', time: '', note: '', createdBy: null, dbDate: '', student: null, type: '', day: ''});
  const [makeup, setMakeup] = useState({date: '', time: '', note: '', createdBy: null, dbDate: '', student: null, day: ''});
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();

  if (!student || !supabaseUserData) return <h1>Loading...</h1>

  return (
    <div className='infoCard'>
      <h1>RESCHEDULE LESSON PAGE</h1>
      {step === 1 ? <ChooseCancellation setStep={setStep} setCancellation={setCancellation} student={student} user ={supabaseUserData} /> : null}
      {step === 2 ? <ChooseMakeup setStep={setStep} setMakeup={setMakeup} /> : null}
      {step === 3 ? <ConfirmReschedule setStep={setStep} cancellation={cancellation} makeup={makeup} user={supabaseUserData} student={student}/> : null}
      {step === 4 ? <SchedulingConfirm setStep={setStep} cancellation={cancellation} makeup={makeup} type='reschedule' /> : null}
    </div>
  )
}

