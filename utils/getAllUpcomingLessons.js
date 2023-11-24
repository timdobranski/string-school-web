import { supabase } from './supabase';
import { parseISO, addWeeks, set, startOfDay, isValid, nextDay, parse, startOfWeek, formatISO } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';
import getScheduleDates from './getScheduleDates';


// retrieve schedule data
async function getSchedule() {
  let { data, error } = await supabase
    .from('schedule')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  return data;
}
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
    return false;
  } else if (date1 >= date2) {
    return true;
  }
}
// returns the first and last name of a student
function studentName(students, id) {
  // Use the find() method to search for the student object with the provided id
  const student = students.find(student => student.id === id);

  if (student) {
    // If a matching student is found, concatenate first_name and last_name with a space
    return `${student.first_name} ${student.last_name}`;
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

// Refactored function to get upcoming lessons for all students
export default async function getAllUpcomingLessons(numberOfLessons, privacy) {
  const schedule = await getSchedule();
  const students = await getAllStudents(privacy);
  const makeups = await getAllMakeups();
  const cancellations = await getAllCancellations();
  const mondaysArray= createDatesArray(1, numberOfLessons);
  const dbDatesArray = getScheduleDates(numberOfLessons, {format: false})
  const formattedDatesArray = getScheduleDates(numberOfLessons, {format: true, length: 'short', includeYear: false})


  // Create dates array: an array of arrays for every week day for the next n weeks
  let result = {
    students: privacy ? null : students,
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
        cellText: privacy ? 'Booked' : (spot.booked ? studentName(students, spot.student) : 'Open!'),
      }

      // First check if schedule spot has new_Student_Start_Date && we have already reached that week
      if (spot.new_student_start_date && dateIsPast(dbDatesArray[weekIndex][0], spot.new_student_start_date)) {
        spotData.type = 'new spot';
        spotData.student = studentName(students, spot.new_student);
        spotData.cellText = privacy ? 'Booked' : studentName(students, spot.new_student);
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
      spotData.type = spotData.type.charAt(0).toUpperCase() + spotData.type.slice(1);
      result.schedule[weekIndex].push(spotData)
    })
  })
  // console.log('schedule data refactor results: ', result)
  return result;
}





// const privacy = false;
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










// FIRST: ITERATE THROUGH STUDENT DATA AND ADD REGULAR/NEW SPOT LESSONS.
// SECOND: ADD CANCELLATIONS
// students.forEach(student => {
//   // Creates an array of dates for the next n occurrences of the student's regular day
//   const upcomingRegularDates = createDatesArray(getDayNumber(student.day), numberOfLessons);

//   // If NO new_spot_start_date, add the day/time data to the week object
//   if (!student.new_spot_start_date ) {
//     for (var i = 0; i < result.schedule.length; i++) {

//       // boolean flag to determine if the current week's lesson is cancelled already
//       const isCancelled = cancellations.some(cancellation => {
//         return (upcomingRegularDates[i] === (cancellation.date)
//           && cancellation.time === student.time)
//       }
//       );
//       if(!isCancelled) {
//         result.schedule[i].push({
//           student: privacy ? null : student.id, booked: true, type: 'regular', day: student.day, time: student.time
//         });
//       } else {
//         result.schedule[i].push({
//           student: privacy ? null : student.id, booked: false, type: 'cancellation', day: student.day, time: student.time
//         });
//       }
//     }
//   }
// });
// // THIRD: UPDATE MAKEUPS (add to wee with booked = true and type = makeup)
// const timeZone = 'America/Los_Angeles';
// const mondaysArrayDates = mondaysArray.map(dateStr =>
//   utcToZonedTime(zonedTimeToUtc(dateStr, timeZone), timeZone)
// );

// makeups.forEach(makeup => {
//   // Parse the date and get the day of the week
//   const makeupDate = utcToZonedTime(zonedTimeToUtc(makeup.date, timeZone), timeZone);
//   const dayOfWeek = makeupDate.getDay();

//   // Map dayOfWeek to a string (e.g., 'Monday', 'Tuesday', ...)
//   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const dayString = days[dayOfWeek];

//   // Create the object to be pushed
//   const makeupEntry = {
//     student: privacy ? null : makeup.student,
//     booked: true,
//     type: 'makeup',
//     day: dayString,
//     time: makeup.time
//   };

//   let targetArrayIndex = -1;

//   for (let i = 0; i < mondaysArrayDates.length; i++) {
//     if (makeupDate >= mondaysArrayDates[i] && (i === mondaysArrayDates.length - 1 || makeupDate < mondaysArrayDates[i + 1])) {
//       targetArrayIndex = i;
//       break;
//     }
//   }
//   if (targetArrayIndex !== -1) {
//     result.schedule[targetArrayIndex].push(makeupEntry);
//   }
// })
// // !!!!!!!!!!!!!!!!If there IS a new spot start date, check if the start date is in the current week or in the past
// return result;
// }
