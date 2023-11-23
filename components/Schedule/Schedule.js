'use client';

import { useState, useEffect } from 'react';
import styles from './Schedule.module.css';
import supabase from '../../utils/supabase';
import getAllUpcomingLessons from '../../utils/getAllUpcomingLessons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import getArrayOfMondays from '../../utils/getArrayOfMondays';
import dateFormatter from '../../utils/dateFormatter';

export default function Schedule({ startDate, privacy }) {
  const [ scheduleData, setScheduleData ] = useState(null); // array of objects w/day/time or more, depending on privacy
  const [ scheduleDates, setScheduleDates ] = useState(null);  // Array of tuples for Mon-Sun upcoming dates
  const [ formattedDates, setFormattedDates ] = useState(null); // Same as above, but formatted to be readable
  const [currentWeek, setCurrentWeek] = useState(0);
  const schedule = {
    Monday: ['4:30pm', '5:00pm', '5:30pm', '6:00pm', '7:00pm', '7:30pm', '8:00pm'],
    Tuesday: ['4:30pm', '5:00pm', '5:30pm', '6:00pm', '7:00pm', '7:30pm', '8:00pm'],
    Wednesday: ['4:30pm', '5:00pm', '5:30pm', '6:00pm', '7:00pm', '7:30pm', '8:00pm'],
    Thursday: ['4:30pm', '5:00pm', '5:30pm', '6:30pm', '7:00pm', '7:30pm', '8:00pm'],
    Friday: ['4:30pm', '5:00pm', '5:30pm'],
    Sunday: ['10:00am', '10:30am', '11:00am', '11:30am']
  }
  // fetchScheduleData needs a boolean value for privacy
  useEffect(() => {
    const fetchData = async () => {
      // const data = await getScheduleData(scheduleDates[0][0], privacy, 8);
      const data = await getAllUpcomingLessons(8, false);
      console.log('final schedule data: ', data);
      setScheduleData(data);
    };
    fetchData();
  }, [scheduleDates]);


  // get and set the weeks array (formatted and raw)
  useEffect(() => {
    const dates = getArrayOfMondays(8);
    const formatOptions = { length: 'short', includeYear: false};
    const formattedDates = dates.map(date => {
      const formattedMon = dateFormatter(date[0], formatOptions);
      const formattedSun = dateFormatter(date[1], formatOptions);
      return [formattedMon, formattedSun];
    })
    setScheduleDates(dates);
    setFormattedDates(formattedDates);

  }, [])

  useEffect(() => {
    if (scheduleData) {
      // console.log('current week: ', currentWeek);
      // console.log('scheduleData[currentWeek]: ', scheduleData.schedule[currentWeek]);
    }

  }, [currentWeek])

  const nextWeek = () => {
    if (currentWeek < 7) {
      setCurrentWeek((curr) => curr + 1);
    }
  }
  const prevWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek((curr) => curr - 1);
    }
  }

  return (
    scheduleData ? (
      <>
      <div className={styles.scheduleHeadersContainer}>
        <FontAwesomeIcon icon={faCircleArrowLeft} className={styles.arrow} onClick={prevWeek}/>
        <div className={styles.dateAndDotsContainer}>
  <h2 className={styles.scheduleHeader}>{`${formattedDates[currentWeek][0]} - ${formattedDates[currentWeek][1]}`}</h2>
  <div className={styles.dotContainer}>
    {Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className={`${styles.navDot} ${index === currentWeek ? styles.activeDot : ''}`}
      ></div>
    ))}
  </div>
</div>
        <FontAwesomeIcon icon={faCircleArrowRight} className={styles.arrow} onClick={nextWeek}/>
      </div>

      <div className={styles.scheduleContainer}>
        {Object.entries(schedule).map(([day, times]) => (
          <div key={day} className={`${styles.dayContainer} ${styles[day.toLowerCase()]}`}>
            <h3 className={styles[`${day.toLowerCase()}Booked`]}>{day}</h3>
            <table className={styles.scheduleTable}>
              <tbody>
                {times.map((time) => {
                  const scheduleEntry = scheduleData.schedule[currentWeek].find(entry => entry.day === day && entry.time === time);
                  let statusText, className, name, additionalClass;

                  if (scheduleEntry) {
                    switch (scheduleEntry.type) {
                      case 'cancellation':
                        statusText = 'Open this week only';
                        className = 'Open';
                        additionalClass = `${day.toLowerCase()}Open`;
                        name = statusText;
                        break;
                      case 'makeup':
                        statusText = 'Booked this week only';
                        className = 'Booked';
                        additionalClass = `${day.toLowerCase()}Booked`;
                        name = statusText;
                        break;
                      case 'regular':
                      default:
                        statusText = 'Booked';
                        className = 'Booked';
                        name = `${scheduleEntry.first_name || ''} ${scheduleEntry.last_name || ''}`.trim() || statusText;
                        break;
                    }
                  } else {
                    statusText = 'Open';
                    className = 'Open';
                    name = 'Open!';
                  }

                  return (
                    <tr key={`${day}-${time}`}>
                      <td className={styles.timeColumn}>{time.slice(0, -2)}</td>
                      <td className={`${styles.statusColumn} ${styles[`${day.toLowerCase()}${className}`]} ${styles[className.toLowerCase()]} ${additionalClass || ''}`}>
                        {name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      </>
    ) : (
      <h1>Loading...</h1>
    )
  );
}

