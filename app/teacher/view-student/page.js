'use client'

import getStudentData from '../../../utils/getStudentData';
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';

export default function ViewStudent() {
  const [studentData, setStudentData] = useState();
  const searchParams = useSearchParams();
  const studentId = searchParams.get('studentId');

  useEffect(() => {
    const loadStudentData = async () => {
      const student = await getStudentData(studentId);
      console.log('student data: ', data);
      student.data = student.lessons.students[0];
      delete student.lessons.students;
      setStudentData(student);
    }
    loadStudentData()
  }, [studentId])

  if (studentData) {
    return (
      <div className='infoCard'>
        <p>{`${student}`}</p>
      </div>
    )

  }
}