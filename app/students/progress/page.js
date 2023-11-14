'use client';

import styles from './progress.module.css';
import StudentContext, { useAuth } from '../layout.js';
import { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabase';

export default function Progress() {
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();
  const [lessonLogs, setLessonLogs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [setlist, setSetlist] = useState([]);

  const getLessonLogs = async () => {
    const { data, error } = await supabase
      .from('lessonLogs')
      .select('*')
      .eq('student', supabaseUserData.student_id)
      .order('created_at', { ascending: false });
    if (error) {
      console.log('error: ', error);
    } else {
      console.log('lesson logs: ', data);
      setLessonLogs(data);
    }
  };
  const getSetlist = async () => {
    const { data, error } = await supabase
      .from('setlist_songs')
      .select(`
        *,
        songs(*)
      `)
      .eq('student', supabaseUserData.student_id)
      .order('created_at', { ascending: false });

    if (error) {
      console.log('error: ', error);
    } else {
      console.log('setlist: ', data);
      // Assuming you want to extract songs data from the joined results
      const songsData = data.map(item => item.songs);
      setSetlist(songsData);
    }
  };
  useEffect(() => {
    if (supabaseUserData) {
      getLessonLogs();
      getSetlist();
    }
  }, [supabaseUserData])



  if (supabaseUserData && student && lessonLogs && setlist) {
    return (
      <div className='infoCard'>
        <h1 className='sectionHeader'>Progress</h1>


          <h1 className='featureHeaders'>Setlist</h1>
          <p className='featureComments'>{`All The Songs You've Learned`}</p>
          {setlist.map((song) => {
            return (
              <div key={song.id} className={styles.lessonLog}>
                <h2 className={styles.songTitle}>{song.title}</h2>
              </div>
            )
          })}



          <h1 className='featureHeaders'>Skills</h1>
          <p className='featureComments'>{`Skills You've Learned, Shown In Relation To Different Skills Paths`}</p>



          <h1 className='featureHeaders'>Lesson Logs</h1>
          <p className='featureComments'>Updates From Me</p>
          <table className={styles.lessonLogsTable}>
  <thead>
    <tr>
      <th className={styles.lessonLogHeader}>What We Did</th>
      <th className={styles.lessonLogHeader}>What to Practice</th>
      <th className={styles.lessonLogHeader}>Notes</th>
    </tr>
  </thead>
  <tbody>
    {lessonLogs.map((log) => (
      <tr key={log.id} className={styles.lessonLogRow}>
        <td className={styles.lessonLogCell}>{log.what_we_did}</td>
        <td className={styles.lessonLogCell}>{log.what_to_practice}</td>
        <td className={styles.lessonLogCell}>{log.notes}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    )
  } else {
    return <p>Loading...</p>
  }
}