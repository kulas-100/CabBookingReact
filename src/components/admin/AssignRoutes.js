import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AssignRoute() {
  const [carId, setCarId] = useState(useParams().carId);
  const [routeId, setRouteId] = useState(useParams().routeId);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const assignRouteFunc = (e) => {
    e.preventDefault();
    const assignRouteDto = {
      carId: carId,
      routeId: routeId,
    };

    axios.put('http://localhost:8090/assignRoute', assignRouteDto)
      .then(response => {
        
        // console.log(response.data);
        setMessage('Route added successfully');
      })
      .catch(error => {
        if (error.response) {
          setErrorMessage(error.response.data);
        } else {
          // The request was made but no response was received or an error occurred while making the request
          console.error('Error', error.message);
        }
      });
  };

  return (
    <div>
      {message && <div className="alert alert-success">{message}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form>
        <h3>Update Route:</h3>
        <label htmlFor="carId">Car Id</label><br />
        <input type="number" id="carId" name="carId" value={carId} onChange={e => setCarId(e.target.value)} /><br /><br />
        <label htmlFor="routeId">Route Id</label><br />
        <input type="number" id="routeId" name="routeId" value={routeId} onChange={e => setRouteId(e.target.value)} /><br /><br />
        <button onClick={assignRouteFunc} className="btn btn-success">Update Route</button>
      </form>
    </div>
  );
}

export default AssignRoute;
