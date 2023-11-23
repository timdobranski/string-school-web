import { supabase } from './supabase';
import getAllUpcomingLessons from './getUpcomingLessons';
import { startOfISOWeek, addWeeks, format, isWithinInterval } from 'date-fns';

export default async function getScheduleData(privacy) {
  let students = await getStudentData(privacy);
  let schedule = initializeWeeklyObjects(8);

  for (let student of students) {
    let lessons = await getUpcomingLessons(student.id);
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


// export default async function getScheduleData(privacy) {
  // Get the students data ('day', 'time', 'new_Day', "new_time", 'new_spot_Start_date') or '*' depending on privacy boolean)
  // Get the cancellations data
  // Get the makeups data

  // Get the current date

  // Create weeks array (for final return)

  // For (8 times) create a week array

    // Iterate through the students data and create an object to represent each booked spot
    // In the student data If NO new_spot_start_date, add the day/time data to the week object
      // If there IS a new spot start date, check if the start date is in the current week or in the past
      // If it is, add the new_day and new_time data to the week object as the regular day and time key values instead of regular day and time.
      // If it is not, add the regular data to the week object
    // mark type: regular or new spot depending on above

    // If cancellations that week, add day and time object and mark type: cancellation
    // If makeups that week, add to week and mark type: makeup

    // Move forward one week

    // return the weeks array
// }

// [
//   {
//       "date": "Wednesday, November 29th",
//       "day": "Wednesday",
//       "time": "7:00pm",
//       "type": "regular",
//       "dbDate": "2023-11-29"
//   },
//   {
//       "date": "Wednesday, December 6th",
//       "day": "Wednesday",
//       "time": "7:00pm",
//       "type": "regular",
//       "dbDate": "2023-12-06"
//   },
//   {
//       "date": "Wednesday, December 13th",
//       "day": "Wednesday",
//       "time": "7:00pm",
//       "type": "regular",
//       "dbDate": "2023-12-13"
//   },
//   {
//       "date": "Friday, December 15th",
//       "day": "Wednesday",
//       "time": "4:30pm",
//       "type": "makeup",
//       "note": "This gets Timmy to baseball on time",
//       "createdBy": "Tim",
//       "id": 2
//   },
//   {
//       "date": "Wednesday, December 20th",
//       "day": "Wednesday",
//       "time": "7:00pm",
//       "type": "regular",
//       "dbDate": "2023-12-20"
//   },
//   {
//       "date": "Wednesday, December 27th",
//       "day": "Wednesday",
//       "time": "7:00pm",
//       "type": "cancellation",
//       "note": "Test future cancellation",
//       "createdBy": "Tim",
//       "created_at": "2023-11-14T04:52:48.528797+00:00",
//       "id": 4
//   },
//   {
//       "date": "Monday, January 8th",
//       "day": "Wednesday",
//       "time": "8:00pm",
//       "type": "new spot",
//       "dbDate": "2024-01-08"
//   },
//   {
//       "date": "Monday, January 15th",
//       "day": "Wednesday",
//       "time": "8:00pm",
//       "type": "new spot",
//       "dbDate": "2024-01-15"
//   },
//   {
//       "date": "Monday, January 22nd",
//       "day": "Wednesday",
//       "time": "8:00pm",
//       "type": "new spot",
//       "dbDate": "2024-01-22"
//   },
//   {
//       "date": "Monday, January 29th",
//       "day": "Wednesday",
//       "time": "8:00pm",
//       "type": "new spot",
//       "dbDate": "2024-01-29"
//   },
//   {
//       "date": "Monday, February 5th",
//       "day": "Wednesday",
//       "time": "8:00pm",
//       "type": "new spot",
//       "dbDate": "2024-02-05"
//   }
// ]





