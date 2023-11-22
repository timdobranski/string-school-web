import dateFormatted from './dateFormatter';

export default function upcomingWeeks(numWeeks) {
  let today = new Date();
  let dayOfWeek = today.getDay();
  // Adjust for Sunday being 0
  let mondayOffset = (dayOfWeek === 0 ? -7 : 0) - dayOfWeek;

  // Set to the most recent Monday
  let currentMonday = new Date(today);
  currentMonday.setDate(today.getDate() + mondayOffset);

  let weeks = [];

  for (let i = 0; i < numWeeks; i++) {
      let sunday = new Date(currentMonday);
      sunday.setDate(sunday.getDate() + 6);

      weeks.push([formatDate(currentMonday), formatDate(sunday)]);
      currentMonday.setDate(currentMonday.getDate() + 7);
  }

  return weeks;
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}
