'use client';

import styles from './Home.module.css';
import { supabase } from '../../../utils/supabase';
import StudentContext, { useAuth } from '../layout.js';
import Image from 'next/image'

export default function StudentHome() {
  const { user, session, signOut } = useAuth();

  console.log('user:', user);



  if (user) {
    const name = user.user_metadata.full_name;
    const email = user.email;
    const phone = user.user_metadata.phone;
    const photo = user.user_metadata.picture;

    return (
      <main className='infoCard'>
        <h1>STUDENT HOME</h1>
        <p>{name}</p>
        <p>{email}</p>
        <p>{phone}</p>
        <div>
          <Image src={photo} alt="Student Photo" width={100} height={100} />
        </div>
      </main>
    )
  } else {
    return <h1>Loading...</h1>
  }

}