import styles from './progress.module.css';

export default function Progress() {
  return (
    <div className='infoCard'>
      <h1 className='sectionHeader'>Progress</h1>

      <div className={styles.nestedSection}>
        <h1 className='featureHeaders'>Setlist</h1>
        <div>
          <p></p>
        </div>
      </div>
      <div className={styles.nestedSection}>
        <h1 className='featureHeaders'>Skills</h1>

      </div>
      <div className={styles.nestedSection}>
        <h1 className='featureHeaders'>Lesson Logs</h1>

      </div>

    </div>
  )
}