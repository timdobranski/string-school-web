import { supabase } from '../../utils/supabase';

export default async function fetchStudents(privacy) {
  const studentData = privacy === true ? 'day, time' : '*';

  const { data, error } = await supabase
    .from('students')
    .select(studentData);

  if (error) {
    console.error('Error fetching students:', error);
    return null;
  } else {
    console.log('Successfully fetched students:', data)
    return data;
  }
}
