'use client';

import styles from './skill-summary.module.css';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '../../../../utils/supabase';
import StudentContext, { useAuth } from '../../layout.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import updateSkillHandler from '../../../../utils/updateSkill.js';
import getSkills from '../../../../utils/getSkills.js';
import Modal from 'react-modal';

export default function SkillSummary() {
  const searchParams = useSearchParams();
  const skillId = searchParams.get('skillId');
  const [skillData, setSkillData] = useState(null);
  const [userCanUpdate, setUserCanUpdate] = useState(false);
  const [knowledgeValue, setKnowledgeValue] = useState('');
  const [playingValue, setPlayingValue] = useState('');
  const [earValue, setEarValue] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
  // a message to display if the user can't update skills
  const canUpdateMessage = (
    <div className='alert' onClick={toggleUpdatePermissions}>
      <p >Self-updating skills is not enabled for your account. Click here to enable it</p>
      <FontAwesomeIcon icon={faCircleXmark} className={styles.icon} onClick={dismissAlert}/>
    </div>
  )

  // modal controls
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (skillData) {
      setKnowledgeValue(skillData.knowledge_level);
      setPlayingValue(skillData.playing_level);
      setEarValue(skillData.ear_level || '');
    }
  }, [skillData])

  // get the skill data
  useEffect(() => {
    if (!skillId || !student) return;
    const loadSkillData = async () => {
      const studentSkill = await getSkills(student.id, skillId);
      setSkillData(studentSkill[0]);
    }
    loadSkillData()

  },[skillId, student]);

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    content: {
      top: '50vh',
      transform: 'translateY(-50%)',
      width: '400px',
      margin: '0 auto',
      height: '250px',
      background: 'linear-gradient(to bottom, #FFFFFF #E5E5E5)',
      borderRadius: '10px',
      padding: 0,
      // border: 'none',
    }
  }

  if (!skillData || !student) return null;
  return (
    <div className='infoCard'>

      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        style={modalStyles}>
        <div className={styles.confirmSkillUpdateWrapper}>
          <h3 className={styles.confirmMessage}>Skill Updated!</h3>
        </div>
      </Modal>

      {!userCanUpdate && supabaseUserData.update_skills_alert_dismissed === false ? canUpdateMessage : null}
      <h1 className={styles.skillName}>{`${skillData.skill.name}`}</h1>
      <h3 className='text'>{`${skillData.skill.description}`}</h3>
      <p className='text'>{`Each of the three areas below have a point value from 0-3.`}</p>
      <h3 className={styles.infoHeader}>{`0 points: Incomplete`}</h3>
      <p className='text'>{`The test cannot be completed, or has not been attempted`}</p>
      <h3 className={styles.infoHeader}>{`1 point: Novice`}</h3>
      <p className='text'>{`The test can eventually be completed without assistance`}</p>
      <h3 className={styles.infoHeader}>{`2 points: Intermediate`}</h3>
      <p className='text'>{`The test can be completed, with with some hesitation or difficulty`}</p>
      <h3 className={styles.infoHeader}>{`3 points: Expert`}</h3>
      <p className='text'>{`The test can be completed quickly, repeatedly, and easily. This level should be reserved
       for skills that you know so well that you will probably know forever`}</p>



      {skillData.skill.playing_test && (
        <div className={styles.skillTestWrapper}>
          <h1 className='featureHeaders'>Playing Test</h1>
          <p className='text'>{skillData.skill.playing_test}</p>
          <p className='text'>{`Your current level: ${skillData.playing_level}`}</p>
          {userCanUpdate ?
            <>
              <select
                name="playing"
                id="playing"
                value={playingValue}
                onChange={(e) => setPlayingValue(e.target.value)}
                className={styles.select}

              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <button
                onClick={() => {
                  updateSkillHandler(student.id, skillId, 'playing', playingValue);
                  setModalIsOpen(true)
                }}
                className='button'
              >Update</button>
            </> : null}
        </div>
      )}

      {skillData.skill.knowledge_test && (
        <div className={styles.skillTestWrapper}>
          <h1 className='featureHeaders'>Knowledge Test</h1>
          <p className='text'>{skillData.skill.knowledge_test}</p>
          <p className='text'>{`Your current level: ${skillData.knowledge_level}`}</p>
          {/* <div></div> */}
          {userCanUpdate ?
            <>
              <select
                name="knowledge"
                id="knowledge"
                value={knowledgeValue}
                onChange={(e) => setKnowledgeValue(e.target.value)}
                className={styles.select}

              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <button
                onClick={() => updateSkillHandler(student.id, skillId, 'knowledge', knowledgeValue)}
                className='button'
              >Update</button>
            </>
            : null}
        </div>
      )}

      {skillData.skill.ear_test && (
        <div className={styles.skillTestWrapper}>
          <h1 className='featureHeaders'>Ear Test</h1>
          <p className='text'>{skillData.skill.ear_test}</p>
          <p className='text'>{`Your current level: ${skillData.ear_level}`}</p>
          {userCanUpdate ?
            <>
              <select
                name="ear"
                id="ear"
                value={earValue}
                onChange={(e) => setEarValue(e.target.value)}
                className={styles.select}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <button
                onClick={() => updateSkillHandler(student.id, skillId, 'ear', earValue)}
                className='button'>Update</button>
            </> : null }
        </div>
      )}
    </div>
  );
};