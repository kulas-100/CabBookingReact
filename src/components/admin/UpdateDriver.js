import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateDriver() {
  const [driverId, setDriverId] = useState(useParams().driverId);
  const [carId, setCarId] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');






  const assignDriverFunc = () => {
    const assignDriverDto = {
      driverId: driverId,
      carId: carId,
   
      
    };

    axios.put('http://localhost:8090/assignDriver', assignDriverDto)
      .then(response => {

        console.log(response.data);
        setMessage('Driver added successfully');
      })
      .catch(error => {
        setErrorMessage(error.response.data);
      });
  };

  return (
    <div>
      <h3>Update Driver:</h3>
      {message && <div className='alert alert-success'>{message}</div>}
      {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
      Car Id <input type="number" id="carId" name="carId" value={carId} onChange={e => setCarId(e.target.value)} />
      Driver Id <input type="number" id="driverId" name="driverId" value={driverId} onChange={e => setDriverId(e.target.value)} />
      <br />

      <button onClick={assignDriverFunc} className="btn btn-success">Update Driver</button>

    </div>
  );
}

export default UpdateDriver;