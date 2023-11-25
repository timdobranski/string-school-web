'use client';

import styles from './schedule-makeup.module.css';
import { useState, useEffect } from 'react';
import StudentContext, { useAuth } from '../../layout.js';
import ChooseMakeup from '../../../../components/StudentComponents/ChooseMakeup/ChooseMakeup';
import ConfirmMakeup from '../../../../components/StudentComponents/ConfirmMakeup/ConfirmMakeup';
import SchedulingConfirm from '../../../../components/StudentComponents/SchedulingConfirm/SchedulingConfirm';

export default function ScheduleMakeup() {
// Choose makeup, confirm, [add makeup, decrement makeups remaining], confirmed
  const [step, setStep] = useState(1);
  const [makeup, setMakeup] = useState({date: '', time: '', dbDate: '', day: '', student: '', createdBy: ''});
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();

  useEffect(() => {
    console.log('makeup: ', makeup);

  }, [makeup])

  return (

    <div className='infoCard'>

      {step === 1 ? <ChooseMakeup setStep={setStep} setMakeup={setMakeup} /> : null}
      {step === 2 ? <ConfirmMakeup setStep={setStep} user={supabaseUserData} student={student} makeup={makeup}  /> : null}
      {step === 3 ? <SchedulingConfirm makeup={makeup} type='makeup'/> : null}

    </div>

  )
}