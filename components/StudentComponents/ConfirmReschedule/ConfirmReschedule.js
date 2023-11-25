import { useState } from 'react';
import styles from './ConfirmReschedule.module.css';
import { supabase } from '../../../utils/supabase';

export default function ConfirmReschedule({ cancellation, makeup, setStep, user, student }) {
  const [note, setNote] = useState('');

  const generateInsertData = (date, time) => {
    return { date, time, created_by: user.id, note, student: student.id };
  };

  const rescheduleHandler = async () => {
    try {
      // Insert into cancellations table
      const cancellationData = generateInsertData(cancellation.dbDate, cancellation.time);
      const { data: cancellationResponse, error: cancellationError } = await supabase
        .from('cancellations')
        .insert([cancellationData]);

      if (cancellationError) throw cancellationError;
      console.log('Insertion into cancellations successful:', cancellationResponse);

      // Insert into makeups table
      const makeupData = generateInsertData(makeup.dbDate, makeup.time);
      const { data: makeupResponse, error: makeupError } = await supabase
        .from('makeups')
        .insert([makeupData]);

      if (makeupError) throw makeupError;
      console.log('Insertion into makeups successful:', makeupResponse);

      setStep(4);
    } catch (error) {
      console.error('Error in cancellation process:', error);
      // Update state or UI to reflect the error
    }
  };


  return (
    <div className={styles.confirmContainer}>
      <h1 className='featureHeaders'>Confirm</h1>
      <div className={styles.confirmMessageContainer}>
        <p>{`You're rescheduling your lesson on`}</p>
        <p className={styles.date}>{`${cancellation.dateString} @ ${cancellation.time}`}</p>
        <p>to</p>
        <p className={styles.date}>{`${makeup.day}, ${makeup.date} @ ${makeup.time}.`}</p>
        <p>Do you want to proceed?</p>

      </div>
      <input
        type='text'
        placeholder='Add a note (optional)'
        onChange={(e) => setNote(e.target.value)}

      ></input>
      <button
        onClick={() => rescheduleHandler()}
      >Reschedule Lesson</button>
    </div>
  )
}