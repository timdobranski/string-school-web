'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { supabase } from '../../../utils/supabase';


export default function AddStudentPage() {
  const [formData, setFormData] = useState({
    name: '',
    student: false,
    spotDay: '',
    spotTime: '',
    startDate: '',
    instrument: 'guitar',
    phone: '',
    email: '',
    preferredContact: '',
    primaryContactPhone: '',
    primaryContactEmail: '',
    primaryContactPreferred: '',
  });

  const [spotAvailable, setSpotAvailable] = useState(null);

  const [spotTimes, setSpotTimes] = useState([]); // ✅ Store available times
  const [loadingTimes, setLoadingTimes] = useState(false); // ✅ Loading state


  // Fetch available times when spotDay changes
  // Fetch available times when spotDay changes
  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (formData.spotDay) {
        setLoadingTimes(true); // ✅ Show loading indicator

        const { data, error } = await supabase
          .from('schedule')
          .select('time')
          .eq('day', formData.spotDay)
          .eq('booked', false);

        if (error) {
          console.error('Error fetching available times:', error.message);
          setSpotTimes([]);
        } else {
          console.log('Available times:', data);

          // ✅ Sort times chronologically
          const sortedTimes = data
            .map((item) => item.time)
            .sort((a, b) => parseTime(a) - parseTime(b));

          setSpotTimes(sortedTimes);
        }

        setLoadingTimes(false); // ✅ Hide loading indicator
      }
    };

        // ✅ Reset spotTime if spotDay changes
        if (formData.spotDay) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            spotTime: '', // ✅ Reset spotTime to empty string
          }));
        }

    fetchAvailableTimes();
  }, [formData.spotDay]);

  useEffect(() => {
    console.log('spot times: ', spotTimes);
  }, [spotTimes]);

    // ✅ Handle input changes
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    };

  // ✅ Function to parse time (e.g., "7:30pm") into a comparable value
  const parseTime = (timeString) => {
    const [time, modifier] = timeString.split(/(am|pm)/);
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'pm' && hours !== 12) {
      hours += 12;
    }
    if (modifier === 'am' && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes; // Return time in minutes for sorting
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);
    // Handle form submission here
  };

  return (
    <div className='teacherPageWrapperWhite'>
      <div className={styles.pageContentWrapper}>
        <h1 className='smallerSectionTitleWhite'>ADD STUDENT</h1>
        <form onSubmit={handleSubmit} className={styles.addStudentForm}>
  <h3 className={styles.sectionTitle}>Student & Spot</h3>
  <div className={styles.formGroup}>

    <label className={styles.label}>
      Name:
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={styles.input}
        required
      />
    </label>
  </div>

  <div className={styles.formGroup}>
    <label className={styles.label}>
      Is User:
      <input
        type="checkbox"
        name="student"
        checked={formData.student}
        onChange={handleChange}
        className={styles.checkbox}
      />
    </label>
  </div>

  <div className={styles.formGroup}>
  <label className={styles.label}>
    Spot Day:
    <select
      name="spotDay"
      value={formData.spotDay}
      onChange={handleChange}
      className={styles.select}
      required
    >
      <option value="">Select a day</option>
      <option value="Monday">Monday</option>
      <option value="Tuesday">Tuesday</option>
      <option value="Wednesday">Wednesday</option>
      <option value="Thursday">Thursday</option>
      <option value="Friday">Friday</option>
      <option value="Sunday">Sunday</option>
    </select>
  </label>
</div>

<div className={styles.formGroup}>
  <label className={styles.label}>
    Spot Time:
    <select
      name="spotTime"
      value={formData.spotTime}
      onChange={handleChange}
      className={styles.select}
      required
    >
      <option value="">Select a time</option>
      {spotTimes.length > 0 ? (
        spotTimes.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))
      ) : (
        <option value="" disabled>No available times</option>
      )}
    </select>
  </label>
</div>

  <div className={styles.formGroup}>
    <label className={styles.label}>
      Starting Date:
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        className={styles.input}
        required
      />
    </label>
  </div>

  <div className={styles.formGroup}>
    <label className={styles.label}>
      Instrument:
      <select
        name="instrument"
        value={formData.instrument}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="guitar">Guitar</option>
        <option value="ukulele">Ukulele</option>
      </select>
    </label>
  </div>

  {/* User section - Always visible */}
  <div className={styles.userSection}>
    <h3 className={styles.sectionTitle}>User:</h3>

    <div className={styles.formGroup}>
      <label className={styles.label}>
        Name:
        <input
          type="text"
          name="userName"
          value={formData.student ? formData.name : formData.userName}
          onChange={handleChange}
          className={styles.input}
          readOnly={formData.student}
        />
      </label>
    </div>

    <div className={styles.formGroup}>
      <label className={styles.label}>
        Phone:
        <input
          type="tel"
          name={formData.student ? 'phone' : 'primaryContactPhone'}
          value={
            formData.student
              ? formData.phone
              : formData.primaryContactPhone
          }
          onChange={handleChange}
          className={styles.input}
        />
      </label>
    </div>

    <div className={styles.formGroup}>
      <label className={styles.label}>
        Email:
        <input
          type="email"
          name={formData.student ? 'email' : 'primaryContactEmail'}
          value={
            formData.student
              ? formData.email
              : formData.primaryContactEmail
          }
          onChange={handleChange}
          className={styles.input}
        />
      </label>
    </div>

    <div className={styles.formGroup}>
      <label className={styles.label}>
        Preferred Contact:
        <select
          name={formData.student ? 'preferredContact' : 'primaryContactPreferred'}
          value={
            formData.student
              ? formData.preferredContact
              : formData.primaryContactPreferred
          }
          onChange={handleChange}
          className={styles.select}
        >
          <option value="email">Email</option>
          <option value="text">Text</option>
          <option value="phone">Phone</option>
        </select>
      </label>
    </div>
  </div>

  <button type="submit" className={styles.submitButton}>
    Add Student
  </button>
</form>

      </div>
    </div>
  );
}