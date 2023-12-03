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
    modules: (path.path_modules || []).map(module => {
      const skillsWithLevels = (module.modules || {}).module_skills.map(skill => ({
        knowledge_level: ((skill.skills || {}).student_skills || [])[0]?.knowledge_level,
        playing_level: ((skill.skills || {}).student_skills || [])[0]?.playing_level,
        ear_level: ((skill.skills || {}).student_skills || [])[0]?.ear_level,
      }));

      const hasLevels = skillsWithLevels.some(skill =>
        skill.knowledge_level !== null ||
        skill.playing_level !== null ||
        skill.ear_level !== null
      );

      const totalKnowledgePoints = skillsWithLevels.reduce((total, skill) => total + (skill.knowledge_level || 0), 0);
      const totalPlayingPoints = skillsWithLevels.reduce((total, skill) => total + (skill.playing_level || 0), 0);
      const totalEarPoints = skillsWithLevels.reduce((total, skill) => total + (skill.ear_level || 0), 0);

      const hasKnowledgeTest = skillsWithLevels.some(skill => skill.knowledge_level !== null);
      const hasPlayingTest = skillsWithLevels.some(skill => skill.playing_level !== null);
      const hasEarTest = skillsWithLevels.some(skill => skill.ear_level !== null);

      const possibleKnowledgePoints = hasKnowledgeTest ? 3 : 0;
      const possiblePlayingPoints = hasPlayingTest ? 3 : 0;
      const possibleEarPoints = hasEarTest ? 3 : 0;

      return {
        id: module.modules.id,
        name: module.modules.name,
        description: module.modules.description,
        skills: (module.modules || {}).module_skills.map(skill => ({
          id: (skill.skills || {}).id,
          name: (skill.skills || {}).name,
          playing_test: (skill.skills || {}).playing_test,
          knowledge_test: (skill.skills || {}).knowledge_test,
          ear_test: (skill.skills || {}).ear_test,
          knowledge_level: ((skill.skills || {}).student_skills || [])[0]?.knowledge_level,
          playing_level: ((skill.skills || {}).student_skills || [])[0]?.playing_level,
          ear_level: ((skill.skills || {}).student_skills || [])[0]?.ear_level,
        })),
        ...(hasLevels && {
          total_ear_points: totalEarPoints,
          total_playing_points: totalPlayingPoints,
          total_knowledge_points: totalKnowledgePoints,
          possible_ear_points: possibleEarPoints,
          possible_playing_points: possiblePlayingPoints,
          possible_knowledge_points: possibleKnowledgePoints
        }),
      };
    }),
  }));

  console.log('Successfully got paths:', flattenedPathsData);
  return flattenedPathsData;
}