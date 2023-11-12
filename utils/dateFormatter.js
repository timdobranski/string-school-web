export default function formatDate(dateString) {
  // Assuming dateString is in the format 'YYYY-MM-DD'
  const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));

  // Construct a Date object without converting to the local time zone
  const date = new Date(year, month - 1, day);

  // Set the time to noon UTC to avoid any DST changes
  date.setUTCHours(12);

  // Format the date
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options).replace(/(\d+)(st|nd|rd|th)/, '$1');
}