'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './AlphaTab.module.css';

export default function AlphaTab({ scoreData }) {


  const htmlFilePath = `/api/alphaTabPlayer?songFile=${scoreData}`;


  return (
    <div className={styles.alphatabContainer}>
      <iframe
      id='alphatab-iframe'
      key={scoreData}
      src={`${htmlFilePath}`}
      width="100%"
      height="1000px"
      style={{
        border: 'none',
      }}
      allow="autoplay"
      ></iframe>
    </div>
  );
}