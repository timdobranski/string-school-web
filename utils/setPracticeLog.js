import { supabase } from './supabase';

export default async function getLessonLogs(log) {
  const { data, error } = await supabase
    .from('practiceSessions')
    .insert({
      day: log.day,
      student: log.student,
      start_time: log.time,
      duration: log.duration,
      notes: log.notes,
    })

  if (error) {
    console.log('error: ', error);
  } else {
    console.log('practice logs: ', data);
    return data;
  }
}