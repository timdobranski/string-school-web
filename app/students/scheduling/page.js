'use client'

import styles from './scheduling.module.css';
import Link from 'next/link';
import { useState } from 'react';
import StudentContext, { useAuth } from '../layout.js';


export default function StudentScheduling() {
  // User & student data provided by layout.js context
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();
  // Rescheduling Steps



  if (googleUserData) {
    console.log('"student" inside scheduling:', student);
    console.log('"supabaseuserdata" inside scheduling:', supabaseUserData);
    console.log('"googleUserData" inside scheduling:', googleUserData);
    console.log('"session" inside scheduling:', session);

    return (
      <div className='infoCard'>

        <h1 className='sectionHeaders'>SCHEDULING</h1>

        <h2 className='featureHeaders'>Cancel A Lesson</h2>
        <p className='featureComments'>Cancel now & reschedule later</p>

        <h2 className='featureHeaders'>Reschedule A Lesson</h2>
        <p className='featureComments'>Cancel and reschedule now</p>

        <h2 className='featureHeaders'>Schedule A Makeup Lesson</h2>
        <p className='featureComments'>Use a makeup credit</p>

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