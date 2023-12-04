import { supabase } from './supabase';


export default async function getSkills(studentId, skillId = null) {
  try {
    // Start building the query
    let query = supabase
      .from('student_skills')
      .select(`
        knowledge_level,
        playing_level,
        ear_level,
        skill:skills!inner(id, name, description, playing_test, knowledge_test, ear_test)
      `)
      .eq('student', studentId);

    // If skillId is provided, add another .eq() condition
    if (skillId) {
      query = query.eq('skill', skillId);
    }

    // Execute the query
    let { data, error } = await query;

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
  } catch (error) {
    console.error('Unexpected error in getSkills:', error);
    return null;
  }
}