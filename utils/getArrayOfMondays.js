export default function upcomingWeeks(numWeeks) {
  let today = new Date();
  let dayOfWeek = today.getDay();
  // Adjust for Sunday being 0
  let mondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;

  // Set to the most recent Monday
  let currentMonday = new Date(today);
  currentMonday.setDate(today.getDate() + mondayOffset);

  let weeks = [];

  for (let i = 0; i < numWeeks; i++) {
    let week = [];
    for (let j = 0; j < 7; j++) { // 7 days in a week
      let day = new Date(currentMonday);
      day.setDate(day.getDate() + j);
      week.push(formatDate(day));
    }
    weeks.push(week);
    currentMonday.setDate(currentMonday.getDate() + 7); // Move to next Monday
  }

  console.log('weeks: ', weeks);
  return weeks;
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}