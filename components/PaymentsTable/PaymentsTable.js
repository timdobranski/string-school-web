import styles from './PaymentsTable.module.css';
import dateFormatter from '../../utils/dateFormatter';

export default function PaymentsTable({ payments }) {



  return (
    <table className={styles.paymentsTable}>
      <thead>
        <tr className={styles.paymentsHeaderRow}>
          <th className={`${styles['th-amount']} ${styles['tableheaders']}`}>Amount</th>
          <th className={`${styles['th-day']} ${styles['tableheaders']}`}>Day</th>
          <th className={`${styles['th-method']} ${styles['tableheaders']}`}>Method</th>
          <th className={`${styles['th-month']} ${styles['tableheaders']}`}>Month</th>
          <th className={`${styles['th-note']} ${styles['tableheaders']}`}>Note</th>
        </tr>
      </thead>
      <tbody className={styles.paymentsTableBody}>
        {payments.map((payment, index) => {
          // Format the date here before returning the JSX element
          const formattedDate = dateFormatter(payment.day, { includeYear: true });

          return (
            <tr key={index}>
              <td className={`${styles['td-amount']} ${styles.paymentsData}`}>{`$${payment.amount}`}</td>
              <td className={`${styles['td-day']} ${styles.paymentsData}`}>{formattedDate}</td>
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
          );
        })}
      </tbody>
    </table>

  )
}