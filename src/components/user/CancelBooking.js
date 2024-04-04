import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserLayout from './UserLayout';

function CancelBooking() {
  const [bookings, setBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const userId = localStorage.getItem("userId");
  const history = useNavigate();

  useEffect(() => {
    displayAllBookings();
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
    };
  };

  const displayAllBookings = () => {
    axios.get(`/api/bookings/${userId}`)
      .then(response => {
        setBookings(response.data);
        iterateBookings(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const iterateBookings = (bookings) => {
    const upcoming = [];
    const currentDate = new Date();
    for (let booking of bookings) {
      if(booking?.bookingDate){
        const bookingDate = new Date(booking.bookingDate);
        if (bookingDate.toDateString() === currentDate.toDateString()){
          upcoming.push(booking);
        }
      }
    }
    setUpcomingBookings(upcoming);
  };

  const cancelBooking = (bookingId) => {
    if(window.confirm("Are you sure you want to cancel your booking")){
      axios.delete(`/api/bookings/${bookingId}`)
        .then(response => {
          console.log(response.data);
          window.location.reload();
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  };

  return (
    <div>
      <UserLayout/>
      {upcomingBookings.length > 0 && upcomingBookings.map((booking) => (
        <div key={booking.id} className="card bookings">
          <div className="card-body">
            <div>
              <h5>{booking.startLocation} - {booking.endLocation}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Date: {booking.bookingDate}</h6>
            </div>
            <div>
              <h5>Booking id: {booking.id}</h5>
              {booking.status === 'Cancelled' ? (
                <p>Status: Cancelled</p>
              ) : (
                <button className="btn btn-danger" onClick={() => cancelBooking(booking.id)}>Cancel booking</button>
              )}
            </div>
          </div>
        </div>
      ))}

      {upcomingBookings.length < 1 && (
        <div className="alert alert-danger alert-dismissible fade show">
          <strong>You have no upcoming bookings</strong>
        </div>
      )}
    </div>
  );
}

export default CancelBooking;