'use client'

import styles from './view-student.module.css';
import getStudentData from '../../../utils/getStudentData';
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import StudentLessonLog from '../../../components/TeacherComponents/StudentLessonLog/StudentLessonLog.js';
import StudentPracticeSession from '../../../components/TeacherComponents/StudentPracticeSession/StudentPracticeSession.js';
import PaymentsTable from '../../../components/PaymentsTable/PaymentsTable'

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
      <div className='infoCard'>
        <p className='sectionHeaders'>{`${studentData.info.first_name} ${studentData.info.last_name}`}</p>
        <div className={styles.lessonLogsWrapper}>
          <h3 className='featureHeaders'>Lesson Logs</h3>

          {studentData.lessonLogs.slice(0, 4).map((log, index) => {
            return (
              <StudentLessonLog log={log} key={index} />
            )
          }
          )}
        </div>
        <div className={styles.lessonLogsWrapper}>
          <h3 className='featureHeaders'>Practice Sessions</h3>
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
            <h3 className='featureHeaders'>Setlist Songs</h3>

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
            <h3 className='featureHeaders'>Skills</h3>
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
          <h3 className='featureHeaders'>Payment History</h3>
          <PaymentsTable payments={studentData.payments} />
        </div>
      </div>
    )

  }
}