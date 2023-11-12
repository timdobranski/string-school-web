'use client';

import styles from './payments.module.css';
import { supabase } from '../../../utils/supabase';
import { useState, useEffect } from 'react';
import formatDate from '../../../utils/dateFormatter';

export default function Payments() {

  const [payments, setPayments] = useState([]);
  const [tooltipContent, setTooltipContent] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const getPayments = async () => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('student', 21)
      .order('day', { ascending: false });
      if(error) {
        console.log('error: ', error);
      } else {
        const formattedData = data.map(payment => ({
          ...payment,
          day: formatDate(payment.day) // Formats the date
        }));
        setPayments(formattedData);
      }
  }

  const showFullNote = (note) => {
    setTooltipContent(note);
    setShowTooltip(true);
  };

  const hideFullNote = () => {
    setShowTooltip(false);
  };

   useEffect(() => {
    getPayments();
   }, []);

  return (
    <div className='infoCard'>
      <h1>Payments</h1>
      <h2 className='featureHeaders'>
        Total [Due/Past Due]:
      </h2>
      <p>$[amount]</p>

      <table className={styles.paymentsTable}>
        <thead>
        <tr className={styles.paymentsHeaderRow}>
          <th className={`${styles['th-amount']} featureHeaders`}>Amount</th>
          <th className={`${styles['th-day']} featureHeaders`}>Day</th>
          <th className={`${styles['th-method']} featureHeaders`}>Method</th>
          <th className={`${styles['th-month']} featureHeaders`}>Month</th>
          <th className={`${styles['th-note']} featureHeaders`}>Note</th>
        </tr>

        </thead>
        <tbody className={styles.paymentsTableBody}>
          {payments.map((payment, index) => (
            <tr key={index}>
              <td className={`${styles['td-amount']} ${styles.paymentsData}`}>{`$${payment.amount}`}</td>
              <td className={`${styles['td-day']} ${styles.paymentsData}`}>{payment.day}</td>
              <td className={`${styles['td-method']} ${styles.paymentsData}`}>{payment.method}</td>
              <td className={`${styles['td-month']} ${styles.paymentsData}`}>{payment.month}</td>
              <td
                className={`${styles['td-note']} ${styles.paymentsData}`}
                onMouseEnter={() => showFullNote(payment.note)}
                onMouseLeave={() => hideFullNote()}
              >
                {payment.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className={styles.fullNote}
        style={{ display: showTooltip ? 'block' : 'none' }}
      >
        {tooltipContent}
      </div>
    </div>
  )
}