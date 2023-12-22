// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { supabase } from '../../../utils/supabase';
console.log("HELLO FROM EDGE FUNCTION!")

Deno.serve(async (req) => {
  const { name } = await req.json()
  const data = {
    message: `Hello ${name}!`,
  }

  // async function updateNewSpots(): Promise<void> {
  //   // Get current date in Pacific Time
  //   const currentDate = new Date().toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" });

  //   // Fetch students whose new_student_start_date is today
  //   const { data: students, error } = await supabase
  //     .from('students')
  //     .select('*')
  //     .eq('new_student_start_date', currentDate);

  //   if (error) {
  //     console.error('Error fetching students:', error);
  //     return;
  //   }

  //   // Update each student
  //   students?.forEach(async (student) => {
  //     const { error: updateError } = await supabase
  //       .from('students')
  //       .update({
  //         day: student.new_day,
  //         time: student.new_time,
  //         new_student_start_date: null,
  //         new_day: null,
  //         new_time: null
  //       })
  //       .eq('id', student.id);

  //     if (updateError) {
  //       console.error('Error updating student:', updateError);
  //     }
  //   });
  // }

  // updateNewSpots();

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/update_new_spots' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/

