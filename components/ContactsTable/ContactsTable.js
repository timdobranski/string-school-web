import styles from './ContactsTable.module.css';

export default function ContactsTable({ contacts }) {

  return (
    <table className={styles.contactsTable}>
      <thead>
        <tr className={styles.contactsHeaderRow}>
          <th className={`${styles['th-name']} ${styles['tableheaders']}`}>Name</th>
          <th className={`${styles['th-email']} ${styles['tableheaders']}`}>Email</th>
          <th className={`${styles['th-phone']} ${styles['tableheaders']}`}>Phone</th>
          <th className={`${styles['th-preference']} ${styles['tableheaders']}`}>Preferred</th>
          <th className={`${styles['th-preference']} ${styles['tableheaders']}`}>Relation</th>
        </tr>
      </thead>
      <tbody className={styles.contactsTableBody}>
        {contacts.map((contact, index) => {
          return (
            <tr key={index}>
              <td className={`${styles['td-name']} ${styles.contactsData}`}>{`${contact.first_name} ${contact.last_name}`}</td>
              <td className={`${styles['td-email']} ${styles.contactsData}`}>{contact.preferred_email}</td>
              <td className={`${styles['td-phone']} ${styles.contactsData}`}>{contact.phone}</td>
              <td className={`${styles['td-preference']} ${styles.contactsData}`}>{contact.preferred_comm}</td>
              <td className={`${styles['td-relation']} ${styles.contactsData}`}>{contact.is_student ? 'Student' : 'Not Student'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}