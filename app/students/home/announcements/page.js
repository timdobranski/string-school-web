'use client'

import styles from './announcements.module.css';
import { useState, useEffect, useCallback } from 'react';

export default function Announcements({ announcements }) {
  const [announcementList, setAnnouncementList] = useState([]);
  const [visibleAnnouncements, setVisibleAnnouncements] = useState([]);


  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getAnnouncements');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAnnouncementList(data); // Assuming the data is in the format that can be directly set to the state
        console.log('announcements: ', data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    // Call the async function
    fetchData();
  }, []);
  useEffect(() => {
    setVisibleAnnouncements(announcementList.slice(0, 10));
  }, [announcementList]);

  const loadMoreAnnouncements = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    const moreAnnouncements = announcementList.slice(visibleAnnouncements.length, visibleAnnouncements.length + 10);
    setVisibleAnnouncements(prev => [...prev, ...moreAnnouncements]);
  }, [announcementList, visibleAnnouncements]);

  useEffect(() => {
    window.addEventListener('scroll', loadMoreAnnouncements);
    return () => window.removeEventListener('scroll', loadMoreAnnouncements);
  }, [loadMoreAnnouncements]);

  if (!announcementList || announcementList.length === 0) {
    return ( <p>Loading</p> )
  }

  return (
    <div className='infoCard'>
      {announcementList.map((announcement, index) => {return (
        <div key={index} className='section'>
          <h2 className='subheaders'>{announcement.title}</h2>
          <p className='text'>{announcement.text}</p>
        </div>
      )
      })}
    </div>
  );
}