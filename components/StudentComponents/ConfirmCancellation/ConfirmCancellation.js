import { useState, useEffect } from 'react';
import styles from './ConfirmCancellation.module.css';
import { supabase } from '../../../utils/supabase';
import adjustMakeupCredit from '../../../utils/adjustMakeupCredit.js';
import dateFormatter from '../../../utils/dateFormatter.js';

export default function CancellationConfirmation({ cancellation, setCancellation, setStep, user, student }) {
  const [note, setNote] = useState('');
  const [cancelType, setCancelType] = useState(cancellation.type);
  const [associatedMakeup, setAssociatedMakeup] = useState(null);
  const [associatedCancellation, setAssociatedCancellation] = useState(null);
  const [removeAssociatedMakeup, setRemoveAssociatedMakeup] = useState(null);
  const [removeAssociatedCancellation, setRemoveAssociatedCancellation] = useState(null);
  const isCancelDisabled = removeAssociatedMakeup === null && associatedMakeup;

  // Check if chosen cancellation is a cancellation with a corresponding makeup
  useEffect(() => {
    console.log('cancellation: ', cancellation)
    async function checkForAssociatedMakeup() {
      const { data: makeup, error: makeupError } = await supabase
        .from('makeups')
        .select('*')
        .match({ id: cancellation.associated_makeup});

      if (makeupError) throw makeupError;
      if (makeup.length === 1) {
        return makeup;
      }
    }
    async function checkForAssociatedCancellation() {
      const { data: associatedCancellation, error: cancellationError } = await supabase
        .from('cancellations')
        .select('*')
        .match({ id: cancellation.associated_cancellation});

      if (cancellationError) throw cancellationError;
      if (cancellation.length === 1) {
        return cancellation;
      }
    }
    if (cancellation.type === 'cancellation') {
      checkForAssociatedMakeup().then(makeup => setAssociatedMakeup(makeup[0]));
    }
    if (cancellation.type === 'makeup') {
      checkForAssociatedCancellation().then(cancellation => setAssociatedCancellation(cancellation[0]));
    }

  }, [])
  // handler for user choosing to remove associated makeup or not
  const handleMakeupChoice = (choice) => {
    setRemoveAssociatedMakeup(choice);
  };


  const cancelHandler = async () => {
    // Update the note in cancellation
    setCancellation(prevCancellation => ({ ...prevCancellation, note }));

    try {
      if (cancellation.type === 'regular' || cancellation.type === 'new spot') {
        // Insert into cancellations table
        const { data, error } = await supabase
          .from('cancellations')
          .insert([
            { date: cancellation.dbDate, time: cancellation.time, created_by: user.id, note: note, student: student.id, day: cancellation.day }
          ]);

        if (error) throw error;
        console.log('Insertion successful:', data);
        adjustMakeupCredit(student, 'increment');
        setStep(3);







      } else if (cancellation.type === 'cancellation') {

        // Remove from cancellations table
        if (removeAssociatedMakeup === true) {
          const { data: cancellationData, error: cancellationError } = await supabase
            .from('cancellations')
            .delete()
            .match({ id: cancellation.id });

          if (cancellationError) throw cancellationError;
          console.log('Deletion of cancellation successful:', cancellationData);

          const { data: makeupData, error: makeupError } = await supabase
            .from('makeups')
            .delete()
            .match({ id: cancellation.associated_makeup });

          if (makeupError) throw makeupError;
          console.log('Deletion of makeup successful:', makeupData);

        } else {
          const { data, error } = await supabase
            .from('cancellations')
            .delete()
            .match({ id: cancellation.id });

          if (error) throw error;
          console.log('Deletion of cancellation successful:', data);
          adjustMakeupCredit(student.id, 'decrement');
        }
        setStep(3);






      } else if (cancellation.type === 'makeup') {
        // Remove from makeups table
        const { data, error } = await supabase
          .from('makeups')
          .delete()
          .match({ id: cancellation.id });

        if (error) throw error;
        console.log('Deletion successful:', data);
        adjustMakeupCredit(student, 'increment');
        setStep(3);
      }
    } catch (error) {
      console.error('Error in cancellation process:', error);
    }
  };

  const cancelMessage = (
    <>
      <p>Are you sure you want to cancel this lesson?</p>
      <p>This will cancel your lesson and apply one make-up credit to your account. </p>
      <input
        type='text'
        placeholder='Add a note (optional)'
        onChange={(e) => setNote(e.target.value)}

      ></input>
    </>
  )
  const uncancelMessage = associatedMakeup ? (
    <>
      <p>{`This is a cancelled lesson. It has an associated makeup lesson that was created at the same time for:`}</p>
      <p> {`${dateFormatter(associatedMakeup.date, {format: 'short', includeDay: true, includeYear: false})}, @ ${associatedMakeup.time}`}</p>
      <p>{`To uncancel the lesson, first choose if you'd also like to remove the associated makeup. If you choose to uncancel this
        cancellation but keep the makeup, one makeup credit will be deducted from your account if you have one. Otherwise,
        an additional lesson will be booked and the next invoice will be adjusted at the price of $27.50 unless this or another
        makeup is cancelled.`}</p>
      <p>*Cancelled lessons can only be un-cancelled at least 24 hours prior to the lesson*</p>
      <div className={styles.handleMakeupChoiceWrapper}>
        <button className={styles.optionButton} onClick={() => handleMakeupChoice(true)}>Remove associated makeup</button>
        <button className={styles.optionButton} onClick={() => handleMakeupChoice(false)}>Keep associated makeup</button>
      </div>
    </>
  ) : (
    <>
      <p>This is a cancelled lesson. Would you like to un-cancel and attend?</p>
      <p>Cancelled lessons can only be un-cancelled at least 24 hours prior to the lesson.</p>
    </>
  )


  const cancelMakeupMessage = (
    <>
      <p>{`This is a makeup lesson. It has an associated cancelled lesson that was created at the same time for:`}</p>
      {/* <p> {`${dateFormatter(associatedCancellation.date, {format: 'short', includeDay: true, includeYear: false})}, @ ${associatedCancellation.time}`}</p> */}
      <p>{`To cancel the makeup, first choose if you'd also like to un-cancel the associated cancelled lesson. If you choose not to remove the associated
      cancellation, one makeup credit will be added to your account`}</p>
      <p>*Cancelled lessons can only be un-cancelled at least 24 hours prior to the lesson*</p>
      <div className={styles.handleMakeupChoiceWrapper}>
        <button className={styles.optionButton} onClick={() => handleMakeupChoice(true)}>Un-cancel associated cancellation</button>
        <button className={styles.optionButton} onClick={() => handleMakeupChoice(false)}>Keep associated lesson cancelled</button>
      </div>
    </>
  )

  return (
    <div className={styles.confirmContainer}>
      <h1 className='featureHeaders'>Confirm</h1>
      <div className={styles.confirmMessageContainer}>
        <p className={styles.cancelDate}>{`${cancellation.date} @ ${cancellation.time}`}</p>
        {cancelType === 'makeup' ? cancelMakeupMessage : (cancelType !== 'cancellation' ? cancelMessage : uncancelMessage)}
      </div>

      <button
        onClick={cancelHandler}
        disabled={isCancelDisabled}
      >Cancel Lesson</button>
    </div>
  )
}