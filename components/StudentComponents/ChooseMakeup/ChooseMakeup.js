import Schedule from '../../Schedule/Schedule';

export default function ChooseMakeup ({ setMakeup, setStep }) {

  const makeupHandler = (spot) => {
    if (spot.student) {
      alert('This spot is already booked. Please choose another.')
      return;
    }
    setMakeup({date: spot.date, time: spot.time, dbDate: spot.dbDate, day: spot.day})
    setStep(previous =>  previous + 1);
  }

  return (
    <>
      <h1>Choose your makeup spot</h1>
      <Schedule privacy={true} handler={makeupHandler} setMakeup={setMakeup}/>
    </>

  )
}