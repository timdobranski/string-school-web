import { supabase } from './supabase';
import { format, parseISO, addWeeks, set, startOfDay, isValid, nextDay, parse, startOfWeek, formatISO } from 'date-fns';

// Function to retrieve all students' data - either private or public based on boolean argument
async function getAllStudents(privacy) {
  const studentData = privacy === true ? 'day, time, new_day, new_time, new_spot_start_date' : '*';

    let { data, error } = await supabase
        .from('students')
        .select(studentData);
    if (error) throw error;
    return data;
}
// Function to retrieve all makeups
async function getAllMakeups() {
    let { data, error } = await supabase
        .from('makeups')
        .select('*');
    if (error) throw error;
    return data;
}
// Function to retrieve all cancellations
async function getAllCancellations() {
    let { data, error } = await supabase
        .from('cancellations')
        .select('*');
    if (error) throw error;
    return data;
}
function createDatesArray(dayOfWeek, count) {
  if (count < 0) {
      throw new Error("Count must be a non-negative number.");
  }
  const days = [];
  const today = new Date();
  // Find the most recent occurrence of the specified day
  let mostRecentDay = startOfWeek(today, { weekStartsOn: dayOfWeek });
  if (mostRecentDay > today) {
      // If the calculated day is in the future, move one week back
      mostRecentDay = addWeeks(mostRecentDay, -1);
  }

  for (let i = 0; i < count; i++) {
      const nextDayDate = addWeeks(mostRecentDay, i);
      days.push(formatISO(nextDayDate, { representation: 'date' })); // Formats the date as 'YYYY-MM-DD'
  }

  return days;
}
function getDayNumber(dayString) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek.indexOf(dayString);
}
// Refactored function to get upcoming lessons for all students
export default async function getAllUpcomingLessons(numberOfLessons, privacy) {
    const students = await getAllStudents(privacy);
    const makeups = await getAllMakeups();
    const cancellations = await getAllCancellations();
    const mondaysArray= createDatesArray(1, numberOfLessons);

    // Create a result object with student data and an empty array for each week
    let result = {
      students: students,
      schedule: [
        [], [] ,[] ,[] ,[] ,[] ,[] ,[]
      ]
    };


    // FIRST: ITERATE THROUGH STUDENT DATA AND ADD REGULAR/NEW SPOT LESSONS
    students.forEach(student => {
      const upcomingRegularDates = createDatesArray(getDayNumber(student.day), numberOfLessons);
        console.log('student day: ', student.day)
        console.log('upcomingRegularDates: ', upcomingRegularDates);


      // If NO new_spot_start_date, add the day/time data to the week object
      if (!student.new_spot_start_date ) {
        for (var i = 0; i < result.schedule.length; i++) {

          // boolean flag to determine if the current week's lesson is cancelled already
          const isCancelled = cancellations.some(cancellation => {
            return (upcomingRegularDates[i] === (cancellation.date)
            && cancellation.time === student.time)
          }
          );
          if(!isCancelled) {
            result.schedule[i].push({
               student: student.id, booked: true, type: 'regular', day: student.day, time: student.time
            });
          } else {
            result.schedule[i].push({
              student: student.id, booked: false, type: 'cancellation', day: student.day, time: student.time
            });
          }


        }
      }
    });
    makeups.forEach(makeup => {

    })
    // !!!!!!!!!!!!!!!!If there IS a new spot start date, check if the start date is in the current week or in the past


    // THIRD: UPDATE MAKEUPS (add to wee with booked = true and type = makeup)

    // console.log('cancellations data:', cancellations);
    // console.log('result: ', result);
    return result;
  }




  const example = {
    students: {studentid: 'student data'},
    schedule:
      [
        [
          { day: 'day', time: 'time', student: 'student id', booked: true, type: 'regular'},
          { day: 'day', time: 'time', student: 'student id', booked: true, type: 'makeup'},
          { day: 'day', time: 'time', student: 'student id', booked: true, type: 'cancellation'}
        ]
      ]
  }




  // console.log('students data:', students);
  // console.log('makeups data:', makeups);
  // console.log('mondays array: ', mondaysArray);