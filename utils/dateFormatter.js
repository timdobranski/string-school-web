
// takes a supabase date format and converts it to 'Nov 5, 2023' format
export default function formatDate(dateString, formatOptions = {}) {
  // Assuming dateString is in the format 'YYYY-MM-DD'
  const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));

  // Construct a Date object without converting to the local time zone
  const date = new Date(year, month - 1, day);

  // Set the time to noon UTC to avoid any DST changes
  date.setUTCHours(12);

  // Determine the date format based on provided options
  const options = {};
  if (formatOptions.includeYear !== false) {
    options.year = 'numeric';
  }
  options.day = 'numeric';
  options.month = formatOptions.length === 'short' ? 'short' : 'long';

  if (formatOptions.includeDay) {
    options.weekday = formatOptions.length === 'short' ? 'short' : 'long';
  }

  // Format the date
  return date.toLocaleDateString('en-US', options).replace(/(\d+)(st|nd|rd|th)/, '$1');
}

// options: {
//   length: [short, long]
//   includeDay: [true, false]
//   includeYear: [true, false]
// }