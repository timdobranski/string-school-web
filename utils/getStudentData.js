import  { supabase } from './supabase';
import getAllUpcomingLessons from './getAllUpcomingLessons'
import getSkills from './getSkills';

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
    const skillsPromise = getSkills(studentId);
    const spotsPromise = supabase.from('schedule').select('*').eq('student', studentId);
    const contactsPromise = supabase.from('users').select('*').eq('student_id', studentId);
    const lessonLogsPromise = supabase.from('lessonLogs').select('*').eq('student', studentId);
    const paymentsPromise = supabase.from('payments').select('*').eq('student', studentId);
    const practicePromise = supabase.from('practiceSessions').select('*').eq('student', studentId);
    const setlistSongsPromise = supabase
      .from('setlist_songs')
      .select('*, songs (*)')
      .eq('student', studentId);
    const recentSongsPromise = supabase
      .from('recent_songs')
      .select('*, songs(*)')
      .eq('student', studentId);

    // Execute all promises concurrently
    const [
      spotsResult,
      lessonsResult,
      skillsResult,
      contactsResult,
      lessonLogsResult,
      paymentsResult,
      practiceResult,
      setlistSongsResult,
      recentSongsResult
    ] = await Promise.all([
      spotsPromise,
      lessonsPromise,
      skillsPromise,
      contactsPromise,
      lessonLogsPromise,
      paymentsPromise,
      practicePromise,
      setlistSongsPromise,
      recentSongsPromise
    ]);

    // Check for errors in the results
    if (spotsResult.error) throw spotsResult.error;
    if (lessonsResult.error) throw lessonsResult.error;
    if (skillsResult.error) throw skillsResult.error;
    if (contactsResult.error) throw contactsResult.error;
    if (lessonLogsResult.error) throw lessonLogsResult.error;
    if (paymentsResult.error) throw paymentsResult.error;
    if (practiceResult.error) throw practiceResult.error;
    if (setlistSongsResult.error) throw setlistSongsResult.error;
    if (recentSongsResult.error) throw recentSongsResult.error;

    // Extract data from results
    const spots = spotsResult.data;
    const lessons = lessonsResult;
    const skills = skillsResult;
    const contacts = contactsResult.data;
    const lessonLogs = lessonLogsResult.data;
    const payments = paymentsResult.data;
    const practice = practiceResult.data;
    const setlistSongs = setlistSongsResult.data.map(item => ({
      ...item,
      ...item.songs
    }));
    setlistSongs.forEach(item => delete item.songs);
    const recentSongs = recentSongsResult.data.map(item => ({
      ...item,
      ...item.songs
    }));
    recentSongs.forEach(item => delete item.songs);

    const result = {
      spots,
      lessons,
      skills,
      contacts,
      lessonLogs,
      payments,
      practice,
      setlistSongs,
      recentSongs
    };

    // console.log('getStudentData result: ', result);
    return result;
  } catch (error) {
    console.error('Error fetching student details:', error);
    throw error;
  }
};

export default getStudentData;
