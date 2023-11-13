import Link from 'next/link';

export default function CancellationConfirmed() {

  return (
    <div>
      <h1>Lesson Cancelled</h1>
      <p>Your lesson has been cancelled and one makeup credit has been added to your account.</p>
      <Link href='/students/home'>
        <a>Back</a>
      </Link>
    </div>
  )

};