'use client';

import styles from './home.module.css';
import Schedule from '../../../components/Schedule/Schedule';
import getStudentData from '../../../utils/getStudentData';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TeacherHome() {
  const [currentStudent, setCurrentStudent] = useState();
  const [studentInfoRender, setStudentInfoRender] = useState();
  const [activeSpotId, setActiveSpotId] = useState(null);


  const spotClickHandler = async ({ day, time, date, dbDate, student }) => {
    const studentData = await getStudentData(student);
    setCurrentStudent(studentData);
    setActiveSpotId(student);
  }



  useEffect(() => {
    console.log('curentStudent: ', currentStudent);
    if (currentStudent && currentStudent.contacts) {
      const studentInfoBox = (
        <>

          {currentStudent.contacts.map((contact) => {
            return (
              <div key={contact.id}>
                <p >{`${contact.first_name} ${contact.last_name}`}</p>
                <p>{contact.phone || 'No phone provided'}</p>
                <p>{contact.email || 'No email provided'}</p>
                <p>{contact.preferred_comm === 'none' ? 'No communication preference' : contact.preferred_comm}</p>

              </div>
            )
          })}
        </>
      )
      setStudentInfoRender(studentInfoBox);
 }

  }, [currentStudent])


  return (
    <>
      <h1 className='sectionHeaders'>Teacher Home</h1>
      <Schedule
        privacy={false}
        handler={spotClickHandler}
        activeSpotId={activeSpotId}
        studentData={studentInfoRender}/>
    </>
  )
}