'use client';

import { useState, useEffect } from 'react';
import styles from './Schedule.module.css';
import supabase from '../../utils/supabase';
import fetchScheduleData from '../../app/services/fetchScheduleData';

export default function Schedule({ startDate, privacy }) {
  const [ scheduleData, setScheduleData ] = useState(null);
  const schedule = {
    Monday: ['4:30pm', '5:00pm', '5:30pm', '6:00pm', '7:00pm', '7:30pm', '8:00pm'],
    Tuesday: ['4:30pm', '5:00pm', '5:30pm', '6:00pm', '7:00pm', '7:30pm', '8:00pm'],
    Wednesday: ['4:30pm', '5:00pm', '5:30pm', '6:00pm', '7:00pm', '7:30pm', '8:00pm'],
    Thursday: ['4:30pm', '5:00pm', '5:30pm', '6:30pm', '7:00pm', '7:30pm', '8:00pm'],
    Friday: ['4:30pm', '5:00pm', '5:30pm'],
    Sunday: ['10:00am', '10:30am', '11:00am', '11:30am'],
  }

  // fetchScheduleData needs a boolean value for privacy
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchScheduleData(privacy);
      setScheduleData(data);
    };

    fetchData();
  }, [privacy]);


  return (
    scheduleData ? (
      <div className={styles.scheduleContainer}>
        {Object.entries(schedule).map(([day, times]) => (
          <div key={day} className={`${styles.dayContainer} ${styles[day.toLowerCase()]}`}>
            <h3 className={styles[`${day.toLowerCase()}Booked`]}>{day}</h3>
            <table className={styles.scheduleTable}>
              <tbody>
                {times.map((time) => {
                  const scheduleEntry = scheduleData.find(entry => entry.day === day && entry.time === time);
                  const status = scheduleEntry ? 'Booked' : 'Open';
                  const name = scheduleEntry
                    ? `${scheduleEntry.first_name || ''} ${scheduleEntry.last_name || ''}`.trim() || 'Booked'
                    : 'Open!';
                  return (
                    <tr key={`${day}-${time}`}>
                      <td className={styles.timeColumn}>{time.slice(0, -2)}</td>
                      <td className={`${styles.statusColumn} ${styles[`${day.toLowerCase()}${status}`]} ${styles[status.toLowerCase()]}`}>
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
    ) : (
      <h1>Loading...</h1>
    )
  );
}

