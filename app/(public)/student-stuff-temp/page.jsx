import styles from './page.module.css';
import Link from 'next/link';

export default function StudentStuffTemp() {


  return (
    <div className={styles.wrapper}>
      <h1 className={'sectionTitle'}>STUDENT STUFF</h1>
      <div className={styles.contentWrapper}>
        <p className={styles.text}>This page is temporary, and will soon be replaced with student login for access to an entirely new suite of resources. Until then, you can access the familiar links from the old site below:</p>
        <p className='smallerSectionTitle'>SCHEDULING</p>
        <div className={styles.formsWrapper}>
          <div className={styles.navLink}>
            <a href='https://docs.google.com/document/d/18_k8ToYmk2PYpF2TiPqBhdFUpaXBPx7VqTcrwoZfQxk/edit?tab=t.0' target='blank'>VIEW SCHEDULE</a>
          </div>
          <p className={styles.label}>Check the current availability for open spots here</p>

          <div className={styles.navLink}>
            <a href='https://docs.google.com/forms/d/e/1FAIpQLScJRl1umSF599X6XEpCAi5UpB3_Z1OVmCP62I0lsVEs3PktuA/viewform' target='blank'>CANCELLATION FORM</a>
            <p className={styles.label}>Use this form to cancel an upcoming lesson. You can schedule a make-up as well, or do that later</p>
          </div>
          <div className={styles.navLink}>
            <a href='https://docs.google.com/forms/d/e/1FAIpQLSdeyz3mSRt7ryZH95OK1QxmHd4Z2ZFJ1U0vEzv1IhwhcSBFnw/viewform' target='blank'>MAKEUP FORM</a>
          </div>
          <p className={styles.label}>Use this form to schedule a make-up lesson for a past cancellation</p>

        </div>
        <p className='smallerSectionTitle'>RESOURCES</p>
        <div className={styles.resourcesWrapper}>

          <div className={styles.navLink}>
            <a href='https://drive.google.com/file/d/1FGTRea0Hl99xproEFarB6yReLMpr62E0/view?usp=sharing' target='blank'>TEXTBOOK</a>
          </div>
          <p className={styles.label}>View or print the PDF copy of my textbook here</p>

          <div className={styles.navLink}>
            <a href='https://drive.google.com/drive/folders/1n9iEYNLl4Dgd_BTzB04SwxpPd4F2FWry?usp=drive_link' target='blank'>SONG LIBRARY</a>
          </div>
          <p className={styles.label}>Browse sheet music here</p>
        </div>
        <div className={styles.navLink}>
          <p className='smallerSectionTitle'>PAYMENTS</p>
        </div>
        <div className={styles.paymentsSectionWrapper}>
          <div className={styles.navLink}>
            <a href='https://account.venmo.com/u/TimDobranski' target='blank'>VENMO</a>
          </div>
          <div className={styles.navLink}>
            <a href='https://www.paypal.com/paypalme/timdobranski' target='blank'>PAYPAL</a>
          </div>
        </div>

        {/* <div className={styles.navLink}>
          <Link href='/student-stuff-temp'>GETTING STARTED</Link>
        </div> */}
      </div>

    </div>
  )

}