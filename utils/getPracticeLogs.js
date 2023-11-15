import { supabase } from './supabase';
import dateFormatter from './dateFormatter';
import timeFormatter from './timeFormatter';
import minutesToHours from './minutesIntoHours';

export default async function getPractice(id) {
  const { data, error } = await supabase
    .from('practiceSessions')
    .select('*')
    .eq('student', id)
    // .order('created_at', { ascending: false });
  if (error) {
    console.log('error: ', error);
  } else {
    console.log('lesson logs before return: ', data);
    return data.map((log) => {
      const formattedDay = dateFormatter(log.day, {length: 'short', includeDay: true, includeYear: false});
      const formattedTime = timeFormatter(log.start_time);
      const formattedDuration = minutesToHours(log.duration);
      return {
        ...log,
        day:formattedDay,
        start_time: formattedTime,
        duration: formattedDuration
      }
    });
  }
}