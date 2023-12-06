import  { supabase } from './supabase';
import getAllUpcomingLessons from './getAllUpcomingLessons'

// takes a student ID and returns that student's:

// upcoming lessons and student data from getAllUpcomingLessons helper
// Contact Info for all users associated with student
// lesson logs
// progress
// payments

const getStudentData = async (studentId) => {
  try {
    // Prepare all the promises for concurrent execution
    const lessonsPromise = getAllUpcomingLessons(8, false, studentId);
    const contactsPromise = supabase.from('users').select('*').eq('student_id', studentId);
    const lessonLogsPromise = supabase.from('lessonLogs').select('*').eq('student', studentId);
    const paymentsPromise = supabase.from('payments').select('*').eq('student', studentId);
    const practicePromise = supabase.from('practiceSessions').select('*').eq('student', studentId);

    // Execute all promises concurrently
    const [lessonsResult, contactsResult, lessonLogsResult, paymentsResult, practiceResult] = await Promise.all([
      lessonsPromise,
      contactsPromise,
      lessonLogsPromise,
      paymentsPromise,
      practicePromise
    ]);

    // Check for errors in the results
    if (lessonsResult.error) throw lessonsResult.error;
    if (contactsResult.error) throw contactsResult.error;
    if (lessonLogsResult.error) throw lessonLogsResult.error;
    if (paymentsResult.error) throw paymentsResult.error;
    if (practiceResult.error) throw practiceResult.error;

    // Extract data from results
    const lessons = lessonsResult;
    const contacts = contactsResult.data;
    const lessonLogs = lessonLogsResult.data;
    const payments = paymentsResult.data;
    const practice = practiceResult.data;

    const result = {
      lessons,
      contacts,
      lessonLogs,
      payments,
      practice
    };

    console.log('getStudentData result: ', result);
    return result;
  } catch (error) {
    console.error('Error fetching student details:', error);
    throw error;
  }
};

export default getStudentData;
