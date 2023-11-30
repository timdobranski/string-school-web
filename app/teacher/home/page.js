import styles from './home.module.css';
import Schedule from '../../../components/Schedule/Schedule';

export default function TeacherHome() {
  return (
    <>
      <h1 className='sectionHeaders'>Teacher Home</h1>
      <Schedule privacy={false} />
    </>
  )
}