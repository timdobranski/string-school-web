'use client';

import styles from './payments.module.css';
import { supabase } from '../../../utils/supabase';
import { useState, useEffect } from 'react';
import StudentContext, { useAuth } from '../layout.js';
import formatDate from '../../../utils/dateFormatter';

export default function Payments() {

  const [payments, setPayments] = useState([]);
  const [tooltipContent, setTooltipContent] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { googleUserData, supabaseUserData, student, session, signOut } = useAuth();


  const getPayments = async () => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('student', supabaseUserData.student_id)
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

  const handleNoteClick = (note) => {
    setTooltipContent(note);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

   useEffect(() => {
    getPayments();
   }, []);


  return (
    <div>
      <div className='infoCard'>
      <h1 className='sectionHeaders'>Payments</h1>
      <h2 className='featureHeaders'>
        Total [Due/Past Due]:
      </h2>
      <p className={styles.amountDue}>$[amount]</p>
      <h1 className='sectionHeaders'>Payment History</h1>
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

              {payment.note ? (
                <td
                  className={`${styles['td-note']} ${styles.paymentsData}`}
                  onClick={() => handleNoteClick(payment.note)}
                >
                  {payment.note}
                </td>
              ) : null}


            </tr>
          ))}
        </tbody>
      </table>

    </div>
    {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <p>{tooltipContent}</p>
          </div>
        </div>
      )}
    </div>

  )
}