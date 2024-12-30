'use client';

import styles from './PublicTopbar.module.css';

export default function PublicTopbar() {

  return (
    <div className={styles.wrapper}>
      <p className={styles.messageText}>Gift Cards For New Lessons Available Now! </p>

      <div className={styles.contactWrapper}>
        <p className={styles.contactItem} >tim@lamesastringschool.com</p>
        <p className={styles.contactItem} >(619) 663-8461</p>
       </div>
    </div>
  )

}