import styles from './Spot.module.css';

// studentData prop might not be necessary
export default function Spot({handler, activeSpotId, spot, studentData, privacy }) {
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
  const isPast = isSpotPast(spot.dbDate, spot.time);


  const onClickHandler = () => {
    if (isPast && privacy) {
      alert('This lesson has already passed. Please choose another lesson in the future.');
    } else if (spot.student && privacy) {
      alert('This lesson has already been booked. Please choose another lesson.');
    } else {
      handler({
        day: spot.day,
        time: spot.time,
        date: spot.date,
        dbDate: spot.dbDate,
        student: spot.student,
        studentData: studentData,
        activeSpotId: activeSpotId,
        id: spot.id
      });
    }
  }
  return (
    <td className={`${styles.statusColumn} ${styles[spot.className]} ${isPast ? styles.disabledSpot : ''}`}
      onClick={onClickHandler}
    >
      {(isPast && spot.cellText === 'Open!' && privacy ) ? 'Time Has Passed' : spot.cellText}
      {privacy === false && spot.cellText !== 'Open!' ?
        <div className={`${styles.studentDataWrapper} ${activeSpotId === spot.id ? styles.active : ''}`}>
          {studentData}
        </div> : null
      }
    </td>
  )
}

// a spot can be: booked, open, or passed.

// Each condition will need:
// a handler
// a className
// a cellText

// But there are also two render contexts: student view vs teacher view

// student view, if privacy === true
// if booked
// cellText: spot.cellText
// className: spot.className
// handler: bookedHandler, defined locally
// if open
// cellText: Open!
// className: <day>open
// handler: bookNewSpot handler passed from page context
// if passed && open
// cellText: Time Has Passed
// className: <day>booked
// handler: passedHandler, defined locally


// teacher view, if privacy === false
// if booked (determined by )
// cellText: student name
// className: <day>booked
// handler: expand-student-spot-handler, passed from page context
// if open
// cellText: Open!
// className: <day>open
// handler: bookNewSpot handler passed from page context
// if passed && open
// cellText: Time Has Passed
// className: <day>booked
// handler: bookNewSpot handler passed from page context
// if passed && booked
// cellText: student name
// className: <day>booked
// handler: expand-student-spot-handler, passed from page context

// Find a concise, readable way to render the spots based on all these conditions
