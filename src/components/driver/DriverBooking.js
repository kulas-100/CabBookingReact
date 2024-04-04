import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  DriverService  from '../../services/DriverService'; // assuming you have a similar service in React
import DriverLayout from './DriverLayout';

function DriverBooking() {
  const id = localStorage.getItem("driverId");
  const numberId = id !== null ? Number(id) : 0;
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    DriverService.getBookings(numberId)
      .then(data => {
        if (data) {
          setBookings(data.data);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch(err => {
        setErrorMessage(err);
      });
  }, [numberId]);

  return (
    
    <div>
      <DriverLayout/>
        <h1>Driver Bookings</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Booking_Date</th>
            <th>Booking_Time</th>
            <th>Start_Location</th>
            <th>End_Location</th>
            <th>Fare</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.bookingDate}</td>
              <td>{booking.bookingTime}</td>
              <td>{booking.startLocation}</td>
              <td>{booking.endLocation}</td>
              <td>{booking.fare}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DriverBooking;