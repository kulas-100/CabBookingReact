import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import UserLayout from './UserLayout';

function AddRating() {
  const [bookings, setBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const userId = localStorage.getItem("userId");
  const history = useNavigate();

  useEffect(() => {
    displayAllBookings();
  }, []);

  const displayAllBookings = () => {
    axios.get(`http://localhost:8090/bookings/id/${userId}`)
      .then(response => {
        setBookings(response.data);
        iterateBookings(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const iterateBookings = (bookings) => {
    const completed = [];
    const currentDate = new Date();
    for (let booking of bookings) {
      if(booking?.bookingDate){
        const bookingDate = new Date(booking.bookingDate);
        if (bookingDate.toDateString() !== currentDate.toDateString() && booking.status === "Success" && booking.rating == null){
          completed.push(booking);
        }
      }
    }
    setCompletedBookings(completed);
  };

  const addRating = (driverId, booking) => {
    const ratingDto = {
      userId: userId,
      driverId: driverId,
      booking: booking
    };
    console.log(ratingDto);
    history({
      pathname: '/enterrating',
      state: { ratingData: ratingDto }
    });
  };

  return (
    <div>
      <UserLayout/>
      {completedBookings.length !== 0 && completedBookings.map((booking) => (
        <div key={booking.id} className="card bookings">
          <div className="card-body">
            <div>
              <h4>{booking.startLocation} - {booking.endLocation}</h4>
              <h5 className="card-subtitle mb-2 text-muted">Date: {booking.bookingDate}</h5>
              <h5 className="card-subtitle mb-2 text-muted">{booking.car?.route?.startTime} - {booking.car?.route?.endTime}</h5>
              <h5 className="card-subtitle mb-2 text-muted">Driver Name: {booking.car?.driver?.name}</h5>
            </div>
            <div>
              <h5>Booking id: {booking.id}</h5>
              <button className="btn btn-success">Status: {booking.status}</button><br/><br/>
              <button className="btn btn-primary" onClick={() => addRating(booking.car?.driver?.id, booking)}>Click to add rating</button>
            </div>
          </div>
        </div>
      ))}

      {completedBookings.length === 0 && (
        <div className="alert alert-danger alert-dismissible fade show">
          <strong>You have no completed bookings</strong>
        </div>
      )}
    </div>
  );
}

export default AddRating;