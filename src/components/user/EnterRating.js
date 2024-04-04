import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation, useNavigate } from 'react-router-dom';
import UserLayout from './UserLayout';

function EnterRating() {
  const [newGiveRating, setNewGiveRating] = useState({ point: 0, review: '', userId: '', driverId: '', booking: {} });
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [stars, setStars] = useState([
    { value: 1, filled: false },
    { value: 2, filled: false },
    { value: 3, filled: false },
    { value: 4, filled: false },
    { value: 5, filled: false }
  ]);
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const ratingData = location.state.ratingData;
    setNewGiveRating(prevState => ({ ...prevState, userId: ratingData.userId, driverId: ratingData.driverId, booking: ratingData.booking }));
  }, [location]);

  const rate = (starValue) => {
    setNewGiveRating(prevState => ({ ...prevState, point: starValue }));
    setStars(stars.map(star => ({ ...star, filled: star.value <= starValue })));
  };

  const addRating = () => {
    const postRating = {
      bookingId: newGiveRating.booking?.id,
      rating: newGiveRating
    };
    axios.post('http://localhost:8090/rating', postRating)
      .then(response => {
        setMessage('Rating Added.');
        setErrorMessage('');
      })
      .catch(error => {
        if (error.response.status === 0) {
          setErrorMessage('Network error, please try again later.');
        } else {
          setErrorMessage(error.response.data);
        }
        setMessage('');
      });
  };

  return (
    <div className="give-rating-container">
      <UserLayout/>
      <h3>Add new Rating:</h3>
      {message && <div className="alert alert-success">{message}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form>
        <div className="form-group">
          <label htmlFor="point">Points:</label>
          <div className="star-rating">
            {stars.map((star, index) => (
              <span key={index} className={`star ${star.filled ? 'filled' : ''}`} onClick={() => rate(star.value)}>
                <i className="fas fa-star"></i>
              </span>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review:</label>
          <textarea id="review" name="review" className="form-control" value={newGiveRating.review} onChange={e => setNewGiveRating(prevState => ({ ...prevState, review: e.target.value }))}></textarea>
        </div>
        <button type="button" onClick={addRating} className="btn btn-success">Add Rating</button>
      </form>
    </div>
  );
}

export default EnterRating;