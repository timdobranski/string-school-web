'use client';

import styles from './Home.module.css';
import StudentContext, { useAuth } from '../layout.js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import StudentPracticeSession from '../../../components/TeacherComponents/StudentPracticeSession/StudentPracticeSession.js';
import PaymentsTable from '../../../components/PaymentsTable/PaymentsTable';
import ContactsTable from '../../../components/ContactsTable/ContactsTable';
// import getStudentData from '../../../utils/getStudentData';
import LessonLog from '../../../components/LessonLog/LessonLog.js';
// import StudentPracticeSession from '../../../components/TeacherComponents/StudentPracticeSession/StudentPracticeSession.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faX } from '@fortawesome/free-solid-svg-icons';


export default function StudentHome() {
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [studentData, setStudentData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const response = await fetch('/api/getAnnouncements');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAnnouncements(data);
        console.log('announcements: ', data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    loadAnnouncements();
  }, []);

  useEffect(() => {
    const loadStudentData = async () => {
      if (student && student.id && supabaseUserData) {
        try {
          const response = await fetch(`/api/getStudentData?student=${student.id}`);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const allStudentData = await response.json();
          console.log('all student data: ', allStudentData);

          if (allStudentData.lessons && allStudentData.lessons.students) {
            allStudentData.info = allStudentData.lessons.students[0];
            delete allStudentData.lessons.students;
          }

          console.log('student data: ', allStudentData);
          setStudentData(allStudentData);
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      }
    };

    setShowAnnouncement(supabaseUserData?.announcement_dismissed);
    loadStudentData();
  }, [student, supabaseUserData]);


  if (googleUserData && student && announcements && studentData.lessonLogs) {
    const name = student.first_name;
    const makeups = student.makeups;
    const announcement = announcements[0];

    return (
      <div className='studentPageWrapper'>
        <div className='infoCard'>
          <h2 className='smallerSectionTitleWhite'>{`${name}'s Lessons`}</h2>
          <div className={styles.spotsList}>
          {
            studentData.spots.map((spot, index) => (
              <div key={index}>
                <h3 className={styles.lessonInfo}>{`${spot.day}s @ ${spot.time}`}</h3>
                {
                  spot.new_student_start_date &&
          <h3 className={styles.lessonInfo}>
            {`Switching to new spot ${spot.new_day}s @ ${spot.new_time} on ${spot.new_student_start_date}`}
          </h3>
                }
              </div>
            ))
          }
          </div>
          <div>
            {/* <button className={styles.viewAllAnnouncements}onClick={() => {router.push('/students/announcements')}}>View All Announcements</button> */}

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
            <p className={styles.makeupsNumber}>{`${student.makeups} ${student.makeups === 1 ? 'makeup' : 'makeups'}`}</p>
          </Link>

          {/* lesson logs - renders most recent 4 */}
          <br></br>
          <h3 className='smallerSectionTitleWhite'>LESSON LOGS</h3>
          { studentData.lessonLogs.slice(0, 4).map((log, index) => {
            return (
              <LessonLog log={log} key={index} />
            )
          })}

<div className={styles.lessonLogsWrapper}>
          <h3 className='smallerSectionTitleWhite'>PRACTICE SESSIONS</h3>
          <div className={styles.practiceSessionsHeader}>
            <h3>Date</h3>
            <h3>Duration</h3>
            <h3>Notes</h3>
          </div>
          {studentData.practice.slice(0, 4).map((session, index) => {
            return (
              <StudentPracticeSession session={session} key={index} />
            )
          })}
        </div>


        {/* main wrapper for song AND skills */}
        <div className={styles.songsAndSkillsWrapper}>
          <div className={styles.songsWrapper}>
            <h3 className='smallerSectionTitleWhite'>SETLIST SONGS</h3>

            <div className={styles.allSongsWrapper}>
              <div className={styles.setlistSongsWrapper}>
                {/* <h3 className={styles.songsHeader}>Setlist</h3> */}
                {studentData.setlistSongs.slice(0, 8).map((song, index) => {
                  return (
                    <p className={styles.songListItem} key={index}>
                      {song.title}
                    </p>
                  )
                })}
              </div>

              {/* <div className={styles.recentSongsWrapper}>
                <h3 className={styles.songsHeader}>Recent</h3>
                {studentData.recentSongs.slice(0, 8).map((song, index) => {
                  return (
                    <p className={styles.songListItem} key={index}>
                      {song.title}
                    </p>
                  )
                })}
              </div> */}
            </div>
          </div>

          <div className={styles.skillsWrapper}>
            <h3 className='smallerSectionTitleWhite'>SKILLS</h3>
            <div className={styles.skillListWrapper}>
              <div className={styles.skillListHeader}>
                <p className={styles.skillName}>Skill</p>
                <p className={styles.playingLevel}>P</p>
                <p className={styles.knowledgeLevel}>K</p>
                <p className={styles.earLevel}>E</p>
              </div>
              {studentData.skills.map((skill, index) => {
                return (
                  <div className={styles.skillListItem} key={index}>
                    <p className={styles.skillName}>{skill.name}</p>
                    <p className={styles.playingLevel}>{skill.playing_level}</p>
                    <p className={styles.knowledgeLevel}>{skill.knowledge_level}</p>
                    <p className={styles.earLevel}>{skill.ear_level}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* payments */}
        <div className={styles.paymentsWrapper}>
          <h3 className='smallerSectionTitleWhite'>PAYMENTS & ATTENDANCE</h3>
          <PaymentsTable payments={studentData.payments} />
        </div>

        {/* contacts */}
        <div className={styles.contactsWrapper}>
          <h3 className='smallerSectionTitleWhite'>CONTACTS</h3>
          <ContactsTable contacts={studentData.contacts} />
        </div>

        </div>
      </div>
    )
  } else {
    return <h1>Loading...</h1>
  }

}