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
      console.log('data: ', data);
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
          {lessonLogs.map((log) => {
            return (
              <div key={log.id} className={styles.lessonLog}>
                <h2 className={styles.lessonLogHeader}>{log.title}</h2>
                <p className={styles.lessonLogContent}>{log.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  } else {
    return <p>Loading...</p>
  }
}