'use client';

import styles from './home.module.css';
import Schedule from '../../../components/Schedule/Schedule';
import getStudentData from '../../../utils/getStudentData';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../../utils/supabase';
import { useRouter } from 'next/navigation';

export default function TeacherHome() {
  const [currentStudent, setCurrentStudent] = useState();
  const [studentInfoRender, setStudentInfoRender] = useState();
  const [activeSpotId, setActiveSpotId] = useState(null);
  const router = useRouter();

  // student prop is the student id
  const spotClickHandler = async ({ day, time, date, dbDate, student, id }) => {
    if (activeSpotId === id) { setActiveSpotId(null); return;}

    const studentData = (
      <div className={styles.studentCardWrapper}>
        <Link href={`/teacher/view-student?studentId=${student}`}><p classname='text'>View Student</p></Link>
        <Link href={`/teacher/log-absence?student=${student}`}><p className='text'>Log Absence</p></Link>
        <Link href={`/teacher/log-payment?student=${student}`}><p className='text'>Log Payment</p></Link>
      </div>
    )

    setStudentInfoRender(studentData);
    setActiveSpotId(id);
  }
  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut({
      options: {
        scope: 'global'
      }
    });
    if (error) {
      console.log('error on signout: ', error);
    } else {
      router.push('/')
    }
  }


  useEffect(() => {
    console.log('curentStudent: ', currentStudent);
    if (currentStudent && currentStudent.contacts) {
      const studentInfoBox = (
        <>
          <div>
            <Link href={`/teacher/student-info?student=${currentStudent.lessons.students[0].id}`}>

            </Link>
          </div>
        </>
      )
      setStudentInfoRender(studentInfoBox);
    }

  }, [currentStudent])


  return (
    <>
      <Schedule
        privacy={false}
        handler={spotClickHandler}
        activeSpotId={activeSpotId}
        setActiveSpotId={setActiveSpotId}
        studentData={studentInfoRender}
      />
      <button className={styles.signOutButton} onClick={handleSignout}>Sign Out</button>

    </>
  )
}