import { supabase } from './supabase';

export default async function getAttendanceHistory(studentId) {
  const { data: cancellations, error: cancellationsError } = await supabase
    .from('cancellations')
    .select(`
      *,
      users (id, first_name)
    `)
    .eq('student', studentId)

  const { data: makeups, error: makeupsError } = await supabase
    .from('makeups')
    .select(`
      *,
      users (id, first_name)
    `)
    .eq('student', studentId)

  if (cancellationsError) { throw cancellationsError }
  if (makeupsError) { throw makeupsError }

  const attendanceHistory = {
    cancellations: cancellations,
    makeups: makeups
  }
  console.log('attendanceHistory: ', attendanceHistory);
  return attendanceHistory;
}