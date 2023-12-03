'use client';

import { useState, useEffect } from 'react';
import styles from './skills.module.css';
import getSkills from '../../../../utils/getSkills';
import StudentContext, { useAuth } from '../../layout.js';


export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();

  // get student's skills
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
            <td className={`${styles.skillNameColumn} ${styles.totalCell}`}>Total</td>
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
      {/* Dropdown or buttons to change filterType */}
      <div>
        <button onClick={() => setFilterType('all')}>All</button>
        <button onClick={() => setFilterType('understanding')}>Understanding</button>
        <button onClick={() => setFilterType('playing')}>Playing</button>
        <button onClick={() => setFilterType('ear')}>Ear</button>
      </div>
      {skills.length > 0 ? renderSkillsTable() : <p>No skills data available.</p>}
    </div>
  );
}