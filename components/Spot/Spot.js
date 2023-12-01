import styles from './Spot.module.css';


export default function Spot({handler, activeSpotId, spot, spotClass, isPast, studentData, privacy }) {


  return (
    <td className={`${styles.statusColumn} ${styles[spotClass]} ${isPast ? styles.disabledSpot : ''}`}
      onClick={!isPast ? () => handler({
        day: spot.day,
        time: spot.time,
        date: spot.date,
        dbDate: spot.dbDate,
        student: spot.student
      }) : () => {
        alert('This lesson has already passed. Please choose another lesson in the future.');
      }}
    >
      {isPast && spot.cellText === 'Open!' ? 'Lesson Passed' : spot.cellText}
      {privacy === false && !isPast && spot.cellText !== 'Open!' ?
        <div className={`${styles.studentDataWrapper} ${activeSpotId === spot.student ? styles.active : ''}`}>
          {studentData}
        </div> : null
      }
    </td>
  )
}