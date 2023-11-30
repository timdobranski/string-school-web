'use client';

import styles from './Login.module.css';
import { supabase } from '../../utils/supabase';


export default function Login() {
  // get the appropriate redirect url for after signin
  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/'
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    return url
  }

  // Google Signin
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
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

