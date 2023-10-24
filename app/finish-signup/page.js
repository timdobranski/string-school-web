'use client';

import styles from './signup.module.css';
import { useState, useEffect } from'react';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/navigation';

export default function Signup() {

  const router = useRouter();
  const [commPref, setCommPref] = useState('none');
  const [preferredEmail, setPreferredEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [authUserId, setAuthUserId] = useState('');


  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);
      } else if (data.session) {
        console.log('Session:', data.session)
        setFirstName(data.session.user.user_metadata.full_name.split(' ')[0]);
        setLastName(data.session.user.user_metadata.full_name.split(' ')[1]);
        setPhone(data.session.phone);
        setAuthUserId(data.session.user.id);
      } else {
        console.log('No session');
      }
    };
  checkSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('session: ', session);


    // Assuming you have the Supabase client set up and imported as 'supabase'
    const { data, error } = await supabase
      .from('users')  // Replace with your table name if it's different
      .insert([
        {
          preferred_comm: commPref,
          preferred_email: preferredEmail,
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          auth_user_id: authUserId
        },
      ]);

    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Data:', data);
      router.push('/students/home')
    }
  };

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log('error on signout: ', error);
    router.push('/')
  }

return (
  <div className='infoCard'>
    <h1>Finish Signup</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Communication Preference:
          <select
            value={commPref}
            onChange={(e) => setCommPref(e.target.value)}
          >
            <option value="Email">Email</option>
            <option value="Text">Text</option>
            <option value="Phone">Phone</option>
            <option value="No preference">No preference</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Preferred Email:
          <input
            type="text"
            value={preferredEmail}
            onChange={(e) => setPreferredEmail(e.target.value)}
          />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
    <button onClick={handleSignout}>Sign Out</button>
  </div>
)

}