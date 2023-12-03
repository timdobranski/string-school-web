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
      };
      loadSkills();
    }
  }, [student]);

  // get student's skills
  const renderSkillsTable = () => {
    const filteredSkills = skills.filter(skill => filterType === 'all' || skill[`${filterType}_level`] > 0);

    return (
      <table className={styles.skillsTable}>
        <thead>
          <tr>
            <th className={`${styles.skillNameColumn} ${styles.headerRow}`}>Skill Name</th>
            {filterType === 'all' && <>
              <th className={`${styles.understandingColumn} ${styles.headerRow}`}>Understanding</th>
              <th className={`${styles.playingColumn} ${styles.headerRow}`}>Playing</th>
              <th className={`${styles.earColumn} ${styles.headerRow}`}>Ear</th>
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
        </tbody>
      </table>
    );
  }

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