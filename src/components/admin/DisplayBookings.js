import React, { useState, useEffect } from 'react';
import AdminService from '../../services/AdminService';
import AdminLayout from '../AdminLayout';

function DisplayBookings() {
  const [bookings, setBookings] = useState([[]]);

  useEffect(() => {
    AdminService.getBookings()
      .then(response => {
        setBookings(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h3>Bookings</h3>
      <AdminLayout/>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Booking Id</th>
            <th>Booking_Date</th>
            <th>Booking_Time</th>
            <th>Start_Location</th>
            <th>End_Location</th>
            <th>Fare</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(bookingArr => (
            bookingArr.map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.bookingDate}</td>
                <td>{booking.bookingTime}</td>
                <td>{booking.startLocation}</td>
                <td>{booking.endLocation}</td>
                <td>{booking.fare}</td>
                <td>{booking.status}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayBookings;