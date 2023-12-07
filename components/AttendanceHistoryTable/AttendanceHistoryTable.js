import styles from './AttendanceHistoryTable.module.css';
import dateFormatter from '../../utils/dateFormatter';

export default function AttendanceHistoryTable({ cancellations, makeups }) {
  console.log('cancellations: ', cancellations)

  return (
    <div className={styles.tableContainer}>

      {/* Cancellations Column */}
      <div className={styles.cancellationsColumn}>
        <h2 className='featureHeaders'>Cancellations</h2>
        <ul>
          {cancellations.map((cancellation, index) => (
            <li key={index} className={styles.listItem}>
              <p className={styles.attendanceHeader}>{`${dateFormatter(cancellation.date, {includeYear: false})} @ ${cancellation.time}`}</p>
              <p>{`Cancelled by ${cancellation.users.first_name} on ${dateFormatter(cancellation.created_at, {includeYear: false})}`}</p>
              {cancellation.note && <p>{`Note: ${cancellation.note}`}</p>}
              {cancellation.associated_makeup && <p>Associated Makeup: {cancellation.associated_makeup}</p>}
            </li>
          ))}
        </ul>
      </div>

      {/* Makeups Column */}
      <div className={styles.makeupsColumn}>
        <h2 className='featureHeaders'>Makeups</h2>
        <ul>
          {makeups.map((makeup, index) => (
            <li key={index} className={styles.listItem}>
              <p className={styles.attendanceHeader}>{`${dateFormatter(makeup.date, { includeYear: false })} @ ${makeup.time}`}</p>
              <p>{`Scheduled by ${makeup.users.first_name} on  ${dateFormatter(makeup.created_at, { includeYear: false })}`}</p>
              {makeup.note && <p>Note: {makeup.note}</p>}
              {makeup.associated_cancellation && <p>Associated Cancellation: {makeup.associated_cancellation}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}