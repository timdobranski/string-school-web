import styles from './ConfirmNewSpot.module.css';
import dateFormatter from '../../../utils/dateFormatter';

export default function ConfirmNewSpot({ newSpot, oldSpot, makeups, futureStudentStartDate, setStep }) {

  console.log('newSpot: ', newSpot);
  console.log('oldSpot: ', oldSpot);
  console.log('makeups: ', makeups);
  console.log('futureStudent: ', futureStudentStartDate);

  const handleConfirm = async () => {
    console.log('confirming new spot');
    // fetch to api to update schedule data and student data
    await fetch('/api/updateStudentSpot?newSpot=' + JSON.stringify(newSpot) + '&oldSpot=' + oldSpot + '&makeups=' + JSON.stringify(makeups))
    // if successful, setStep(3);


  }

  return(
    <div className={styles.container}>
      <h1 className='featureHeaders'>Confirm New Spot</h1>
      <p className='text'>{`${newSpot.day}s @ ${newSpot.time}`}</p>

      <p className='text'>Starting on {dateFormatter(newSpot.dbDate)}</p>
      <button onClick={handleConfirm} className='button'>Confirm</button>
    </div>
  )


}