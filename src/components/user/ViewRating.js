import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import UserLayout from './UserLayout';

function ViewRating() {
  const [ratings, setRatings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    getAllRatings(userId);
  }, [userId]);

  const getAllRatings = (userId) => {
    axios.get(`http://localhost:8090/rating/user/${userId}`)
      .then(response => {
        setRatings(response.data);
        getDriverNames(response.data);
      })
      .catch(error => {
        setMessage('');
        setErrorMessage('Could not load ratings.');
      });
  };

  const updateRating = (rating) => {
    history('/updaterating', { ratingData: rating });
  };

  const deleteRating = (id) => {
    if (window.confirm(`Do you want to Delete Rating id: ${id}`)) {
      axios.delete("http://localhost:8090/rating/"+id+"/"+userId)
        .then(response => {
          setRatings(ratings.filter(r => r.driverId !== id));
          setMessage(`Deleted Rating with id: ${id}`);
          setErrorMessage('');
        })
        .catch(error => {
          setMessage('');
          setErrorMessage('Could not Delete Rating.');
        });
    }
  };

  const getDriverNames = (ratings) => {
    ratings.forEach(rating => {
      axios.get(`http://localhost:8090/drivername/${rating.id}`)
        .then(response => {
          setDrivers(prevDrivers => [...prevDrivers, response.data]);
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  const getDriverById = (driverId) => {
    return drivers.find(driver => driver.id === driverId);
  };

  return (
    <div>
      <UserLayout/>
      {message && <div className="alert alert-success">{message}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {ratings.length < 1 && <h3>No data Found.</h3>}
      {ratings.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Driver Name</th>
              <th>Point</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((rating, index) => (
              getDriverById(rating.driverId) && (
                <tr key={index}>
                  <td>{getDriverById(rating.driverId)?.name}</td>
                  <td>{rating.point}</td>
                  <td>{rating.review}</td>
                  <td><button onClick={() => deleteRating(rating.id)} className="btn btn-danger">Delete</button></td>
                  <td><button onClick={() => updateRating(rating)} className="btn btn-warning">Update</button></td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewRating;