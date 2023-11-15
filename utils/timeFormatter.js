export default function timeFormatter(timeString) {
  // Parse the time string and create a Date object
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10), parseInt(minutes, 10));

  // Format the time in 'h:mm AM/PM' format
  let hoursFormatted = date.getHours();
  const ampm = hoursFormatted >= 12 ? 'pm' : 'am';
  hoursFormatted = hoursFormatted % 12;
  hoursFormatted = hoursFormatted ? hoursFormatted : 12; // the hour '0' should be '12'

  // Minutes are unchanged, just need to ensure two digits
  const minutesFormatted = date.getMinutes().toString().padStart(2, '0');

  return `${hoursFormatted}:${minutesFormatted} ${ampm}`;
}

// Example usage
console.log(timeFormatter('19:00:00')); // Outputs: 7:00 PM
console.log(timeFormatter('08:30:00')); // Outputs: 8:30 AM
