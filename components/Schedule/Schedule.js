'use client';

import { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from './Schedule.module.css';
import supabase from '../../utils/supabase';
import getAllUpcomingLessons from '../../utils/getAllUpcomingLessons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import getScheduleDates from '../../utils/getScheduleDates';
import dateFormatter from '../../utils/dateFormatter';
import { Carousel } from 'react-responsive-carousel';

export default function Schedule({ startDate, privacy, handler }) {
  const [ scheduleData, setScheduleData ] = useState(null); // array of objects w/day/time or more, depending on privacy
  const [ scheduleRenders, setScheduleRenders ] = useState([]); // actual jsx to render for each week
  const [ formattedDates, setFormattedDates ] = useState(null); // Same as above, but formatted to be readable
  const [ currentWeek, setCurrentWeek] = useState(0);
  const [ currentItem, setCurrentItem] = useState(0);

  // data structure for schedule spots to render table
  const schedule = {
    Monday: ['4:30pm', '5:00pm', '5:30pm', '6:00pm', '7:00pm', '7:30pm', '8:00pm'],
    Tuesday: ['4:30pm', '5:00pm', '5:30pm', '6:00pm', '7:00pm', '7:30pm', '8:00pm'],
    Wednesday: ['4:30pm', '5:00pm', '5:30pm', '6:00pm', '7:00pm', '7:30pm', '8:00pm'],
    Thursday: ['4:30pm', '5:00pm', '5:30pm', '6:30pm', '7:00pm', '7:30pm', '8:00pm'],
    Friday: ['4:30pm', '5:00pm', '5:30pm'],
    Sunday: ['10:00am', '10:30am', '11:00am', '11:30am']
  }



  // get schedule
  // fetchScheduleData needs a number of weeks to return, and boolean value for privacy
  useEffect(() => {
    const formatOptions = { length: 'short', includeYear: false, format: true };
    const formattedDates = getScheduleDates(8, formatOptions);
    setFormattedDates(formattedDates);

    const fetchData = async () => {
      //num of lessons, privacy boolean, studentId
      const data = await getAllUpcomingLessons(8, privacy);
      console.log('data provided to Schedule component w/no id given: ', data)
      setScheduleData(data);
    };
    fetchData();
  }, [privacy]);

  // create weekly schedule renders for carousel
  useEffect(() => {
    if (scheduleData && scheduleData.schedule) {

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

      // For each weekArray in the scheduleData, create a render
      const renders = scheduleData.schedule.map((weekSchedule, index) => {
        return (
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
                              }) : undefined}
                            >
                              {isPast && spot.cellText === 'Open!' ? 'Lesson Passed' : spot.cellText}
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
      });

      setScheduleRenders(renders);
    }
  }, [scheduleData]);


  // nav dots for the carousel
  const Dot = ({ index, isActive, onClick }) => (
    <button
      className={`${styles.navDot} ${isActive ? styles.activeDot : ''}`}
      onClick={() => onClick(index)}
    />
  );


  const nextWeek = () => {
    if (currentItem < scheduleRenders.length - 1) {
      setCurrentItem(currentItem + 1);
    }
  }

  const prevWeek = () => {
    if (currentItem > 0) {
      setCurrentItem(currentItem - 1);
    }
  }

  return (
    scheduleData ? (
      <>
        {/* CAROUSEL NAVIGATION */}
        <div className={styles.scheduleHeadersContainer}>
          <button onClick={prevWeek} className={styles.customArrowLeft}>
            <FontAwesomeIcon icon={faCircleArrowLeft} className={styles.arrow}/>
          </button>
          <div className={styles.dateAndDotsContainer}>
            <h2 className={styles.scheduleHeader}>{`${formattedDates[currentItem][0]} - ${formattedDates[currentItem][5]}`}</h2>
            <div className={styles.navDotsContainer}>
              {scheduleRenders.map((_, index) => (
                <Dot
                  key={index}
                  index={index}
                  isActive={currentItem === index}
                />
              ))}
            </div>
          </div>
          <button onClick={nextWeek} className={styles.customArrowRight}>
            <FontAwesomeIcon icon={faCircleArrowRight} className={styles.arrow} />
          </button>
        </div>

        {/* CAROUSEL OF WEEKLY SCHEDULES */}
        <div className={`${styles.carouselContainer} `}>
          <Carousel
            className={styles.carousel}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            selectedItem={currentItem}
          >
            {scheduleRenders.map((render, index) => (
              <div key={index} className={`${styles.scheduleSlide} ${index === currentItem ? styles.activeSlide : ''}`}>
                {render}
              </div>
            ))}
          </Carousel>
        </div>
      </>
    ) : (
      <h1>Loading...</h1>
    )
  );
}

