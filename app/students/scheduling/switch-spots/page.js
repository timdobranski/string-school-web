'use client'

import { useState, useEffect } from 'react';
import styles from './switch-spots.module.css';
import Schedule from '../../../../components/Schedule/Schedule';
import ConfirmNewSpot from '../../../../components/StudentComponents/ConfirmNewSpot/ConfirmNewSpot';
import SchedulingConfirm from '../../../../components/StudentComponents/SchedulingConfirm/SchedulingConfirm';
import StudentContext, { useAuth } from '../../layout.js';


export default function SwitchSpots() {
  const [step, setStep] = useState(1);
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();
  const [newSpot, setNewSpot] = useState({date: '', time: '', dbDate: '', day: '', student: '', createdBy: ''});


  const handleNewSpot = (spot) => {
    if (spot.student) {
      alert('This spot is already booked. Please choose another.')
      return;
    }
    setNewSpot(prevState => ({
      ...prevState,
      date: spot.date,
      time: spot.time,
      dbDate: spot.dbDate,
      day: spot.day
    }));
    setStep(previous =>  previous + 1);

  }


  return (
    <div className='infoCard'>
      {step === 1 ? <Schedule setStep={setStep} handler={handleNewSpot} /> : null}
      {step === 2 ? <ConfirmNewSpot newSpot={newSpot} setStep={setStep} />: null}
    </div>

  )
}
