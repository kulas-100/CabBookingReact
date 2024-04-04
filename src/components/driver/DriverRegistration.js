import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DriverRegistration() {
  const [newDriverAccount, setNewDriverAccount] = useState({
    id: '',
    name: '',
    emailId: '',
    password: '',
    phoneNumber: '',
    licenseNumber: ''
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const addDriverAccount = () => {
    axios.post('http://localhost:8090/driver', newDriverAccount)
      .then(response => {
        console.log(response.data);
        setMessage("Driver Account Added.");
        setErrorMessage("");
      })
      .catch(error => {
        setErrorMessage(error.message);
        setMessage("");
      });
  };

  const handleChange = (e) => {
    setNewDriverAccount({
      ...newDriverAccount,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      {message && <div className="alert alert-success">{message}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <h1>Driver Registration</h1>
      <form>
        <div className="form-group">
          <label htmlFor="DriverId">Driver Id</label>
          <input type="text" id="DriverId" name="id" value={newDriverAccount.id} onChange={handleChange} required className="form-control" pattern="[0-9]+" />
        </div>
        <div className="form-group">
          <label htmlFor="DriverName">Driver Name</label>
          <input type="text" id="DriverName" name="name" value={newDriverAccount.name} onChange={handleChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="DriverEmail">Driver Email</label>
          <input type="email" id="DriverEmail" name="emailId" value={newDriverAccount.emailId} onChange={handleChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="DriverPassword">Driver Password</label>
          <input type="password" id="DriverPassword" name="password" value={newDriverAccount.password} onChange={handleChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="DriverPhoneNumber">Driver Phone Number</label>
          <input type="text" id="DriverPhoneNumber" name="phoneNumber" value={newDriverAccount.phoneNumber} onChange={handleChange} required className="form-control" pattern="[0-9]+" />
        </div>
        <div className="form-group">
          <label htmlFor="DriverLicenseNumber">Driver License Number</label>
          <input type="text" id="DriverLicenseNumber" name="licenseNumber" value={newDriverAccount.licenseNumber} onChange={handleChange} required className="form-control" />
        </div>

        <button type="button" onClick={addDriverAccount} className="btn btn-success">Add Driver Account</button>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/driverlogin')}>Login</button>
      </form>
    </div>
  );
}

export default DriverRegistration;

