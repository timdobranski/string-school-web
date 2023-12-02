import styles from './Week.module.css';
import Spot from '../Spot/Spot';

export default function Week({ weekSchedule, formattedDates, index, activeSpotId, studentData, handler, privacy, setActiveSpotId }) {

  // data structure for schedule spots to render table
  const schedule = {
    Monday: ['4:30pm', '5:00pm', '5:30pm', '6:00pm', '6:30pm', '7:00pm', '7:30pm', '8:00pm'],
    Tuesday: ['4:30pm', '5:00pm', '5:30pm', '6:00pm', '7:00pm', '7:30pm', '8:00pm'],
    Wednesday: ['4:30pm', '5:00pm', '5:30pm', '6:00pm', '7:00pm', '7:30pm', '8:00pm'],
    Thursday: ['4:30pm', '5:00pm', '5:30pm', '6:30pm', '7:00pm', '7:30pm', '8:00pm'],
    Friday: ['4:30pm', '5:00pm', '5:30pm'],
    Sunday: ['10:00am', '10:30am', '11:00am', '11:30am']
  }

  console.log('weekSchedule data: ', weekSchedule);


  return (
    // table render
    <div className={styles.scheduleContainer} key={index}>
      {Object.entries(schedule).map(([day, times], dayIndex) => {
        const dayDate = formattedDates[index][dayIndex];

        return (
          <div key={day} className={`${styles.dayContainer} ${styles[day.toLowerCase()]}`}>
            <div className={styles[`${day.toLowerCase()}Regular`]}>
              <h3>{day}</h3>
              <p>{dayDate}</p>
            </div>
            <table className={styles.scheduleTable}>
              <tbody>
                {times.map((time) => {
                  const spot = weekSchedule.find(entry => entry.day === day && entry.time === time);
                  // console.log('spot data: ', spot)
                  // if spot.type === break, AND privacy === true, don't render
                  if (spot && spot.day === 'Monday' && spot.time === "6:30pm") {
                    console.log('spot: ', spot)
                    console.log('privacy: ', privacy)

                  }
                  if (spot && spot.type === 'break' && privacy) { return null };

                  // spot render
                  return (
                    <tr key={`${day}-${time}`}>
                      <td className={styles.timeColumn}>{time.slice(0, -2)}</td>
                      <Spot
                        handler={handler}
                        spot={spot}
                        studentData={studentData}
                        activeSpotId={activeSpotId}
                        setActiveSpotId={setActiveSpotId}
                        privacy={privacy}
                      />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}