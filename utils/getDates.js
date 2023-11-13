import { supabase } from './supabase';


// helper function for the populateScheduleDates function
const getDates = {
  upcoming: (spot, n, options) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const spotDayIndex = daysOfWeek.indexOf(spot.day);

    let newSpotDayIndex, newSpotTime;
    if (options && options.newSpot && options.newSpot.day && options.newSpot.time && options.newSpot.startDate) {
      newSpotTime = options.newSpot.time.toLowerCase();
      newSpotDayIndex = daysOfWeek.indexOf(options.newSpot.day);
    }

    const now = new Date();
    const currentDayIndex = now.getDay();

    let daysToAdd = (spotDayIndex + 7 - currentDayIndex) % 7;

    if (daysToAdd === 0 && now.toLocaleTimeString().toLowerCase() > newSpotTime) {
      daysToAdd = 7;
    }

    const nextInstances = [];
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + daysToAdd);

    for (let i = 0; i < n; ) {
      const instanceDate = new Date(currentDate);

      let instanceDayIndex, instanceTime, instanceString, instanceType, instanceNote;

      instanceType = "regular";

      if(options && options.cancellations && options.cancellations.length > 0){
        console.log('cancellations found: ', options.cancellations[0])
        const cancellation = options.cancellations.find(cancellation => {
          console.log('cancellation.date: ', cancellation.date);
          console.log('instanceDate.toISOString().slice(0,10): ', instanceDate.toISOString().slice(0,10));
          console.log('cancellation.time: ', cancellation.time);
          console.log('spot.time: ', spot.time);
          cancellation.date === instanceDate.toISOString().slice(0,10) && cancellation.time === spot.time
        }

        );
        if(cancellation) {
          instanceType = "cancellation";
          instanceNote = cancellation.note;
        }
      }
      // handle upcoming new spot change, if applicable
      if (options && options.newSpot && options.newSpot.startDate) {
        const startDate = new Date(options.newSpot.startDate);
        if (instanceDate >= startDate && newSpotDayIndex !== undefined && newSpotTime) {
          instanceDayIndex = newSpotDayIndex;
          instanceTime = newSpotTime;
        } else {
          instanceDayIndex = spotDayIndex;
          instanceTime = spot.time;
        }
      } else {
        instanceDayIndex = spotDayIndex;
        instanceTime = spot.time;
      }

      instanceString = `${daysOfWeek[instanceDayIndex]}, ${instanceDate.toLocaleString('default', { month: 'long' })} ${instanceDate.getDate()} @ ${instanceTime.endsWith('pm') || instanceTime.endsWith('am') ? instanceTime : (instanceTime + 'pm')}`;

      nextInstances.push({
        string: instanceString,
        day: daysOfWeek[instanceDayIndex],
        time: instanceTime,
        date: instanceDate,
        type: instanceType,
        note: instanceNote
      });

      currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
      i++; // Only increment counter if a non-cancelled spot is added
    }

    // Add makeups
    if(options && options.makeups && options.makeups.length > 0) {
      options.makeups.forEach(makeup => {
        const [year, month, day] = makeup.date.split('-').map(Number);
        // Create a new date object without timezone correction
        const makeupDate = new Date(Date.UTC(year, month - 1, day));
        const makeupTime = makeup.time;
        const dateString = `${daysOfWeek[makeupDate.getUTCDay()]}, ${makeupDate.toLocaleString('default', { month: 'long' })} ${makeupDate.getUTCDate()} @ ${makeupTime.endsWith('pm') || makeupTime.endsWith('am') ? makeupTime : (makeupTime + 'pm')}`;
        const insertIndex = nextInstances.findIndex(instance => instance.date > makeupDate);
        const makeupInstance = {
          string: dateString,
          day: daysOfWeek[makeupDate.getUTCDay()],
          time: makeupTime,
          date: makeupDate,
          type: 'makeup',
          note: makeup.note
        };
        if (insertIndex === -1) {
          nextInstances.push(makeupInstance);
        } else {
          nextInstances.splice(insertIndex, 0, makeupInstance);
        }
      });
    }

    return nextInstances;
  },

  removeCancellations: (dates, cancellations) => {

  }
};

// Sets a list of upcoming lessons, given a student id, a number of dates to return, and a setter function
const populateScheduleDates = async (student, numberOfDates, setter) => {
  // Get the student's spot, check for new spot
  const { data, er } = await supabase
    .from('students')
    .select('*')
    .eq('id', student.id)

  if (er) {
    console.error('Error getting day/time in SchedulingCard: ', er);
    return;
  }
  // get upcoming cancellations
  const { data: cancellationData, er: cancellationEr } = await supabase
    .from('cancellations')
    .select('*')
    .eq('student', student.id)

  if (cancellationEr) {
    console.error('Error getting cancellations data: ', cancellationEr);
    return;
  }
  // get upcoming makeups
  const { data: makeupData, er: makeupEr } = await supabase
    .from('makeups')
    .select('*')
    .eq('student', student.id)

  if (makeupEr) {
    console.error('Error getting makeup data: ', makeupEr);
    return;
  }
    console.log('studentdata: ', data)
    console.log('cancellationData: ', cancellationData)
    console.log('makeupData: ', makeupData)

      // Format spot and newSpot if necessary for the getDates function
    const spot = { day: data[0].day, time: data[0].time };
    const options = {
      cancellations: null,
      makeups: null,
      newSpot: null
    }
    if (data[0].new_day) {
      options.newSpot = { day: data[0].new_day, time: data[0].new_time, startDate: data[0].new_spot_start_date };
    }
    if (cancellationData) {
      options.cancellations = cancellationData;
    }
    if (makeupData) {
      options.makeups = makeupData;
    }
    console.log('options: ', options);
  // Call getDates with spot and newSpot
    const dates = getDates.upcoming(spot, numberOfDates, options);
    console.log('dates: ', dates);
  // Set scheduleDates state
    setter(dates);
    }


export default populateScheduleDates;