'use client';

import styles from './Home.module.css';
import { supabase } from '../../../utils/supabase';
import StudentContext, { useAuth } from '../layout.js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import getStudentData from '../../../utils/getStudentData';
import StudentLessonLog from '../../../components/TeacherComponents/StudentLessonLog/StudentLessonLog.js';
import StudentPracticeSession from '../../../components/TeacherComponents/StudentPracticeSession/StudentPracticeSession.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faX } from '@fortawesome/free-solid-svg-icons';


export default function StudentHome() {
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [studentData, setStudentData] = useState({});
  const router = useRouter();

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
    if (student && student.id && supabaseUserData) {

      const loadStudentData = async () => {
        const allStudentData = await getStudentData(student.id);
        allStudentData.info = allStudentData.lessons.students[0];
        delete allStudentData.lessons.students;
        console.log('student data: ', allStudentData);
        setStudentData(allStudentData);
      }
      setShowAnnouncement(supabaseUserData.announcement_dismissed);
      loadStudentData();

    }
  }, [student])

  if (googleUserData && student && announcements && studentData.lessonLogs) {
    const name = student.first_name;
    const makeups = student.makeups;
    const announcement = announcements[0];

    return (
      <main className='infoCard'>
        <h2 className='sectionHeaders'>{`${name}'s Lessons`}</h2>
        <h3 className={styles.lessonInfo}>{`${student.day}s @ ${student.time}`}</h3>
        {student.new_spot_start_date ? <h3 className={styles.lessonInfo}>{`New spot ${`${student.new_day}s @ ${student.new_time} starts at
        `} ${student.new_spot_start_date}`}</h3> : null}
        {/* <h2 className='featureHeaders'>Current Project</h2>
        <p >{student.current_project}</p> */}
        <div>
          <button className={styles.viewAllAnnouncements}onClick={() => {router.push('/students/home/announcements')}}>View All Announcements</button>

          { !showAnnouncement ? null :
            <div key={announcements[announcements[0]]} className='section'>
              {/* <h2 className='featureHeaders'>Announcements</h2> */}
              <FontAwesomeIcon icon={faX} className={styles.dismissAnnouncements}onClick={() => {
                fetch(`/api/dismissAnnouncement?user=${supabaseUserData.id}`)
                  .then(() => { setShowAnnouncement(false) })
              }} />
              <h2 className='subheaders'>{announcement.title}</h2>
              <p className='text'>{announcement.text}</p>
            </div>
          }


        </div>
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