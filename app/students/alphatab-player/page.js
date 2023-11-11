'use client';

import AlphaTab from '../../../components/AlphaTab/Alphatab';
import { useSearchParams } from 'next/navigation';
import styles from './alphatabPlayer.module.css';


export default function AlphatabPlayer() {

    const searchParams = useSearchParams();
    const fileUrl = searchParams.get('fileUrl');

  return (
    <div className={styles.playerContainer}>
      <AlphaTab scoreData={fileUrl} />
    </div>
  )
}