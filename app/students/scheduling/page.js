'use client'

import styles from './scheduling.module.css';
import Link from 'next/link';
import { useState } from 'react';
import StudentContext, { useAuth } from '../layout.js';


export default function StudentScheduling() {
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();
  const [render, setRender] = useState('SchedulingHome');
  const [cancellation, setCancellation] = useState([]);
  const [newLesson, setNewLesson] = useState([]);
  const [newSpot, setNewSpot] = useState({day: '', time: '', startDate: ''});


  if (googleUserData) {
    return (
      <div className='infoCard'>

        <h1 className='sectionHeaders'>SCHEDULING</h1>
        <Link href='/students/scheduling/cancel-lesson'>
          <h2 className='featureHeaders'>Cancel A Lesson</h2>
          <p className='featureComments'>Cancel now & reschedule later</p>
        </Link>
        <Link href='/students/scheduling/reschedule-lesson'>
          <h2 className='featureHeaders'>Reschedule A Lesson</h2>
          <p className='featureComments'>Cancel and reschedule now</p>
        </Link>
        <Link href='/students/scheduling/schedule-makeup'>
          <h2 className='featureHeaders'>Schedule A Makeup Lesson</h2>
          <p className='featureComments'>Use a makeup credit</p>
        </Link>

        <h2 className='featureHeaders'>Switch Spots</h2>
        <p className='featureComments'>Change To A Different Recurring Weekly Spot</p>

        <h2 className='featureHeaders'>Add An Additional Spot</h2>
        <p className='featureComments'>Book An Additional Recurring Weekly Spot</p>

        <h2 className='featureHeaders'>Schedule An Extra Lesson</h2>
        <p className='featureComments'>Book A One-Time Extra Lesson</p>

      </div>
    )
  } else {
    return <h1>Loading...</h1>
  }

}