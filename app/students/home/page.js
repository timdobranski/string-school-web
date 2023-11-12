'use client';

import styles from './Home.module.css';
import { supabase } from '../../../utils/supabase';
import StudentContext, { useAuth } from '../layout.js';
import Image from 'next/image'

export default function StudentHome() {
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();

  console.log('google user data:', googleUserData);
  console.log('supabase user data:', supabaseUserData);



  if (googleUserData && student) {
    const name = student.first_name;
    const makeups = student.makeups;

    return (
      <main className='infoCard'>
        <h2 className='sectionHeaders'>{`${name}'s Lessons`}</h2>
        <h2 className='featureHeaders'>Current Project</h2>
        <p className='featureComments'>Wannabe - Spice Girls</p>
        <h2 className='featureHeaders'>Makeups Available:</h2>
        <p>{makeups}</p>
        <h2 className='featureHeaders'>Upcoming Lessons</h2>
        <ul>
          <li className='featureComments'>Lesson 1</li>
          <li className='featureComments'>Lesson 2</li>
          <li className='featureComments'>Lesson 3</li>
        </ul>



      </main>
    )
  } else {
    return <h1>Loading...</h1>
  }

}