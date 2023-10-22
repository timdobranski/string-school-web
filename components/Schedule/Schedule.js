import styles from './Schedule.module.css';

export default function Schedule({ startDate }) {
  const schedule = {
    Mon: ['4:30', '5:00', '5:30', '6:00', '7:00', '7:30', '8:00'],
    Tues: ['4:30', '5:00', '5:30', '6:00', '7:00', '7:30', '8:00'],
    Wed: ['4:30', '5:00', '5:30', '6:00', '7:00', '7:30', '8:00'],
    Thurs: ['4:30', '5:00', '5:30', '6:30', '7:00', '7:30', '8:00'],
    Fri: ['4:30', '5:00', '5:30'],
    Sun: ['10:00', '10:30', '11:00', '11:30'],
  }

  return (
    <div className={styles.scheduleContainer}>
      {Object.entries(schedule).map(([day, times]) => (
        <div key={day} className={`${styles.dayContainer} ${styles[day.toLowerCase()]}`}>
          <h3>{day}</h3>
          <table className={styles.scheduleTable}>
            {/* <thead>
              <tr>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead> */}
            <tbody>
              {times.map((time) => (
                <tr key={`${day}-${time}`}>
                  <td className={styles.timeColumn}>{time}</td>
                  <td id={`${day}-${time}-status`} className={styles.statusColumn}>
                    Open!
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

