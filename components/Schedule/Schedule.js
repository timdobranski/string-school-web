'use client';

import { useState, useEffect } from 'react';
import styles from './Schedule.module.css';
import supabase from '../../utils/supabase';
import fetchScheduleData from '../../app/services/fetchScheduleData';

export default function Schedule({ startDate, privacy }) {
  const [ scheduleData, setScheduleData ] = useState(null);
  const schedule = {
    Monday: ['4:30', '5:00', '5:30', '6:00', '7:00', '7:30', '8:00'],
    Tuesday: ['4:30', '5:00', '5:30', '6:00', '7:00', '7:30', '8:00'],
    Wednesday: ['4:30', '5:00', '5:30', '6:00', '7:00', '7:30', '8:00'],
    Thursday: ['4:30', '5:00', '5:30', '6:30', '7:00', '7:30', '8:00'],
    Friday: ['4:30', '5:00', '5:30'],
    Sunday: ['10:00', '10:30', '11:00', '11:30'],
  }

  useEffect(() => {
    // You should handle async operations in useEffect
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
                      <td className={styles.timeColumn}>{time}</td>
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

