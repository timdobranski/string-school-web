'use client';

import { useState, useEffect } from 'react';
import styles from './skills.module.css';
import getSkills from '../../../../utils/getSkills';
import StudentContext, { useAuth } from '../../layout.js';


export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();

  // get student's skills data
  useEffect(() => {
    if (student && student.id) {
      const loadSkills = async () => {
        const fetchedSkills = await getSkills(student.id);
        console.log('skills: ', fetchedSkills);
        setSkills(fetchedSkills);
      };``
      loadSkills();
    }
  }, [student]);

  // render the table of skills
  const renderSkillsTable = () => {

    const filteredSkills = skills.filter(skill => filterType === 'all' || skill[`${filterType}_level`] > 0);
    const { totalUnderstanding, totalPlaying, totalEar, maxUnderstanding, maxPlaying, maxEar } = calculateTotals(filteredSkills);

    return (
      <table className={styles.skillsTable}>
        <thead>
          <tr>
            <th className={`${styles.skillNameColumn} ${styles.headerRow}`}>Skill Name</th>
            {filterType === 'all' && <>
              <th className={`${styles.understandingColumn} ${styles.headerRow}`}>Understanding</th>
              <th className={`${styles.playingColumn} ${styles.headerRow}`}>Playing</th>
              <th className={`${styles.earColumn} ${styles.headerRow}`}>Ear Training</th>
            </>}
            {filterType !== 'all' && <th className={styles.specificSkillColumn}>{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</th>}
          </tr>
        </thead>
        <tbody>
          {filteredSkills.map((skill, index) => (
            <tr key={index}>
              <td className={styles.skillNameColumn}>{skill.name}</td>
              {filterType === 'all' && <>
                <td className={styles.understandingColumn}>{`${skill.understanding_level}/3`}</td>
                <td className={styles.playingColumn}>{`${skill.playing_level}/3`}</td>
                <td className={styles.earColumn}>{`${skill.ear_level}/3`}</td>
              </>}
              {filterType !== 'all' && <td className={styles.specificSkillColumn}>{`${skill[`${filterType}_level`]}/3`}</td>}
            </tr>
          ))}
          <tr className={styles.totalRow}>
            <td className={`${styles.skillNameColumn} ${styles.totalCell}`}>Total (out of attempted skills)</td>
            {filterType === 'all' && <>
              <td className={`${styles.understandingColumn} ${styles.totalCell}`}>{`${totalUnderstanding}/${maxUnderstanding}`}</td>
              <td className={`${styles.playingColumn} ${styles.totalCell}`}>{`${totalPlaying}/${maxPlaying}`}</td>
              <td className={`${styles.earColumn} ${styles.totalCell}`}>{`${totalEar}/${maxEar}`}</td>
            </>}
            {filterType !== 'all' && <td className={`${styles.specificSkillColumn} ${styles.totalCell}`}>{`${eval('total' + filterType.charAt(0).toUpperCase() + filterType.slice(1))}/${eval('max' + filterType.charAt(0).toUpperCase() + filterType.slice(1))}`}</td>}
          </tr>
        </tbody>
      </table>
    );
  }
  // calculate the totals for each skill type
  const calculateTotals = (skills) => {
    let totalUnderstanding = 0;
    let totalPlaying = 0;
    let totalEar = 0;
    let maxUnderstanding = 0;
    let maxPlaying = 0;
    let maxEar = 0;

    skills.forEach(skill => {
      if (skill.understanding_test) {
        totalUnderstanding += skill.understanding_level;
        maxUnderstanding += 3; // Add 3 to the maximum possible score
      }
      if (skill.playing_test) {
        totalPlaying += skill.playing_level;
        maxPlaying += 3;
      }
      if (skill.ear_test) {
        totalEar += skill.ear_level;
        maxEar += 3;
      }
    });

    return { totalUnderstanding, totalPlaying, totalEar, maxUnderstanding, maxPlaying, maxEar };
  };



  return (
    <div className='infoCard'>
      <h1>Skills</h1>
      <div className={styles.skillsPageDirections}>
        <p className='text'>{`Skills can be earned by completing each skill's related tests. You can can mark skills complete in person
        during your lessons with my guidance or here in the app any time if you have the 'Manage Skills' setting enabled in the settings menu.`}</p>
        <p className='text'>Each skill can be mastered in up to three different ways:</p>
        <div className={styles.skillTypesInfo}>
          <p className='text'>1. Knowledge of the idea</p>
          <p className='text'>2. Ability to play it on the guitar</p>
          <p className='text'>3. Ability to recognize it by ear</p>
        </div>
        <p className='text'>In each of these categories, up to 3 points are possible depending on how easy it is to pass the skill test.</p>
        <p className='text'>You can view your overall progress or filter to view it in musical knowledge, playing ability, and ear training.</p>
        <p className='text'>Finally, you can also choose a Goal Path or a Genre path below. These are collections of skills that build fluency
        in the listed area, and there you can see the skills you may be missing to help guide your progress.</p>
      </div>

      <p  className='text'>You can view your total skills here,
        or select a Goal or Genre path below to see your progress in that area.</p>
      {/* Dropdown or buttons to change filterType */}
      <div>
        <button className='button' onClick={() => setFilterType('all')}>All</button>
        <button className='button' onClick={() => setFilterType('understanding')}>Understanding</button>
        <button className='button' onClick={() => setFilterType('playing')}>Playing</button>
        <button className='button' onClick={() => setFilterType('ear')}>Ear</button>
      </div>
      {skills.length > 0 ? renderSkillsTable() : <p>No skills data available.</p>}
    </div>
  );
}