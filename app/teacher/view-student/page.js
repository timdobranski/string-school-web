'use client'

import styles from './view-student.module.css';
import getStudentData from '../../../utils/getStudentData';
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import StudentLessonLog from '../../../components/TeacherComponents/StudentLessonLog/StudentLessonLog.js';
import StudentPracticeSession from '../../../components/TeacherComponents/StudentPracticeSession/StudentPracticeSession.js';

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
        <div className={styles.lessonLogsWrapper}>
          <h3 className='featureHeaders'>Setlist & Skills</h3>

        </div>

      </div>
    )

  }
}