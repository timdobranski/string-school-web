'use client';

import StudentContext, { useAuth } from '../layout.js';


export default function Practice() {
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();


  return (
    <div className='infoCard'>
      <h1 className='sectionHeader'>Practice</h1>

    </div>
  )
}