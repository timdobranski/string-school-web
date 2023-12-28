'use client'

import { useState, useEffect } from 'react';
import styles from './switch-spots.module.css';
import Schedule from '../../../../components/Schedule/Schedule';
import ConfirmNewSpot from '../../../../components/StudentComponents/ConfirmNewSpot/ConfirmNewSpot';
import SchedulingConfirm from '../../../../components/StudentComponents/SchedulingConfirm/SchedulingConfirm';
import StudentContext, { useAuth } from '../../layout.js';
import dateFormatter from '../../../../utils/dateFormatter';
import Modal from 'react-modal';


export default function SwitchSpots() {
  const [step, setStep] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [makeups, setMakeups] = useState([]);
  const [futureStudentStartDate, setFutureStudentStartDate] = useState('');
  const [modalWarning, setModalWarning] = useState([]);
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();
  const [newSpot, setNewSpot] = useState({ date: '', time: '', dbDate: '', day: '', student: '', createdBy: '' });
  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.6)'
    },
    content: {
      top: '50%',
      textAlign: 'center',
      width: '60vw',
      margin: '0 auto',
      height: '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to bottom right, rgb(115, 239, 255), rgb(146, 255, 146))',
      borderRadius: '10px',
      padding: '1rem',
      zIndex: 1,
      outline: 'none',
      transform: 'translateY(-50%)',
    }
  }
  // Modal.setAppElement('#app');

  // handler for when a user chooses a new spot on the schedule
  const handleNewSpot = async (spot) => {
    // If the spot is currently booked, an alert should pop up by default via the spot component

    // Check for future makeups and students in the chosen spot
    try {
      const response = await fetch(`/api/checkFutureSpotAvailability?date=${spot.dbDate}&spot=${spot.id}&time=${spot.time}`);
      const { makeups, bookings } = await response.json();
      // Create a separate array of makeups that don't belong to the current student
      const nonStudentMakeups = makeups.filter(makeup => makeup.student !== student.id);
      const studentMakeups = makeups.filter(makeup => makeup.student === student.id);

      // if the spot is booked starting in a future week, set the modal content as a warning
      if (bookings & bookings.length > 0) {
        const startDate = dateFormatter(bookings[0].new_student_start_date);
        setModalWarning(
          <>
            <h2 className={styles.makeupHeader}>{`This spot is open for this week, but is booked by another student starting ${startDate}.`}</h2>

            <h2>{`You can schedule this spot as a makeup for this week only, but cannot schedule it for recurring future lessons. `}</h2>
            <div className={styles.makeupButtonsContainer}>
              <button className={styles.makeupButton} onClick={() => setModalIsOpen(false)}>Back</button>

            </div>
          </>
        )
        setModalIsOpen(true);
      }
      // if there are future makeups in the spot, set the modal content as a warning
      else if (makeups.length > 0) {
        setMakeups(makeups);

        const nonStudentMakeupsList = nonStudentMakeups.map(makeup => {
          return (
            <div key={makeup.id} className={styles.makeup}>
              <p className={styles.makeupText}>{`${dateFormatter(makeup.date)}`}</p>
            </div>
          );
        });
        const studentMakeupsList = studentMakeups.map(makeup => {
          return (
            <div key={makeup.id} className={styles.makeup}>
              <p className={styles.makeupText}>{`${dateFormatter(makeup.date)}`}</p>
            </div>
          );
        });
        const hasStudentMakeups = studentMakeupsList.length > 0;
        const hasNonStudentMakeups = nonStudentMakeupsList.length > 0;

        let message = null;

        if (hasStudentMakeups && hasNonStudentMakeups) {
          // Case when both lists contain makeups
          message = (
            <>
              <p>You have already booked makeups on the following days:</p>
              <div className={styles.makeupList}>{studentMakeupsList}</div>
              <p>Switching to this spot will cancel these makeups and return the makeup credits to your account.</p>
              <p>Additionally, the following makeups have been booked by other students:</p>
              <div className={styles.makeupList}>{nonStudentMakeupsList}</div>
              <p>{`If you continue, these dates will be cancelled and ${nonStudentMakeupsList.length} makeup credits will be adjusted accordingly.`}</p>
            </>
          );
        } else if (hasStudentMakeups) {
          const plural = studentMakeupsList.length > 1;
          // Case when only studentMakeupsList contains makeups
          message = (
            <>
              <h2 className={styles.makeupHeader}>Notice for Recurring Lessons:</h2>
              <p>You have already booked {plural ? 'makeups' : 'a makeup'} for this spot on the following {plural ? 'days' : 'day'}:</p>
              <div className={styles.makeupList}>{studentMakeupsList}</div>
              <p>Switching to this spot will cancel {plural ? 'these makeups' : 'this makeup'} and return the makeup {plural ? 'credits' : 'credit'} to your account.</p>
            </>
          );
        } else if (hasNonStudentMakeups) {
          // Case when only nonStudentMakeupsList contains makeups
          message = (
            <>
              <h2 className={styles.makeupHeader}>This spot is available for recurring lessons, but the following
                {nonStudentMakeups.length > 1 ? ' dates have' : ' date has'} already been booked by other students:</h2>
              <div className={styles.makeupList}>{nonStudentMakeupsList}</div>
              <h2>If you continue, {nonStudentMakeups.length} cancellation{makeups.length > 1 ? 's' : ''} and makeup
            credit{makeups.length > 1 ? 's' : ''} will be added to your account for {makeups.length > 1 ? 'these days' : 'this day'}.</h2>
            </>
          );
        }
        setModalWarning(
          <>
            {message}
            <div className={styles.makeupButtonsContainer}>
              <button className={styles.makeupButton} onClick={() => setModalIsOpen(false)}>Go Back</button>
              <button className={styles.makeupButton} onClick={() => {
                setNewSpot(prevState => ({
                  ...prevState,
                  date: spot.date,
                  time: spot.time,
                  dbDate: spot.dbDate,
                  day: spot.day,
                  student: student.id,
                  id: spot.id,
                  createdBy: supabaseUserData.id
                }));
                setStep(previous => previous + 1)
              }}>Continue</button>
            </div>
          </>
        );
        setModalIsOpen(true)

      } else {
        // no makeups, so just set the new spot and move to next step
        setNewSpot(prevState => ({
          ...prevState,
          date: spot.date,
          time: spot.time,
          dbDate: spot.dbDate,
          day: spot.day,
          student: student.id,
          id: spot.id,
          createdBy: supabaseUserData.id
        }));
        setStep(previous => previous + 1);
      }
    } catch (error) {
      console.error('Error checking future spot availability:', error);
    }
  }

  return (
    <div className='infoCard'>
      {step === 1 ?
        <>
          <Modal
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            onRequestClose={() => setModalIsOpen(false)}
            shouldCloseOnOverlayClick={true}
            style={modalStyles}
          >
            {modalWarning}
          </Modal>
          <h1>{`Choose the new spot you'd like to move to on the week you'd like to switch below:`}</h1>
          <Schedule setStep={setStep} handler={handleNewSpot} privacy={true} />
        </>
        : null
      }
      {step === 2 ? <ConfirmNewSpot newSpot={newSpot} oldSpot={student.spot} makeups={makeups} futureStudentStartDate={futureStudentStartDate} setStep={setStep} />: null}
    </div>

  )
}
