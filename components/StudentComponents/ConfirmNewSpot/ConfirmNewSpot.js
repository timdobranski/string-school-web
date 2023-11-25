import styles from './ConfirmNewSpot.module.css';

export default function ConfirmNewSpot({ newSpot, setStep }) {

  const handleConfirm = () => {
    // setStep(3);
  }

  return(
    <div className={styles.container}>
      <h1>Confirm New Spot</h1>
      <p>Date: {newSpot.date}</p>
      <p>Time: {newSpot.time}</p>
      <p>Day: {newSpot.day}</p>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  )


}