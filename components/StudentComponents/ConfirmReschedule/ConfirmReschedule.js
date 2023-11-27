import { useState } from 'react';
import styles from './ConfirmReschedule.module.css';
import { supabase } from '../../../utils/supabase';

export default function ConfirmReschedule({ cancellation, makeup, setStep, user, student }) {
  const [note, setNote] = useState('');

  const rescheduleHandler = async () => {
    try {
      // Step 1: Initial Insertions
      // Insert into cancellations table
      const initialCancellationData = {
        date: cancellation.dbDate,
        time: cancellation.time,
        created_by: user.id,
        note: note,
        student: student.id,
        day: cancellation.day
      };
      const { data: cancellationResponse, error: cancellationError } = await supabase
        .from('cancellations')
        .insert([initialCancellationData])
        .select();

      if (cancellationError) throw cancellationError;
      console.log('Insertion into cancellations successful:', cancellationResponse);

      // Insert into makeups table
      const initialMakeupData = {
        date: makeup.dbDate,
        time: makeup.time,
        day: makeup.day,
        created_by: user.id,
        note: note,
        student: student.id
      };
      const { data: makeupResponse, error: makeupError } = await supabase
        .from('makeups')
        .insert([initialMakeupData])
        .select();

      if (makeupError) throw makeupError;
      console.log('Insertion into makeups successful:', makeupResponse);

      // Step 2: Update with Associated IDs
      // Assuming the IDs are returned in the response
      const cancellationId = cancellationResponse[0].id;
      const makeupId = makeupResponse[0].id;

      // Update the cancellation with the associated makeup ID
      const { error: updateCancellationError } = await supabase
        .from('cancellations')
        .update({ associated_makeup: makeupId })
        .match({ id: cancellationId });

      if (updateCancellationError) throw updateCancellationError;

      // Update the makeup with the associated cancellation ID
      const { error: updateMakeupError } = await supabase
        .from('makeups')
        .update({ associated_cancellation: cancellationId })
        .match({ id: makeupId });

      if (updateMakeupError) throw updateMakeupError;

      setStep(4);
    } catch (error) {
      console.error('Error in rescheduling process:', error);
      // Update state or UI to reflect the error
    }
  };



  return (
    <div className={styles.confirmContainer}>
      <h1 className='featureHeaders'>Confirm</h1>
      <div className={styles.confirmMessageContainer}>
        <p>{`You're rescheduling your lesson on`}</p>
        <p className={styles.date}>{`${cancellation.date} @ ${cancellation.time}`}</p>
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