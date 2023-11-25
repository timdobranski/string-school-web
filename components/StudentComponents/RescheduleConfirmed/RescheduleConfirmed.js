import styles from './RescheduleConfirmed.module.css';
import Link from 'next/link';

export default function RescheduleConfirmed({ cancellation, makeup }) {
  console.log('cancellation: ', cancellation);
  return (
    <div className={styles.confirmContainer}>
      <p>{`Confirmed! You've rescheduled from:`}</p>
      <p className={styles.date}>{`${cancellation.dateString} @ ${cancellation.time}`}</p>
      <p>to:</p>
      <p className={styles.date}>{`${makeup.day}, ${makeup.date} @ ${makeup.time}.`}</p>
      <Link href='/students/home'>
        <button className='featureButton'>Return Home</button>
      </Link>
    </div>
  )
};