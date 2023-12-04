import { supabase } from './supabase';

export default async function updateSkillHandler (studentId, skillId, type, value) {
  console.log('Updating skill:', type);

  try {
    // First, check if the entry exists
    let { data: existingEntries, error: selectError } = await supabase
      .from('student_skills')
      .select('*')
      .eq('skill', skillId)
      .eq('student', studentId);

    if (selectError) throw selectError;

    if (existingEntries.length > 0) {
      // Entry exists, update it
      const { error: updateError } = await supabase
        .from('student_skills')
        .update({ [`${type}_level`]: value })
        .eq('skill', skillId)
        .eq('student', studentId);

      if (updateError) throw updateError;
    } else {
      // Entry does not exist, create it
      const newEntry = { studentId, skillId, [`${type}_level`]: value };
      const { error: insertError } = await supabase
        .from('student_skills')
        .insert([newEntry]);

      if (insertError) throw insertError;
    }

    console.log('Skill update/insert successful');
  } catch (error) {
    console.error('Error in skill update/insert:', error);
  }
};
