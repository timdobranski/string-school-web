import styles from './Week.module.css';

export default function Week({ weekSchedule, formattedDates, index, activeSpotId, studentData }) {

  // data structure for schedule spots to render table
  const schedule = {
    Monday: ['4:30pm', '5:00pm', '5:30pm', '6:00pm', '7:00pm', '7:30pm', '8:00pm'],
    Tuesday: ['4:30pm', '5:00pm', '5:30pm', '6:00pm', '7:00pm', '7:30pm', '8:00pm'],
    Wednesday: ['4:30pm', '5:00pm', '5:30pm', '6:00pm', '7:00pm', '7:30pm', '8:00pm'],
    Thursday: ['4:30pm', '5:00pm', '5:30pm', '6:30pm', '7:00pm', '7:30pm', '8:00pm'],
    Friday: ['4:30pm', '5:00pm', '5:30pm'],
    Sunday: ['10:00am', '10:30am', '11:00am', '11:30am']
  }

  function isSpotPast(spotDbDate, spotTime) {
    // Convert 12-hour time format to 24-hour format
    const timeParts = spotTime.match(/(\d+):(\d+)(am|pm)/i);
    let hours = parseInt(timeParts[1], 10);
    const minutes = timeParts[2];
    const ampm = timeParts[3].toLowerCase();

    if (ampm === 'pm' && hours < 12) hours += 12;
    if (ampm === 'am' && hours === 12) hours = 0;

    // Combine the spot's date and time in 24-hour format
    const spotDateTimeString = `${spotDbDate} ${hours}:${minutes}`;

    // Parse the combined date and time as a Date object in Pacific Time
    const spotDateTimePacific = new Date(spotDateTimeString).toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    const spotDateTime = new Date(spotDateTimePacific);

    // Get the current date and time in Pacific Time Zone
    const currentDateTimePacific = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    const currentDateTime = new Date(currentDateTimePacific);

    // Compare the spot date and time with the current date and time
    return spotDateTime < currentDateTime;
  }
  let privacy=false;

  return (
    <div className={styles.scheduleContainer} key={index}>
      {Object.entries(schedule).map(([day, times], dayIndex) => {
        console.log('formattedDates: ', formattedDates)
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
                  const spotClass = spot.className;
                  const isPast = isSpotPast(spot.dbDate, spot.time);

                  return (
                    <tr key={`${day}-${time}`}>
                      <td className={styles.timeColumn}>{time.slice(0, -2)}</td>
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