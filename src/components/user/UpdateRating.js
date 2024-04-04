import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import UserLayout from './UserLayout';

function UpdateRating() {
    const [rating, setRating] = useState({ point: 0, review: '' });
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const history = useNavigate();

    useEffect(() => {
        const ratingData = location.state?.ratingData;
        if (ratingData) {
            setRating(ratingData);
        }
    }, [location.state]);

    const updateRating = () => {
        axios.put("http://localhost:8090/updaterating", rating)
            .then(response => {
                setMessage('Success');
                setErrorMessage('');
            })
            .catch(error => {
                setMessage('');
                setErrorMessage('Fail');
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRating(prevRating => ({ ...prevRating, [name]: value }));
    };

    return (

        <><UserLayout /><div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Update your Rating</h3>
                            {message && <div className="alert alert-success">{message}</div>}
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <form>
                                <div className="form-group">
                                    <label htmlFor="point">Points</label>
                                    <input type="number" className="form-control" id="point" name="point" value={rating.point} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="review">Review</label>
                                    <input type="text" className="form-control" id="review" name="review" value={rating.review} onChange={handleInputChange} />
                                </div>
                                <button type="button" onClick={updateRating} className="btn btn-success">Update Rating</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div></>
    );
}

export default UpdateRating;