import dateFormatter from './dateFormatter';

// Returns an array of arrays containing the dates for the next numWeeks weeks
// formatOptions: { format: true || false, length: 'short || 'long', includeYear: true || false }
export default function getScheduleDates(numWeeks, formatOptions) {
  let today = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));

  // Reset the hours to start of the day to avoid any DST issues
  today.setHours(0, 0, 0, 0);

  let dayOfWeek = today.getDay();

  // Calculate mondayOffset such that it always results in the previous Monday
  let mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  let currentMonday = new Date(today);
  currentMonday.setDate(today.getDate() + mondayOffset);

  let weeks = [];

  for (let i = 0; i < numWeeks; i++) {
    let week = [];
    for (let j = 0; j < 7; j++) {
      if (j !== 5) { // Skip Saturday (5th day of the week starting from Monday)
        let day = new Date(currentMonday);
        day.setDate(day.getDate() + j);
        if (formatOptions.format) {
          week.push(dateFormatter(toISOStringDate(day), formatOptions)); // Format each day
        } else {
          week.push(toISOStringDate(day)); // Don't format each day
        }
      }
    }
    weeks.push(week);
    // Move to next Monday
    currentMonday.setDate(currentMonday.getDate() + 7);
  }
  return weeks;
}

// Helper function to convert Date object to 'YYYY-MM-DD' string
function toISOStringDate(date) {
  // Convert the date to Pacific Time before formatting it
  let pacificDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  pacificDate.setHours(0, 0, 0, 0); // Reset hours to avoid DST issues
  return pacificDate.toISOString().split('T')[0];
}