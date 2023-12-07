'use client';

import styles from './Home.module.css';
import { supabase } from '../../../utils/supabase';
import StudentContext, { useAuth } from '../layout.js';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import getStudentData from '../../../utils/getStudentData';
import StudentLessonLog from '../../../components/TeacherComponents/StudentLessonLog/StudentLessonLog.js';
import StudentPracticeSession from '../../../components/TeacherComponents/StudentPracticeSession/StudentPracticeSession.js';


export default function StudentHome() {
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [studentData, setStudentData] = useState({});


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
    if (student && student.id) {
      const loadStudentData = async () => {
        const allStudentData = await getStudentData(student.id);
        allStudentData.info = allStudentData.lessons.students[0];
        delete allStudentData.lessons.students;
        console.log('student data: ', allStudentData);
        setStudentData(allStudentData);
      }
      loadStudentData()
    }
  }, [student])

  useEffect(() => {
    console.log('studentData: ', studentData)
  }, [studentData])



  if (googleUserData && student && announcements && studentData.lessonLogs) {
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
        <Link href='/students/scheduling/schedule-makeup' className={styles.makeups}>
          <p className={styles.makeupsNumber}>{`${makeups} ${makeups === 1 ? 'makeup' : 'makeups'} available`}</p>
        </Link>

        {/* lesson logs */}
        <h3 className='featureHeaders'>Lesson Logs</h3>
        { studentData.lessonLogs.slice(0, 4).map((log, index) => {
          return (
            <StudentLessonLog log={log} key={index} />
          )
        })}

        {/* <h2 className='featureHeaders'>Upcoming Lessons</h2> */}
        {/* <UpcomingLessons studentId={student.id} numOfLessons={2}/> */}


      </main>
    )
  } else {
    return <h1>Loading...</h1>
  }

}