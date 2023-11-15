
// takes a number and converts it to a string of hours and minutes
export default function minutesIntoHours (number) {
  if (number < 60) {
    return number.toString() + ' mins';
  } else {
    let hours = Math.floor(number / 60);
    let minutes = number % 60;
    if (minutes === 0) {
      return hours.toString() + ' hrs';
    } else {
      return hours.toString() + ' hrs ' + minutes.toString() + ' mins';
    }
  }
}