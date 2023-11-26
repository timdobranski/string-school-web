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
    query = supabase
      .from('schedule')
      .select('*')
      .or(`student.eq.${studentId},new_student.eq.${studentId}`)
      .order('id', { ascending: true });
  }

  let { data, error } = await query;
  console.log('getSchedule returns(with studentId=', studentId, ': ',  data);
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
  // console.log('schedule inside formatScheduleIntoList: ', schedule)
  const result = [];
  schedule.forEach(week => {
    // console.log('week inside formatScheduleIntoList: ', week)
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
  // Keep track of spots (key) with a new student start date and their corresponding removed spot (value)
  const switchSpotsTracker = {};
  // ex. key is the new spot, value is the old spot
  // {
  //   31: {oldSpot: 30, changeDate: '2021-12-06'},
  // }


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
        type: spot.student ? 'regular' : 'open',
        cellText: spot.student ? (privacy ? 'Booked' : studentName(students, spot.student)) : 'Open!',
      }

      // If the current spot has a new spot start date add it to the switchSpotsTracker(WORKS)
      if (spot.new_student_start_date ) {
        if (!switchSpotsTracker[spot.id]) { switchSpotsTracker[spot.id] = {oldSpot: spot.new_spot_replaces, changeDate: spot.new_student_start_date} };
      }

      // Check if this is a new spot, and we've reached its start week (WORKS)
      if (switchSpotsTracker[spot.id] && dateIsPast(dbDatesArray[weekIndex][5], switchSpotsTracker[spot.id].changeDate)) {
        spotData.type = 'regular';
        spotData.student = spot.new_student;
        spotData.cellText = privacy ? 'Booked' : studentName(students, spot.new_student);
      }
      const currentDate = formattedDatesArray[weekIndex][dayIndex(spot.day)];
      if (currentDate === 'Dec 29' && spot.id === 32) {
        // debugger;
      }
      console.log('siwtchSpotTracker[spot.id]: ', switchSpotsTracker[spot.id])
      // Check if this is an old spot for any other spot, and we've reached its end week
      let foundKey = null;
      for (const [key, value] of Object.entries(switchSpotsTracker)) {
        if (value.oldSpot === spot.id) {
          foundKey = key;
          break; // Exit the loop once the key is found
        }
      }

      if (foundKey && dateIsPast(dbDatesArray[weekIndex][5], switchSpotsTracker[foundKey].changeDate)) {
        spotData.type = 'open';
        spotData.student = null;
        spotData.cellText = 'Open!';
      }


      // // Next check if it's a future spot and we HAVEN'T reached that week (if so, flag it)
      // if (spot.new_student_start_date && dateIsPast(dbDatesArray[weekIndex][0], spot.new_student_start_date)) {
      //   spotData.type = 'futureSpot';
      // }


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
      // Now that the type has been determined, assign a corresponding className
      spotData.className = spotData.day.charAt(0).toLowerCase() + spotData.day.slice(1) + spotData.type.charAt(0).toUpperCase() + spotData.type.slice(1);

      if (spot.id ===  31) {
        console.log('spot being iterated over: ', spot);
        console.log('spotData added to return: ', spotData);
      }
      // If this is for the schedule
      if (!studentId) {
        result.schedule[weekIndex].push(spotData)
      } else {
        // If this is for a student
        if (spotData.type !== 'futureSpot' && spotData.type !== 'pastSpot' && spotData.type !== 'open') {
          result.schedule[weekIndex].push(spotData)
        }
      }

    })

  })
  // If a student id is provided, format the schedule into a list
  if (studentId) {
    result.schedule = formatScheduleIntoList(result.schedule)
  }
  console.log('final result: ', result);
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

