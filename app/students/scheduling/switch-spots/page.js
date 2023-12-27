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
  const [makeupWarnings, setMakeupWarnings] = useState([]);
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
  Modal.setAppElement('#app');


  const handleNewSpot = async (spot) => {
    // If the spot is currently booked
    if (spot.student) {
      alert('This spot is already booked. Please choose another.');
      return;
    }
    // Check for future makeups and students
    try {
      const response = await fetch(`/api/checkFutureSpotAvailability?date=${spot.dbDate}&day=${spot.day}&time=${spot.time}&student=${student.id}`);
      const makeupsAndBookings = await response.json();
      const makeups = makeupsAndBookings.makeups;
      console.log('makeups: ', makeups);
      // If there are makeups
      if (makeups.length > 0) {
        const makeupsList = makeups.map(makeup => {
          return (
            <div key={makeup.id} className={styles.makeup}>
              <p className={styles.makeupText}>{`${dateFormatter(makeup.date)}`}</p>
            </div>
          );
        });

        // If there are future students, set the modal content as a warning
        setMakeupWarnings(
          <>
            <h2 className={styles.makeupHeader}>{`This spot is available for recurring lessons, but the following
            ${makeups.length > 1 ? 'dates have' : 'date has'} already been booked:`}</h2>
            <div className={styles.makeupList}>
              {makeupsList}
            </div>
            <h2>{`If you continue, ${makeups.length} cancellation${makeups.length > 1 ? 's' : ''} and makeup
            credit${makeups.length > 1 ? 's' : ''} will be added to your account for these days.`}</h2>
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
  // choose open spot
  // if open spot contains makeups, inform users that cancellations will be added w/makeup credits: confirm or go back
  // choose start date for new spot from list of upcoming spot's dates;
  // confirm or go back
  // confirmation page

  // add spot

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
            {makeupWarnings}
          </Modal>
          <h1>{`Choose the new spot you'd like to move to on the week you'd like to switch below:`}</h1>
          <Schedule setStep={setStep} handler={handleNewSpot} privacy={true} />
        </>
        : null
      }
      {step === 2 ? <ConfirmNewSpot newSpot={newSpot} const oldSpot={student.spot} setStep={setStep} />: null}
    </div>

  )
}
