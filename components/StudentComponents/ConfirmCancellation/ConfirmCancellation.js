import { useState } from 'react';
import styles from './ConfirmCancellation.module.css';
import { supabase } from '../../../utils/supabase';
import adjustMakeupCredit from '../../../utils/adjustMakeupCredit.js';

export default function CancellationConfirmation({ cancellation, setCancellation, setStep, user, student }) {
  const [note, setNote] = useState('');
  const [cancelType, setCancelType] = useState(cancellation.type);

  const cancelHandler = async () => {
    // Update the note in cancellation
    setCancellation(prevCancellation => ({ ...prevCancellation, note }));

    try {
      if (cancellation.type === 'regular' || cancellation.type === 'new spot' || cancellation.type === 'makeup') {
        // Insert into cancellations table
        const { data, error } = await supabase
          .from('cancellations')
          .insert([
            { date: cancellation.dbDate, time: cancellation.time, created_by: user.id, note: note, student: student.id }
          ]);

        if (error) throw error;
        console.log('Insertion successful:', data);
        adjustMakeupCredit(student, 'increment');
        setStep(3);
      } else if (cancellation.type === 'cancellation') {
        // Remove from cancellations table
        const { data, error } = await supabase
          .from('cancellations')
          .delete()
          .match({ id: cancellation.id });

        if (error) throw error;
        console.log('Deletion of cancellation successful:', data);
        adjustMakeupCredit(student, 'decrement');
        setStep(3);
      }
      // else if (cancellation.type === 'makeup') {
      //   // Remove from makeups table
      //   const { data, error } = await supabase
      //     .from('makeups')
      //     .delete()
      //     .match({ id: cancellation.id });

      //   if (error) throw error;
      //   console.log('Deletion successful:', data);
      //   setStep(3);
      // }
    } catch (error) {
      console.error('Error in cancellation process:', error);
    }
  };

  const cancelMessage = (
    <>
      <p>Are you sure you want to cancel this lesson?</p>
      <p>This will cancel your lesson and apply one make-up credit to your account. </p>
    </>
  )
  const uncancelMessage = (
    <>
      <p>This is a cancelled lesson. Would you like to un-cancel and attend?</p>
      <p>Cancelled lessons can only be un-cancelled at least 24 hours prior to the lesson.</p>
    </>
  )
  return (
    <div className={styles.confirmContainer}>
      <h1 className='featureHeaders'>Confirm</h1>
      <div className={styles.confirmMessageContainer}>
        <p className={styles.cancelDate}>{`${cancellation.dateString} @ ${cancellation.time}`}</p>
        {cancelType === 'regular' || cancelType === 'new spot' || cancelType === 'makeup' ? cancelMessage : uncancelMessage}
      </div>
      <input
        type='text'
        placeholder='Add a note (optional)'
        onChange={(e) => setNote(e.target.value)}

      ></input>
      <button
        onClick={() => cancelHandler()}
      >Cancel Lesson</button>
    </div>
  )
}