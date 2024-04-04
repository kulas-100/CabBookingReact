import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserLayout from './UserLayout';

function Book() {
  const [locationDto, setLocationDto] = useState({ startLocation: '', endLocation: '' });
  const [cabList, setCabList] = useState([]);
  const [clickSearch, setClickSearch] = useState(false);
  const userId = localStorage.getItem("userId");
  const cabId = localStorage.getItem("cabId");
  const selectionDto = { userId: userId, cabId: cabId };
  const history = useNavigate();

  const searchCab = (e) => {
     e.preventDefault()
    setClickSearch(true);
    axios.post('http://localhost:8090/cabs',locationDto)
      .then(response => {
        setCabList(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const selectCab = (cabId) => {
    axios.post("http://localhost:8090/selectCab", selectionDto)
      .then(response => {
        console.log(response.data);
        history('/payment', { paymentData: response.data });
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };
  return (
    <>
    <UserLayout/>
    
    <div className="container">
      <div className="search-bar">
        <form onSubmit={searchCab}>
          <input type="text" id="start" name="start" required value={locationDto.startLocation} onChange={e => setLocationDto({ ...locationDto, startLocation: e.target.value })} />
          <input type="text" id="end" name="end" required value={locationDto.endLocation} onChange={e => setLocationDto({ ...locationDto, endLocation: e.target.value })} />
          <button type="submit">Find Cabs</button>
        </form>
      </div>
  
      {cabList.length > 0 && (
        <div id="cabList" className="cabList">
          {cabList.map((cab) => (
            <div key={cab.id} className="card cabs">
              <div className="card-body">
                <h5>{cab.route?.startLocation} - {cab.route?.endLocation}</h5>
                <h5>{cab.route?.startTime} - {cab.route?.endTime}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Seats Available: {cab.availableSeats}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Cab Type: {cab.type}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Driver Name: {cab.driver?.name}</h6>
                <div className="right-float">
                  <h5>Fare: Rs {cab.route?.fare}</h5>
                  {cab.availableSeats > 0 ? (
                    <button className="btn btn-success" onClick={() => selectCab(cab.id)}>Book now</button>
                  ) : (
                    <button className="btn btn-danger">Cab full</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
  
      {clickSearch && cabList.length === 0 && (
        <div className="alert alert-danger alert-dismissible fade show">
          <strong>No cabs Found!</strong> Try different locations.
        </div>
      )}
  
      {!clickSearch && (
        <div className="alert alert-danger alert-dismissible fade show">
          <strong>Enter locations to search for cabs</strong>
        </div>
      )}
    </div>
    </>
  );

}

export default Book;