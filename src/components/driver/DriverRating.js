import React, { useState, useEffect } from 'react';
import DriverService from '../../services/DriverService'; // assuming you have a similar service in React
import DriverLayout from './DriverLayout';

function DriverRating() {
  const id = localStorage.getItem("driverId");
  const numberId = id !== null ? Number(id) : 0;
  const [ratings, setRatings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    DriverService.driverRatings(numberId)
      .then(data => {
        setRatings(data.data);
        console.log(data);
      })
      .catch(err => {
        setErrorMessage(err);
      });
  }, [numberId]);

  return (
    <div>
      <DriverLayout/>
      <h1>Driver ratings</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>UserId</th>
            <th>Point</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((rating, index) => (
            <tr key={index}>
              <td>{rating.userId}</td>
              <td>{rating.point}</td>
              <td>{rating.review}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DriverRating;