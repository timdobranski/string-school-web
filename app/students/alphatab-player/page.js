'use client';

import AlphaTab from '../../../components/AlphaTab/Alphatab';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import styles from './alphatabPlayer.module.css';
import { supabase } from '../../../utils/supabase';


export default function AlphatabPlayer() {

    const searchParams = useSearchParams();
    const fileUrl = searchParams.get('fileUrl');

  return (
    <div className={styles.playerContainer}>
      <AlphaTab scoreData={fileUrl} />
    </div>
  )
}