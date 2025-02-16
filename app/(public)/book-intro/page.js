'use client';

import styles from './book-intro.module.css';
import Schedule from '../../../components/Schedule/Schedule';
import { useState, useEffect } from 'react';

export default function BookIntro() {
  const [step, setStep] = useState(1);
  // Steps:
  // 1. choose spot
  // 2. sign in: options -> google, one-time code, or custom signup via email
  // 3. complete signup

  const step1 = (
    <div className='infoCard'>
      <h2>Step 1: Choose an spot</h2>
      <Schedule privacy={true} handler={() => {setStep(2)}}/>
    </div>
  )
  const step2 = (
    <div className='infoCard'>
      <h2>Step 2: Sign Up</h2>
      <div className={styles.signInOptions}>
        <div className={styles.googleSignIn}>
          <h3>Sign in with Google</h3>
        </div>
        <div className={styles.emailSignUp}>
          <h3>Sign up with your email</h3>
        </div>
        <div className={styles.oneTimeCode}>
          <h3>Sign in with a one-time code</h3>
        </div>
      </div>
    </div>

  )




  return (
    <h2>Book An Intro
      {step === 1 ? step1 : null}
      {step === 2 ? step2 : null}
    </h2>
  )

}