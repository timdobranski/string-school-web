

export default function Resources() {
  return (
    <div className='infoCard'>
      <h1 className='sectionHeaders'>Resources</h1>
      <a href='https://drive.google.com/file/d/1FGTRea0Hl99xproEFarB6yReLMpr62E0/view?usp=drive_link'>
        <h2 className='featureHeaders'>Lesson Textbook</h2>
      </a>
      <p className='featureComments'>View or Download the Textbook in PDF format</p>

      <h2 className='featureHeaders'>Lesson Videos</h2>
      <p className='featureComments'>Helpful Videos on a Variety of Musical Topics</p>

      <h2 className='featureHeaders'>Interactive Textbook</h2>
      <p className='featureComments'>Coming 2024</p>
      <p className='text'>{`This will be an online refresh of the textbook with quizzes, audio examples,
      and videos built into each lesson.`}</p>
      <p className='text'> {`It will be very similar to the 'Coursework' module from my
      old website.`}</p>

      <h2 className='featureHeaders'>Songwriting & Songsmith</h2>
      <p className='featureComments'>Coming 2024</p>
      <p className='text'>{`This will be a refresh of my 'Songwriting' module from my old website.`}</p>
      <p className='text'>{`It will include a new songwriting tool I'm developing to teach music
      theory and composition through songwriting. It works by helping the user to writing a song by
      suggesting a wide range of options and emphasizing the tonalities of each choice so that
      the user can make an informed choice.`}</p>
    </div>
  )
}