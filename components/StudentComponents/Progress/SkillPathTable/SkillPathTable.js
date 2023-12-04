import styles from './SkillPathTable.module.css';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SkillPathTable({ skillPaths }) {
  const [selectedPath, setSelectedPath] = useState(null);
  const [displayColumns, setDisplayColumns] = useState('all');
  const [openModules, setOpenModules] = useState([]);
  const router = useRouter();

  const handlePathChange = (path) => {
    setSelectedPath(path);
    setOpenModules([]); // Reset open modules when the path changes
  };

  const handleColumnChange = (column) => {
    setDisplayColumns(column);
  };

  const toggleModule = (module) => {
    if (openModules.includes(module)) {
      setOpenModules(openModules.filter((m) => m !== module));
    } else {
      setOpenModules([...openModules, module]);
    }
  };

  const renderModules = () => {
    if (!selectedPath) return null;

    const modules = selectedPath.modules.map((module) => (
      <React.Fragment key={module.id}>
        <tr
          className={styles.moduleRow}
          onClick={() => toggleModule(module)}
        >
          <td className={styles.moduleName}>{module.name}</td>
          <td className={styles.moduleDescription}>{module.description}</td>
          <td
            className={`${styles.modulePoints} ${
              displayColumns === 'all' || displayColumns === 'knowledge' ? '' : styles.hidden
            }`}
          >
            {module.total_knowledge_points}/{module.possible_knowledge_points}
          </td>
          <td
            className={`${styles.modulePoints} ${
              displayColumns === 'all' || displayColumns === 'playing' ? '' : styles.hidden
            }`}
          >
            {module.total_playing_points}/{module.possible_playing_points}
          </td>
          <td
            className={`${styles.modulePoints} ${
              displayColumns === 'all' || displayColumns === 'ear' ? '' : styles.hidden
            }`}
          >
            {module.total_ear_points}/{module.possible_ear_points}
          </td>
        </tr>
        {openModules.includes(module) && (
          <React.Fragment>
            {renderSkills(module)}
            <tr className={styles.skillPointsRow}>
              <td></td>

            </tr>
          </React.Fragment>
        )}
      </React.Fragment>
    ));

    // Add the total row to the modules array
    const totalRow = renderTotalRow();
    if (totalRow) {
      modules.push(totalRow);
    }

    return modules;
  };

  const renderSkills = (module) => {
    if (!module) return null;

    return module.skills.map((skill) => (
      <tr key={skill.id} className={styles.skillRow}
        onClick={() => router.push(`/students/progress/skill-summary?skillId=${skill.id}`)}>

        <td className={styles.skillName}>{skill.name}</td>
        <td className={styles.skillDescription}>{skill.description || ""}</td>
        <td
          className={`${styles.skillPoints} ${
            displayColumns === 'all' || displayColumns === 'knowledge' ? '' : styles.hidden
          }`}
        >
          {skill.knowledge_test ? (skill.student_skills[0].knowledge_level || '0') + '/3' : null}
        </td>
        <td
          className={`${styles.skillPoints} ${
            displayColumns === 'all' || displayColumns === 'playing' ? '' : styles.hidden
          }`}
        >
          {skill.playing_test ? (skill.student_skills[0].playing_level || '0') + '/3' : null}
          {/* {skill.playing_level || '0'}/{3} */}
        </td>
        <td
          className={`${styles.skillPoints} ${
            displayColumns === 'all' || displayColumns === 'ear' ? '' : styles.hidden
          }`}
        >
          {skill.ear_test ? (skill.student_skills[0].ear_level || '0') + '/3' : null}
        </td>
      </tr>

    ));
  };


  const renderTotalRow = () => {
    if (!selectedPath) return null;

    const totalKnowledgePoints = selectedPath.modules.reduce(
      (total, module) => total + module.total_knowledge_points,
      0
    );
    const totalPlayingPoints = selectedPath.modules.reduce(
      (total, module) => total + module.total_playing_points,
      0
    );
    const totalEarPoints = selectedPath.modules.reduce(
      (total, module) => total + module.total_ear_points,
      0
    );

    const totalPossibleKnowledgePoints = selectedPath.modules.reduce(
      (total, module) => total + module.possible_knowledge_points,
      0
    );
    const totalPossiblePlayingPoints = selectedPath.modules.reduce(
      (total, module) => total + module.possible_playing_points,
      0
    );
    const totalPossibleEarPoints = selectedPath.modules.reduce(
      (total, module) => total + module.possible_ear_points,
      0
    );

    return (
      <tr className={styles.totals}>
        <td>Total</td>
        <td></td>
        <td
          className={`${styles.totalPoints} ${
            displayColumns === 'all' || displayColumns === 'knowledge' ? '' : styles.hidden
          }`}
        >
          {totalKnowledgePoints}/{totalPossibleKnowledgePoints}
        </td>
        <td
          className={`${styles.totalPoints} ${
            displayColumns === 'all' || displayColumns === 'playing' ? '' : styles.hidden
          }`}
        >
          {totalPlayingPoints}/{totalPossiblePlayingPoints}
        </td>
        <td
          className={`${styles.totalPoints} ${
            displayColumns === 'all' || displayColumns === 'ear' ? '' : styles.hidden
          }`}
        >
          {totalEarPoints}/{totalPossibleEarPoints}
        </td>
      </tr>
    );
  };

  return (
    <div className={styles.tableWrapper}>
      {/* dropdown path select menu */}
      <div className={styles.pathDropdownWrapper}>
        <label htmlFor="pathSelect" className={styles.text}>
          Select a path:
        </label>
        <select
          id="pathSelect"
          className={styles.pathSelect}
          onChange={(e) =>
            handlePathChange(skillPaths.find((path) => path.id === parseInt(e.target.value)))
          }
        >
          <option value="">-- Select a path --</option>
          {skillPaths.map((path) => (
            <option key={path.id} value={path.id}>
              {path.name}
            </option>
          ))}
        </select>
      </div>
      {selectedPath && (
        <div>
          <h2 className={styles.pathName}>{selectedPath.name}</h2>
          <p className={styles.pathDescription}>{selectedPath.description}</p>


          {/* path table */}
          <table className={styles.pathTable}>
            <thead>
              <tr className={styles.tableHeaders}>
                <th className={styles.moduleHeader}>Module Name</th>
                <th className={styles.moduleHeader}>Description</th>
                <th
                  className={`${styles.moduleHeader} ${
                    displayColumns === 'all' || displayColumns === 'knowledge'
                      ? ''
                      : styles.hidden
                  }`}
                >
                  Knowledge
                </th>
                <th
                  className={`${styles.moduleHeader} ${
                    displayColumns === 'all' || displayColumns === 'playing'
                      ? ''
                      : styles.hidden
                  }`}
                >
                  Playing
                </th>
                <th
                  className={`${styles.moduleHeader} ${
                    displayColumns === 'all' || displayColumns === 'ear'
                      ? ''
                      : styles.hidden
                  }`}
                >
                  Ear
                </th>
              </tr>
            </thead>
            <tbody>{renderModules()}</tbody>
          </table>

        </div>
      )}
    </div>
  );
}