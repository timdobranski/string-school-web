'use client'

import styles from './view-student.module.css';
import getStudentData from '../../../utils/getStudentData';
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import LessonLog from '../../../components/LessonLog/LessonLog.js';
import StudentPracticeSession from '../../../components/TeacherComponents/StudentPracticeSession/StudentPracticeSession.js';
import PaymentsTable from '../../../components/PaymentsTable/PaymentsTable';
import ContactsTable from '../../../components/ContactsTable/ContactsTable';

export default function ViewStudent() {
  const [studentData, setStudentData] = useState();
  const searchParams = useSearchParams();
  const studentId = searchParams.get('studentId');

  useEffect(() => {
    const loadStudentData = async () => {
      const student = await getStudentData(studentId);
      student.info = student.lessons.students[0];
      delete student.lessons.students;
      console.log('student data: ', student);
      setStudentData(student);
    }
    loadStudentData()
  }, [studentId])

  if (studentData) {
    return (
      <div className='studentPageWrapper'>
      <div className='infoCard'>
        <p className='sectionHeaders'>{`${studentData.info.first_name} ${studentData.info.last_name}`}</p>
          {/* lesson logs - renders most recent 4 */}
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

  }
}