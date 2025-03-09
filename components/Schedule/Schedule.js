'use client';

import { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from './Schedule.module.css';
import supabase from '../../utils/supabase';
import getAllUpcomingLessons from '../../utils/getAllUpcomingLessons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import getScheduleDates from '../../utils/getScheduleDates';
import dateFormatter from '../../utils/dateFormatter';
import { Carousel } from 'react-responsive-carousel';
import Week from '../Week/Week';

// activeSpotId and studentData are for teacher view to render extra student data on click
export default function Schedule({ startDate, privacy, handler, activeSpotId, studentData, setActiveSpotId }) {
  const [ scheduleData, setScheduleData ] = useState(null); // array of objects w/day/time or more, depending on privacy
  const [ scheduleRenders, setScheduleRenders ] = useState([]); // actual jsx to render for each week
  const [ formattedDates, setFormattedDates ] = useState(null); // Same as above, but formatted to be readable
  const [ currentWeek, setCurrentWeek] = useState(0);
  const [ currentItem, setCurrentItem] = useState(0);

  // get schedule (fetchScheduleData needs a number of weeks to return, and boolean value for privacy)
  useEffect(() => {
    const formatOptions = { length: 'short', includeYear: false, format: true };
    const formattedDates = getScheduleDates(8, formatOptions);
    setFormattedDates(formattedDates);

    const fetchData = async () => {
      //num of lessons, privacy boolean, studentId
      const data = await getAllUpcomingLessons(8, privacy);
      setScheduleData(data);
    };
    fetchData();
  }, [privacy]);

  // once schedule is fetched, create weekly schedule renders for carousel
  useEffect(() => {
    if (scheduleData && scheduleData.schedule && formattedDates) {

      // For each weekArray in the scheduleData, create a render
      const renders = scheduleData.schedule.map((weekSchedule, index) => {
        return (
          <Week
            weekSchedule={weekSchedule}
            formattedDates={formattedDates}
            index={index}
            key={index}
            activeSpotId={activeSpotId}
            studentData={studentData}
            handler={handler}
            privacy={privacy}
            setActiveSpotId={setActiveSpotId}
          />
        )

      });

      setScheduleRenders(renders);
    }
  }, [scheduleData, activeSpotId]);


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
            <FontAwesomeIcon icon={faChevronLeft} className={styles.arrow}/>
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
            <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
          </button>
        </div>

        {/* CAROUSEL OF WEEKLY SCHEDULES */}
        <div className={`${styles.carouselContainer} `}>
          <Carousel
            className={styles.carousel}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            showArrows={false}
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

