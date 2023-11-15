import { supabase } from './supabase';

export default async function togglePracticeTracking(id) {
  const { data, error } = await supabase
    .from('students')
    .update({ practice_tracking: !practice_tracking })
    .eq('id', id)
  if (error) {
    console.log('error: ', error);
  } else {
    console.log('lesson logs: ', data);
    return data;
  }
}