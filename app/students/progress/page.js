import styles from './progress.module.css';

export default function Progress() {
  return (
    <div className='infoCard'>
      <h1 className='sectionHeader'>Progress</h1>

      <div className={styles.nestedSection}>
        <h1 className='featureHeaders'>Setlist</h1>
        <p className='featureComments'>{`All The Songs You've Learned`}</p>
        <div>
          <p></p>
        </div>
      </div>
      <div className={styles.nestedSection}>
        <h1 className='featureHeaders'>Skills</h1>
        <p className='featureComments'>{`Skills You've Learned, Shown In Relation To Different Skills Paths`}</p>

      </div>
      <div className={styles.nestedSection}>
        <h1 className='featureHeaders'>Lesson Logs</h1>
        <p className='featureComments'>Updates From Me</p>
      </div>
    </div>
  )
}