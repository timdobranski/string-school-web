'use client';

import styles from './Home.module.css';
import { supabase } from '../../../utils/supabase';
import StudentContext, { useAuth } from '../layout.js';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import getUpcomingLessons from '../../../utils/getUpcomingLessons.js';
import UpcomingLessons from '../../../components/StudentComponents/UpcomingLessons/UpcomingLessons.js';

export default function StudentHome() {
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();
  const [announcements, setAnnouncements] = useState([]);


  useEffect(() => {
    const getAnnouncements = async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.log('error: ', error);
      } else {
        setAnnouncements(data);
      }
    };
    getAnnouncements();
  }, []);

  useEffect(() => {
    console.log('announcements: ', announcements);
  }, [announcements]);
  // console.log('google user data:', googleUserData);
  console.log('supabase user data:', supabaseUserData);


  if (googleUserData && student && announcements) {
    const name = student.first_name;
    const makeups = student.makeups;

    return (
      <main className='infoCard'>
        <h2 className='sectionHeaders'>{`${name}'s Lessons`}</h2>
        {/* <h2 className='featureHeaders'>Current Project</h2>
        <p >{student.current_project}</p> */}
        <h2 className='featureHeaders'>Announcements</h2>
        {announcements.map((announcement) => {
          return (
            <div key={announcement.id} className={styles.announcement}>
              <h2 className={styles.announcementHeader}>{announcement.title}</h2>
              <p className={styles.announcementContent}>{announcement.text}</p>
            </div>
          )
        })}

        <h2 className='featureHeaders'>Makeups Available:</h2>
        <p>{makeups}</p>
        <h2 className='featureHeaders'>Upcoming Lessons</h2>
        <UpcomingLessons studentId={student.id} numOfLessons={5}/>


      </main>
    )
  } else {
    return <h1>Loading...</h1>
  }

}