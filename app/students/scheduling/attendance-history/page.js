'use client';

import styles from './attendance-history.module.css';
import { useState, useEffect } from 'react';
import StudentContext, { useAuth } from '../../layout.js';
import AttendanceHistoryTable from '../../../../components/AttendanceHistoryTable/AttendanceHistoryTable';
import getAttendanceHistory from '../../../../utils/getAttendanceHistory';

export default function AttendanceHistory() {
  const [attendance, setAttendance] = useState({});
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();

  useEffect (() => {
    if (student && student.id) {
      const loadAttendance = async () => {
        const attendanceData = await getAttendanceHistory(student.id);
        console.log('attendance: ', attendanceData);
        setAttendance(attendanceData);
      }
      loadAttendance();
    }
  }, [student])

  if (attendance.cancellations && attendance.makeups) {
    return (
      <div className='infoCard'>
        <h1 className='sectionHeaders'>Attendance History</h1>
        <AttendanceHistoryTable cancellations={attendance.cancellations} makeups={attendance.makeups} />
      </div>
    )
  } else {
    return <h1>Loading...</h1>
  }
}