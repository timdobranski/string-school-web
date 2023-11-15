'use client';

import StudentContext, { useAuth } from '../layout.js';
import {useState, useEffect} from 'react';
import getPracticeLogs from '../../../utils/getPracticeLogs';
import setPracticeLog from '../../../utils/setPracticeLog';
import togglePracticeTracking from '../../../utils/togglePracticeTracking';
import styles from './practice.module.css';

export default function Practice() {
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();
  const [ practiceSessions, setPracticeSessions ] = useState([]);

  useEffect(() => {
    console.log('student: ', student)
    const getAndSetPracticeSessions = async () => {
    if (student && student.practice_tracking) {
      const practiceSessions = await getPracticeLogs(student.id);
      console.log('practice sessions: ', practiceSessions);
      setPracticeSessions(practiceSessions);
    }
  }
  getAndSetPracticeSessions();
  }, [student])


  if (student && student.practice_tracking && practiceSessions) {

    return (
      <div className='infoCard'>
        <h1 className='sectionHeader'>Practice</h1>

        <button className='featureButton'>Start A Practice Session</button>
        <button className='featureButton'>Log  A Past Practice</button>

        <h2 className={'featuresHeader'}>{`This Week's Practice`}</h2>
        <table className={styles.practiceSessionsTable}>
  <thead>
    <tr className={styles.practiceSessionHeadersRow}>
      <th className='featureHeaders'>Date</th>
      <th className='featureHeaders'>Start Time</th>
      <th className='featureHeaders'>Duration</th>
      <th className='featureHeaders'>Notes</th>
    </tr>
  </thead>
  <tbody>
    {practiceSessions.map((item, index) => (
      <tr key={index} className={styles.practiceSessionRow}>
        <td className={styles.practiceSessionData}>{item.day}</td>
        <td className={styles.practiceSessionData}>{item.start_time}</td>
        <td className={styles.practiceSessionData}>{item.duration}</td>
        <td className={styles.practiceSessionData}>{item.notes}</td>
      </tr>
    ))}
  </tbody>
</table>
        <h2 className={'featuresHeader'}>{`View Previous Weeks`}</h2>
        </div>
    )
  } else if (student && !student.practice_tracking) {
    return (
      <div className='infoCard'>
        <h1 className='sectionHeader'>Practice</h1>
        <h2 className={'featuresHeader'}>Practice Tracking Is Not Enabled</h2>
        <p className={'featureComments'}>Practice tracking is not enabled for your account. Enable it below:</p>
        <button className='featureButton' onClick={() => togglePracticeTracking(student.id)}>Enable Practice Tracking</button>
      </div>
    )
  }
}