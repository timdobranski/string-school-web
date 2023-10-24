'use client';

import styles from './signup.module.css';
import { useState, useEffect } from'react';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/navigation';

export default function Signup() {

  const router = useRouter();
  const [commPref, setCommPref] = useState('none');
  const [preferredEmail, setPreferredEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [authUserId, setAuthUserId] = useState('');
  const [confirmCode, setConfirmCode] = useState('');


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
        setPreferredEmail(data.session.user.email);
      } else {
        console.log('No session');
      }
    };
  checkSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('session: ', session);


// First, query the students table to find the student with the matching confirmCode
const { data: studentData, error: studentError } = await supabase
  .from('students')  // Replace with your students table name if it's different
  .select('id')
  .eq('spot_confirm_code', confirmCode)
  .single();

if (studentError) {
  console.error('Error getting student:', studentError);
  return;
}

// Check if a student with the matching confirmCode was found
if (!studentData) {
  console.error('No student found with confirmCode:', confirmCode);
  return;
}

// Now, insert the new user with the student_id set to the id of the student found above
const { data, error } = await supabase
  .from('users')  // Replace with your users table name if it's different
  .insert([
    {
      preferred_comm: commPref,
      preferred_email: preferredEmail,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      auth_user_id: authUserId,
      student_id: studentData.id,  // Use the id of the student found above
    },
  ]);

    if (error) {
      console.error('Error inserting user:', error);
      return;
    }
    else {
      console.log('User inserted:', data);
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
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
      <div>
        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          If you are a preexisting student, enter your confirmation code to associate your
          account with your student:
          <input
            type="text"
            value={confirmCode}
            onChange={(e) => setConfirmCode(e.target.value)}
          />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
    <button onClick={handleSignout}>Sign Out</button>
  </div>
)

}