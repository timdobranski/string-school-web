'use client';

import styles from './Hero.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Hero({ title = [], text = [], image, direction }) {
  return (
    <div className={`${styles.wrapper}`}>
      <img
        src={image || '/images/hero-banner-2.jpg'}
        alt="hero photo"
        className={styles.image}
      />

      <div className={styles.contentWrapper}>
        <h3 className={styles.header}>
          {title.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h3>

        {text.map((paragraph, index) => (
          <p className={styles.text} key={index}>
            {paragraph}
          </p>
        ))}
        <Link href="#why">
          <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
        </Link>
      </div>
    </div>
  );
}
