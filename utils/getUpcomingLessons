import { supabase } from './supabase';
import { format, parseISO, addWeeks, set, getDay, startOfDay, isValid, nextDay, parse } from 'date-fns';


// retrieves an array of a student's upcoming lessons
// makeups and cancellations are included first
// then regular lessons are added by calculating from the student's regular day/time
// takes a student id, and a number of lessons. Cancellations don't count toward the number,
// but are still returned anyway.

// sample output: [{date, time, type, note, createdBy, id, }]...

export default async function getUpcomingLessons(studentId, numberOfLessons) {

    async function getStudentData(studentId) {
        let { data, error } = await supabase
            .from('students')
            .select('*')
            .eq('id', studentId)
            .single();

        if (error) throw error;
        return data;
    }
    function isFutureDate(dateStr, timeStr) {
        const now = new Date();
        const dateTimeStr = `${dateStr} ${timeStr}`; // Combine date and time
        const formatStr = 'yyyy-MM-dd h:mma'; // Specify the format
        // Parse the combined date and time string
        const lessonDate = parse(dateTimeStr, formatStr, new Date());
        return lessonDate > now;
    }


    async function getCancellations(studentId) {
        let { data, error } = await supabase
            .from('cancellations')
            .select('*, users(first_name)')
            .eq('student', studentId);

        if (error) throw error;
        return data.filter(cancellation => isFutureDate(cancellation.date, cancellation.time));
    }

    async function getMakeups(studentId) {
        let { data, error } = await supabase
            .from('makeups')
            .select('*, users(first_name)')
            .eq('student', studentId);

        if (error) throw error;
        return data.filter(makeup => isFutureDate(makeup.date, makeup.time));
    }

    function getDayNumber(dayString) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return daysOfWeek.indexOf(dayString);
    }
    // Calculate the date of the next n lessons depending on how many are needed minus makeups
    function calculateRegularLessons(studentData, numberOfLessons, cancellationSet) {
      const regularDay = getDayNumber(studentData.day);
      const regularTime = studentData.time; // Assuming format like "15:00"
      const newDay = studentData.new_day ? getDayNumber(studentData.new_day) : null;
      const newTime = studentData.new_time;
      const newStart = studentData.new_spot_start_date ? parseISO(studentData.new_spot_start_date) : null;

      let lessons = [];
      let currentDate = startOfDay(new Date()); // Start from today

      let nextLessonDate = nextDay(currentDate, regularDay);
      nextLessonDate = set(nextLessonDate, {
          hours: parseInt(regularTime.split(':')[0]),
          minutes: parseInt(regularTime.split(':')[1]),
          seconds: 0,
          milliseconds: 0
      });

      let isUsingNewSchedule = false;

      while (lessons.length < numberOfLessons) {
          let lessonDay = isUsingNewSchedule ? newDay : regularDay;
          let lessonTime = isUsingNewSchedule ? newTime : regularTime;
          let lessonType = isUsingNewSchedule ? 'new spot' : 'regular';

          if (newStart && nextLessonDate >= newStart && !isUsingNewSchedule) {
              isUsingNewSchedule = true;
              lessonDay = newDay !== null ? newDay : lessonDay;
              lessonTime = newTime || lessonTime;
              lessonType = 'new spot';
              // Adjust nextLessonDate to the new schedule
              nextLessonDate = nextDay(startOfDay(nextLessonDate), lessonDay);
          }

          nextLessonDate = set(nextLessonDate, {
              hours: parseInt(lessonTime.split(':')[0]),
              minutes: parseInt(lessonTime.split(':')[1]),
              seconds: 0,
              milliseconds: 0
          });

          const lessonDateTimeString = `${format(nextLessonDate, "yyyy-MM-dd")}-${lessonTime}`;

          if (!cancellationSet.has(lessonDateTimeString)) {
              lessons.push({ date: nextLessonDate, day: studentData.day, time: lessonTime, type: lessonType });
          }

          // Move to the next week
          nextLessonDate = addWeeks(startOfDay(nextLessonDate), 1);
      }

      return lessons;
  }

  function formatDate(dateInput) {
    // Check if the input is a string or a Date object
    let date;
    if (typeof dateInput === 'string') {
        // Parse the string into a Date object
        date = parseISO(dateInput);
    } else if (dateInput instanceof Date) {
        // Use the Date object as-is
        date = dateInput;
    } else {
        console.error('Invalid date input:', dateInput);
        return 'Invalid Date';
    }

    // Check if the date is valid
    if (!isValid(date)) {
        console.error('Invalid date after parsing:', dateInput, date);
        return 'Invalid Date';
    }

    try {
        // Format the date
        return format(date, "EEEE, MMMM do");
    } catch (error) {
        console.error('Error formatting date:', dateInput, date, error);
        return 'Error in Date Format';
    }
}

    function sortLessonsByDate(lessons) {
      return lessons.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    async function createObjects(studentId, number) {
      const studentData = await getStudentData(studentId);
      const cancellations = await getCancellations(studentId);
      const makeups = await getMakeups(studentId);
      // const regularLessons = calculateRegularLessons(studentData, number);
      const cancellationSet = new Set(cancellations.map(c => `${c.date}-${c.time}`));
      const numberOfRegularLessons = number - makeups.length;
      const regularLessons = calculateRegularLessons(studentData, numberOfRegularLessons, cancellationSet);

      let lessons = [];

      // Add cancellations with type
      cancellations.forEach(cancellation => {
        // console.log('cancellation inside forEach: ', cancellation)
          lessons.push({
              date: cancellation.date,
              time: cancellation.time,
              type: 'cancellation',
              note: cancellation.note,
              createdBy: cancellation.users.first_name,
              created_at: cancellation.created_at,
              id: cancellation.id
          });
      });

      // Add makeups with type
      makeups.forEach(makeup => {
          lessons.push({
              date: makeup.date,
              time: makeup.time,
              type: 'makeup',
              note: makeup.note,
              createdBy: makeup.users.first_name,
              id: makeup.id
          });
      });

      // Add regular lessons with type
      regularLessons.forEach(lesson => {
        // Format the date in 'YYYY-MM-DD' format for the database
        const dbDate = format(lesson.date, "yyyy-MM-dd");

        lessons.push({
            ...lesson,
            dbDate, // Add this formatted date for database use
            type: lesson.type,
        });
    });
      // Sort lessons by date
      lessons = sortLessonsByDate(lessons);

      // console.log('lessons: ', lessons);
      // Format lessons and return
      return lessons.map(lesson => ({
          date: formatDate(lesson.date),
          day: lesson.day || studentData.day, // Use studentData.day if lesson.day is undefined
          time: lesson.time,
          type: lesson.type,
          note: lesson.note,
          createdBy: lesson.createdBy,
          created_at: lesson.created_at,
          id: lesson.id,
          dbDate: lesson.dbDate
      }));
  }

    return await createObjects(studentId, numberOfLessons);
}