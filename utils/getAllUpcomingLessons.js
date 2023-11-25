import { supabase } from './supabase';
import { parseISO, addWeeks, set, startOfDay, isValid, nextDay, parse, startOfWeek, formatISO } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';
import getScheduleDates from './getScheduleDates';

// HELPERS

// retrieve schedule data
async function getSchedule(studentId) {
  let query = supabase
    .from('schedule')
    .select('*')
    .order('id', { ascending: true });

  if (studentId) {
    query = query.or(`student.eq.${studentId},new_student.eq.${studentId}`);
  }

  let { data, error } = await query;

  if (error) throw error;
  return data;
}

// Function to retrieve all students' data - either private or public based on boolean argument
async function getAllStudents(privacy, studentId) {
  const studentData = privacy === true ? 'day, time, new_day, new_time, new_spot_start_date' : '*';

  let { data, error } = await supabase
    .from('students')
    .select(studentData)
    .match(studentId ? { id: studentId } : {});
  if (error) throw error;
  return data;
}
// Function to retrieve all makeups scheduled for today or later
async function getAllMakeups() {
  const today = new Date().toISOString().split('T')[0];

  let { data, error } = await supabase
    .from('makeups')
    .select('*')
    .gte('date', today);
  if (error) throw error;
  return data;
}
// Function to retrieve all cancellations scheduled for today or later
async function getAllCancellations() {
  const today = new Date().toISOString().split('T')[0];

  let { data, error } = await supabase
    .from('cancellations')
    .select('*')
    .gte('date', today);
  if (error) throw error;
  return data;
}
// Creates an array of dates for the next n occurrences of the specified day of the week
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
// returns the index for the given weekday
function dayIndex(dayString) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'];
  return daysOfWeek.indexOf(dayString);
}
// checks if a given date is past another date or not
function dateIsPast(currentDate, startDate) {
  var date1 = new Date(currentDate);
  var date2 = new Date(startDate);

  // Compare the dates
  if (date1 < date2) {

    return true;
  } else if (date1 >= date2) {

    return false;
  }
}
// returns the first and last name of a student
function studentName(students, id) {
  // Use the find() method to search for the student object with the provided id
  const student = students.find(student => student.id === id);

  if (student) {
    // If a matching student is found, return name (first + last, or just first if no last found)
    return `${student.first_name} ${student.last_name || ''}`.trim();
  } else {
    // If no matching student is found, return a message or an empty string
    return 'Student not found'; // You can customize this message
  }
}
// functions to determine if current spot is a cancellation
function isCancellation(cancellations, inputDate, inputTime) {
  return cancellations.some(cancellation => cancellation.date === inputDate && cancellation.time === inputTime);
}
// function to determine if current spot is a makeup. Returns array of boolean, and then makeup data if so
function makeupChecker(makeups, inputDate, inputTime) {
  const result = makeups.some(makeup => makeup.date === inputDate && makeup.time === inputTime);

  if (result) {
    const makeupData = makeups.find(makeup => makeup.date === inputDate && makeup.time === inputTime);
    return {isMakeup: true, data: makeupData};
  } else {
    return {isMakeup: false, data: null};
  }
}
function formatScheduleIntoList(schedule) {
  const result = [];
  schedule.forEach(week => {
    console.log('week inside formatScheduleIntoList: ', week)
    for (var spotKey in week) {
      if (week.hasOwnProperty(spotKey)) {
        const spot = week[spotKey];
        spot.className = spot.type;
        result.push(spot);
      }
    }
  });
  return result;
}

// Get Upcoming Schedule Data for several weeks
export default async function getAllUpcomingLessons(numberOfLessons, privacy, studentId) {
  const schedule = await getSchedule(studentId);
  const students = await getAllStudents(privacy, studentId);
  const makeups = await getAllMakeups();
  const cancellations = await getAllCancellations();
  const mondaysArray= createDatesArray(1, numberOfLessons);
  const dbDatesArray = getScheduleDates(numberOfLessons, {format: false})
  const formattedDatesArray = getScheduleDates(numberOfLessons, {format: true, length: 'short', includeYear: false})


  // Create dates array: an array of arrays for every week day for the next n weeks
  let result = {
    students: students,
    schedule: [
      [], [] ,[] ,[] ,[] ,[] ,[] ,[]
    ]
  };
  // For each week array, iterate through the schedule data
  result.schedule.forEach((week, weekIndex) => {
    schedule.forEach((spot, spotIndex) => {
      // Starting data for return before considering cancellations, makeups, or new spots
      const spotData = {
        day: spot.day,
        date : formattedDatesArray[weekIndex][dayIndex(spot.day)],
        dbDate: dbDatesArray[weekIndex][dayIndex(spot.day)],
        time: spot.time,
        student: spot.student,
        type: spot.booked ? 'regular' : 'open',
        cellText: spot.booked ? (privacy ? 'Booked' : studentName(students, spot.student)) : 'Open!',
      }

      // First check if schedule spot has new_Student_Start_Date && we have already reached that week
      if (spot.new_student_start_date && !(dateIsPast(dbDatesArray[weekIndex][0], spot.new_student_start_date))) {
        spotData.type = 'regular';
        spotData.student = spot.new_student;
        spotData.cellText = privacy ? 'Booked' : studentName(students, spot.new_student);
      }
      // Next check if schedule spot has new_Student_Start_Date && we have NOT yet reached that week (flag for skip)
      if (spot.new_student_start_date && dateIsPast(dbDatesArray[weekIndex][0], spot.new_student_start_date)) {
        spotData.type = 'futureSpot';
      }
      // Check if spot is a cancellation
      if (isCancellation(cancellations, dbDatesArray[weekIndex][dayIndex(spot.day)], spot.time)) {
        spotData.type = 'cancellation';
        spotData.cellText = 'Open this week';
      }
      // Check if spot is a makeup, and override cancellation if so
      const checkForMakeup = makeupChecker(makeups, dbDatesArray[weekIndex][dayIndex(spot.day)], spot.time)
      if (checkForMakeup.isMakeup){
        spotData.type = 'makeup';
        spotData.student = checkForMakeup.data.student;
        spotData.cellText = privacy ? 'Booked' : studentName(students, checkForMakeup.data.student);
      }

      spotData.className = spotData.day.charAt(0).toLowerCase() + spotData.day.slice(1) + spotData.type.charAt(0).toUpperCase() + spotData.type.slice(1);

      // Next check if schedule spot has new_Student_Start_Date && we have NOT yet reached that week (skip)
      if (!studentId) {
        result.schedule[weekIndex].push(spotData)
      } else {
        if (spotdata.type !== 'futureSpot' && spotData.type !== 'open') {
          result.schedule[weekIndex].push(spotData)
        }
      }

    })
  })
  // If a student id is provided, format the schedule into a list
  if (studentId) {
    result.schedule = formatScheduleIntoList(result.schedule)
  }
  return result;
}






// const example = {
//   students: {studentid: 'student data'},
//   schedule:
//     [
//       [ // week array
//         {
//           day: 'Monday',
//           date : 'Nov 20',
//           dbDate: '2023-11-20',
//           time: '4:00pm',
//           student: 21,
//           type: 'regular', // open, regular, makeup, cancellation, new spot
//           cellText: privacy ? 'Booked' : 'student name',
//           className: `${day}${type}`
//         }

//       ]
//     ]
// }

