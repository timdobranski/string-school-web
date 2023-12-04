'use client';

import styles from './skill-summary.module.css';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '../../../../utils/supabase';
import StudentContext, { useAuth } from '../../layout.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';


export default function SkillSummary() {
  const searchParams = useSearchParams();
  const skillId = searchParams.get('skillId');
  const [skillData, setSkillData] = useState(null);
  const [userCanUpdate, setUserCanUpdate] = useState(false);
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();

  // toggle skills update permissions for user
  const toggleUpdatePermissions = async () => {
    const { data, error } = await supabase
      .from('users')
      .update({ can_update_skills: !userCanUpdate })
      .eq('id', supabaseUserData.id);
    if (error) {
      console.log('error: ', error);
    }
    setUserCanUpdate(prev => !prev);
  }
  // dismiss the update permissions alert for now and future sessions
  const dismissAlert = async () => {
    console.log('updating database to dismiss alert forever')
    const { data, error } = await supabase
      .from('users')
      .update({ update_skills_alert_dismissed: true })
      .eq('id', supabaseUserData.id);
    if (error) {
      console.log('error: ', error);
    }
  }
  const canUpdateMessage = (
    <div className='alert' onClick={toggleUpdatePermissions}>
      <p >Self-updating skills is not enabled for your account. Click here to enable it</p>
      <FontAwesomeIcon icon={faCircleXmark} className={styles.icon} onClick={dismissAlert}/>
    </div>
  )


  // get the skill data
  useEffect(() => {
    if (!skillId) return;

    const loadSkillData = async () => {
      const {data: skill, error} = await supabase
        .from('skills')
        .select('*')
        .eq('id', skillId);

      if (error) {
        console.error('Error getting skill:', error);
        return;
      }
      console.log('skill: ', skill);
      setSkillData(skill[0]);
    }
    loadSkillData()
  },[skillId]);

  // render a table of skill tests

  if (!skillData || !student) return null;
  return (
    <div className='infoCard'>
      {!userCanUpdate && supabaseUserData.update_skills_alert_dismissed === false ? canUpdateMessage : null}
      <h1 className={styles.skillName}>{`${skillData.name}`}</h1>
      <h3>{`${skillData.description}`}</h3>

      <div className={styles.skillTestWrapper}>
        <h3 className='featureHeaders'>Knowledge Test</h3>
        <p className='text'>{`${skillData.knowledge_test}`}</p>
      </div>
      <div className={styles.skillTestWrapper}>
        <h3 className='featureHeaders'>Playing Test</h3>
        <p className='text'>{`${skillData.playing_test}`}</p>
      </div>
      <div className={styles.skillTestWrapper}>
        <h3 className='featureHeaders'>Ear Test</h3>
        <p className='text'>{`${skillData.ear_test}`}</p>

      </div>
    </div>
  )


}