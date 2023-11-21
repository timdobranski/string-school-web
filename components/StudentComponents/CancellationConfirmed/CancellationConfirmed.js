import Link from 'next/link';
import { supabase } from '../../../utils/supabase';

export default function CancellationConfirmed({ cancellation }) {

  let confirmMessage;

  if (cancellation.type === 'regular' || cancellation.type === 'new spot' || cancellation.type === 'makeup') {
    confirmMessage = (
      <div>
        <h1>Lesson Cancelled</h1>
        <p>{`Your lesson on ${cancellation.dateString} at ${cancellation.time} has been cancelled and one makeup credit has been added to your account.`}</p>
      </div>
    )
  } else if (cancellation.type === 'cancellation') {

      confirmMessage = (
        <div>
          <h1>Cancellation Reversed</h1>
          <p>{`Your cancelled lesson on ${cancellation.dateString} at ${cancellation.time} has been reversed. `}</p>
        </div>
      )
  }

  return (
    <div>
      {confirmMessage}
      <Link href='/students/home'>
        <p>Home</p>
      </Link>
    </div>
  )
};