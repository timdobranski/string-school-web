import { supabase } from './supabase';


export default async function getSkills(studentId) {
  let { data, error } = await supabase
    .from('student_skills')
    .select(`
      knowledge_level,
      playing_level,
      ear_level,
      skill:skills!inner(id, name, playing_test, knowledge_test, ear_test)
    `)
    .eq('student', studentId);

  if (error) {
    console.error('Error getting skills:', error);
    return null;
  } else {
    console.log('Successfully got skills:', data);
    return data.map(skillEntry => ({
      ...skillEntry.skill, // Spread the skill properties
      ...skillEntry
    }));
  }
}