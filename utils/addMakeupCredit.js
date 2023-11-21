import { supabase } from './supabase';

// takes in the student object and adds a makeup credit to the student's account
const addMakeupCredit = async (student) => {
  console.log('student:', student);
  const id = student.id;
  try {
    // Fetch the current number of makeups
    let { data: studentData, error: fetchError } = await supabase
      .from('students')
      .select('makeups')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    console.log('studentData: ', studentData);
    // Increment the makeups
    const newMakeups = studentData.makeups + 1;
    console.log('newmakeups: ', newMakeups);
    // Update the makeups value
    const { data: updateData, error: updateError } = await supabase
      .from('students')
      .update({ makeups: newMakeups })
      .match({ id: student.id });

    if (updateError) throw updateError;

    console.log('Makeup credit added:', updateData);
    return updateData;
  } catch (error) {
    console.error('Error adding makeup credit:', error);
  }
};

export default addMakeupCredit;