import styles from './Schedule.module.css';
import Schedule from '../../components/Schedule/Schedule';

export default function SchedulePage() {

    return (
      <div className='infoCard'>
        <h1>SCHEDULE PAGE</h1>
        <Schedule privacy={false} />
      </div>

    )
}