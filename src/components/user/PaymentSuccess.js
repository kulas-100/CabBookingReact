import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
import UserLayout from './UserLayout';

function PaymentSuccess() {
  const [booking, setBooking] = useState({});
  const [countdown, setCountdown] = useState(10);
  const [qrValue, setQrValue] = useState('');
  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    const bookingData = location.state?.bookingData;
    if (bookingData) {
      setBooking(bookingData);
      setQrValue(`Booking id: ${bookingData.id}
        Start Location: ${bookingData.startLocation}
        End Location: ${bookingData.endLocation}
        Fare: ${bookingData.fare}
        Payment Method: ${bookingData.payment?.paymentMethod}
        Status: ${bookingData.status}`);
    }
    const countdownInterval = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          clearInterval(countdownInterval);
          goBack();
          return prevCountdown;
        }
        return prevCountdown - 1;
      });
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, [location.state]);

  const goBack = () => {
    history('/viewbookings');
  };

  return (
    <><UserLayout /><div className="container">
      <div className="alert alert-success"><h5>Your Booking is Successfull</h5></div>
      <h4>Booking details: </h4>
      <p>Booking Id: {booking.id}</p>
      <p>Start Location: {booking.startLocation}</p>
      <p>End Location: {booking.endLocation}</p>
      <p>Booking Date: {booking.bookingDate}</p>
      <p>Ride Time: {booking.car?.route?.startTime}</p>
      <QRCode value={qrValue} size={200} level={"M"} />
      <p>Click <a onClick={goBack}>here</a> to go back else you will be automatically redirected in {countdown} seconds</p>
    </div></>
  );
}

export default PaymentSuccess;