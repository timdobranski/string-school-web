'use client';

import styles from './Login.module.css';
import { supabase } from '../../utils/supabase';

export default function Login() {
  // Google Signin
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          prompt: 'select_account'
        }
      }
    });
    if (error) {
      console.error(error);
    } else {
      console.log('User signed in:', data);
    }
  };
  // Normal Signin

  return (
    <div className='infoCard'>
      <h1>STUDENT LOGIN</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  )
}

