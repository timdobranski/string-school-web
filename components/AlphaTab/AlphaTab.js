'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './AlphaTab.module.css';

export default function AlphaTab({ scoreData }) {


  const iframeSrc = `/alphatab/alphatabPlayer.html?songFile=${encodeURIComponent(scoreData)}`;


  return (
    <div className={styles.alphatabContainer}>
      <iframe
      id='alphatab-iframe'
      key={scoreData}
      src={`${iframeSrc}`}
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