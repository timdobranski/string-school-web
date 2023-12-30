'use client'

import Song from '../../../components/Song/Song';
import { useSearchParams } from 'next/navigation';


export default function TeacherSongPage() {
  const searchParams = useSearchParams()
  const songId = searchParams.get('id')

  return (
    <div className='infoCard'>
      <Song context='teacher' songId={songId} />
    </div>
  )
}