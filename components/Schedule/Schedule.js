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
        <div key={day} id={day} className={styles.dayContainer}>
          <h3>{day}</h3>
          <div className={styles.columns}>
            <div className={styles.timesColumn}>
              {times.map((time) => (
                <div key={`${day}-${time}`} className={styles.time}>
                  {time}
                </div>
              ))}
            </div>
            <div className={styles.statusColumn}>
              {times.map((time) => (
                <div
                  key={`${day}-${time}-status`}
                  id={`${day}-${time}-status`}
                  className={styles.open}
                >
                  Open!
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

