import { supabase } from './supabase';

export default async function getStudentPaths(studentId) {
  // Fetch paths data
  const { data: pathsData, error: pathsError } = await supabase
    .from('paths')
    .select(`
      id,
      name,
      description,
      path_modules (
        modules (id, name, description,
          module_skills (
            skills (id, name, playing_test, knowledge_test, ear_test,
              student_skills (
                knowledge_level,
                playing_level,
                ear_level
              )
            )
          )
        )
      )
    `)
    .eq('path_modules.modules.module_skills.skills.student_skills.student', studentId);

  if (pathsError) {
    console.error('Error getting paths:', pathsError);
    return null;
  }

  // Flatten and reformat the data
  const flattenedPathsData = pathsData.map(path => ({
    id: path.id,
    name: path.name,
    description: path.description,
    modules: path.path_modules.map(pathModule => {
      const skillsPathModule = pathModule.modules; // Renamed variable
      const moduleSkills = skillsPathModule.module_skills.map(ms => ms.skills);

      const possibleKnowledgePoints = moduleSkills.reduce((total, skill) => total + (skill.knowledge_test ? 3 : 0), 0);
      const possiblePlayingPoints = moduleSkills.reduce((total, skill) => total + (skill.playing_test ? 3 : 0), 0);
      const possibleEarPoints = moduleSkills.reduce((total, skill) => total + (skill.ear_test ? 3 : 0), 0);

      const skillsWithLevels = moduleSkills.map(skill => ({
        knowledge_level: skill.student_skills[0]?.knowledge_level,
        playing_level: skill.student_skills[0]?.playing_level,
        ear_level: skill.student_skills[0]?.ear_level,
      }));

      const totalKnowledgePoints = skillsWithLevels.reduce((total, skill) => total + (skill.knowledge_level || 0), 0);
      const totalPlayingPoints = skillsWithLevels.reduce((total, skill) => total + (skill.playing_level || 0), 0);
      const totalEarPoints = skillsWithLevels.reduce((total, skill) => total + (skill.ear_level || 0), 0);

      return {
        id: skillsPathModule.id, // Using the renamed variable
        name: skillsPathModule.name, // Using the renamed variable
        description: skillsPathModule.description, // Using the renamed variable
        skills: moduleSkills,
        total_ear_points: totalEarPoints,
        total_playing_points: totalPlayingPoints,
        total_knowledge_points: totalKnowledgePoints,
        possible_ear_points: possibleEarPoints,
        possible_playing_points: possiblePlayingPoints,
        possible_knowledge_points: possibleKnowledgePoints
      };
    }),
  }));

  console.log('Successfully got paths:', flattenedPathsData);
  return flattenedPathsData;
}
