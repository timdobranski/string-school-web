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


  const spotClickHandler = async ({ day, time, date, dbDate, student }) => {
    const studentData = await getStudentData(student);
    setCurrentStudent(studentData);
    setActiveSpotId(student);
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
        studentData={studentInfoRender}
      />
      <button className={styles.signOutButton} onClick={handleSignout}>Sign Out</button>

    </>
  )
}