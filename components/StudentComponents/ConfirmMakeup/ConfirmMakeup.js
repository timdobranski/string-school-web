'use client'

import styles from './ConfirmMakeup.module.css';
import { useState } from 'react';
import adjustMakeupCredits from '../../../utils/adjustMakeupCredit.js';
import { supabase } from '../../../utils/supabase';

export default function ConfirmMakeup({ makeup, setStep, user, student }) {
  const [note, setNote] = useState('');

  const makeupHandler = async () => {
    try {

      // Insert into makeups table

      const { data: makeupResponse, error: makeupError } = await supabase
        .from('makeups')
        .insert({
          date: makeup.dbDate,
          time: makeup.time,
          created_by: user.id,
          note: note,
          student: student.id
        });

      if (makeupError) throw makeupError;
      console.log('Insertion into makeups successful:', makeupResponse);

      setStep(3);
    } catch (error) {
      console.error('Error in adding makeup:', error);
      // Update state or UI to reflect the error
    }
  };


  return (
    <div className={styles.confirmContainer}>
      <h1>Confirm Makeup</h1>
      <p>{`You'll be scheduling an extra make-up lesson for:`}</p>
      <p>{`${makeup.day}, ${makeup.date} @ ${makeup.time}`}</p>
      <p>and one makeup credit will be deducted from your account.</p>
      <p>Would you like to proceed?</p>


      <input
        type='text'
        placeholder='Add a note (optional)'
        onChange={(e) => setNote(e.target.value)}

      ></input>
      <button
        onClick={() => makeupHandler()}
      >Reschedule Lesson</button>
    </div>
  )
}

