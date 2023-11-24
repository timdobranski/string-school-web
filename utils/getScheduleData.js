import { supabase } from './supabase';
import getAllUpcomingLessons from './getUpcomingLessons';
import { startOfISOWeek, addWeeks, format, isWithinInterval } from 'date-fns';

export default async function getScheduleData(privacy) {
  let students = await getStudentData(privacy);
  let schedule = initializeWeeklyObjects(8);

  for (let student of students) {
    let lessons = await getAllUpcomingLessons(student.id);
    console.log('lessons: ', lessons);
    for (let lesson of lessons) {
        let weekIndex = getWeekIndex(lesson.dbDate, 8);
        if (weekIndex !== -1) {
            schedule[weekIndex].push(lesson);
        }
    }
}
console.log('schedule: ', schedule);
return schedule;
}

const getStudentData = async (privacy) => {
  // const studentData = privacy === true ? 'day, time, new_day, new_time, new_spot_start_date' : '*';
  const studentData = 'id';


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
function initializeWeeklyObjects(numWeeks) {
  let startOfWeek = startOfISOWeek(new Date());
  let weeks = [];

  for (let i = 0; i < numWeeks; i++) {
      weeks.push({
          weekOf: format(addWeeks(startOfWeek, i), 'yyyy-MM-dd'),
          lessons: []
      });
  }

  return weeks;
}
function getWeekIndex(dbDate, numWeeks) {
  let date = new Date(dbDate);
  let startOfWeek = startOfISOWeek(new Date());

  for (let i = 0; i < numWeeks; i++) {
      let weekStart = addWeeks(startOfWeek, i);
      let weekEnd = addWeeks(weekStart, 1);

      if (isWithinInterval(date, { start: weekStart, end: weekEnd })) {
          return i;
      }
  }

  return -1; // Return -1 if the date does not fall within the next 8 weeks
}


