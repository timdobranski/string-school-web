import styles from './page.module.css';
import Link from 'next/link';

export default function StudentStuffTemp() {


  return (
    <div className={styles.wrapper}>
      <h1 className={'sectionTitle'}>CONTACT</h1>
      <div className={styles.contentWrapper}>
        {/* <p className={styles.text}></p>
        <p className={styles.text}>The old login is no longer necessary; all files are temporarily available freely until the new system is in place.</p> */}
        {/* <p className={styles.sectionTitles}>SCHEDULING</p> */}
        <div className={styles.formsWrapper}>
          <div className={styles.navLink}>
            <p className={styles.label}>To schedule a free introduction, please check availability through my online schedule below.
              If you find a spot that works for you, you can schedule lessons using the form <a className={styles.link} href="https://forms.gle/NrcqnUG2RmQDUXh46">here</a> or contact me using the email and phone number below with
              questions.</p>
              <p className={styles.label}>tim@lamesastringschool.com</p>
              <p className={styles.label}>619-663-8461</p>
            <a href='https://docs.google.com/document/d/18_k8ToYmk2PYpF2TiPqBhdFUpaXBPx7VqTcrwoZfQxk/edit?tab=t.0' target='blank'>VIEW SCHEDULE</a>
          </div>
        </div>
        {/* <div className={styles.navLink}>
          <Link href='/student-stuff-temp'>GETTING STARTED</Link>
        </div> */}
      </div>

    </div>
  )

}