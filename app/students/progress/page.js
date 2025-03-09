'use client';

import styles from './progress.module.css';
import StudentContext, { useAuth } from '../layout.js';
import { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabase';
import Link from 'next/link';

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
      <div className='studentPageWrapper'>
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
        <Link href='/students/progress/skills'><p className='text'>View All Skills</p></Link>

      </div>
    </div>
    )
  } else {
    return <p>Loading...</p>
  }
}