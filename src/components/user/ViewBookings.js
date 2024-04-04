import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserLayout from './UserLayout';

function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [view, setView] = useState('upcoming');
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`http://localhost:8090/bookings/id/${userId}`)
      .then(response => {
        setBookings(response.data);
        iterateBookings(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const iterateBookings = (bookings) => {
    const upcoming = [];
    const completed = [];
    const currentDate = new Date().toDateString();

    bookings.forEach(booking => {
      if (new Date(booking.bookingDate).toDateString() === currentDate) {
        upcoming.push(booking);
      } else {
        completed.push(booking);
      }
    });

    setUpcomingBookings(upcoming);
    setCompletedBookings(completed);
  };

  const cancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel your booking")) {
      axios.delete(`http://localhost:8090/bookings/${bookingId}/${userId}`)
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
      <button className={view === 'upcoming' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => setView('upcoming')}>Upcoming Bookings</button>
      <button className={view === 'completed' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => setView('completed')}>Completed Bookings</button>
  
      {upcomingBookings.length !== 0 && view === 'upcoming' && (
        upcomingBookings.map((booking) => (
          <div key={booking.id} className="card bookings">
            <div className="card-body">
              <h5>{booking.startLocation} - {booking.endLocation}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Date: {booking.bookingDate}</h6>
              <h6 className="card-subtitle mb-2 text-muted">{booking.car?.route?.startTime} - {booking.car?.route?.endTime}</h6>
              <h5>Booking id: {booking.id}</h5>
              {booking.status === 'Cancelled' ? (
                <p>Status: Cancelled</p>
              ) : (
                <button className="btn btn-danger" onClick={() => cancelBooking(booking.id)}>Cancel booking</button>
              )}
            </div>
          </div>
        ))
      )}
  
      {upcomingBookings.length === 0 && view === 'upcoming' && (
        <div className="alert alert-danger alert-dismissible fade show">
          <strong>You have no upcoming bookings</strong>
        </div>
      )}
  
      {completedBookings.length !== 0 && view === 'completed' && (
        completedBookings.map((booking) => (
          <div key={booking.id} className="card bookings">
            <div className="card-body">
              <h5>{booking.startLocation} - {booking.endLocation}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Date: {booking.bookingDate}</h6>
              <h6 className="card-subtitle mb-2 text-muted">{booking.car?.route?.startTime} - {booking.car?.route?.endTime}</h6>
              <h5>Booking id: {booking.id}</h5>
              <button className={`btn ${booking.status === 'Success' ? 'btn-success' : 'btn-danger'}`}>Status: {booking.status}</button>
            </div>
          </div>
        ))
      )}
  
      {completedBookings.length === 0 && view === 'completed' && (
        <div className="alert alert-danger alert-dismissible fade show">
          <strong>You have no completed bookings</strong>
        </div>
      )}
    </div>
  );

}

export default ViewBookings;