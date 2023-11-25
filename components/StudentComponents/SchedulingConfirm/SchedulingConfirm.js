import styles from './SchedulingConfirm.module.css';
import Link from 'next/link';

export default function Confirmation({ type, cancellation, makeup }) {

  if (type === 'cancellation') {
    let confirmMessage;

    if (cancellation.type === 'regular' || cancellation.type === 'new spot' || cancellation.type === 'makeup') {
      confirmMessage = (
        <div>
          <h1>Lesson Cancelled</h1>
          <p>{`Your lesson on ${cancellation.dateString} at ${cancellation.time} has been cancelled and one makeup credit has been added to your account.`}</p>
        </div>
      )
    } else if (cancellation.type === 'cancellation') {

      confirmMessage = (
        <div>
          <h1>Cancellation Reversed</h1>
          <p>{`Your cancelled lesson on ${cancellation.dateString} at ${cancellation.time} has been reversed. `}</p>
        </div>
      )
    }

    return (
      <div>
        {confirmMessage}
        <Link href='/students/home'>
          <p>Home</p>
        </Link>
      </div>
    )
  }

  if (type === 'makeup') {
    return (
      <div className={styles.confirmContainer}>
        <h1>Makeup Confirmed</h1>
        <p>{`Your makeup lesson has been scheduled for:`}</p>
        <p className={styles.date}>{`${makeup.day}, ${makeup.date} @ ${makeup.time}`}</p>
        <p>and one makeup credit has been deducted from your account.</p>
        <Link href='/students/home'>
          <button className='featureButton'>Return Home</button>
        </Link>
      </div>
    )
  }

  if (type === 'reschedule') {
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
  }
};