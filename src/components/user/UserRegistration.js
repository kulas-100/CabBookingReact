import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { useNavigate } from 'react-router-dom';

function UserRegistration() {
  const [newUserAccount, setNewUserAccount] = useState({
    name: '',
    cdsId: '',
    password: '',
    phoneNumber: '',
    address: ''
  });
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate();

  const addUserAccount = () => {
    axios.post('http://localhost:8090/user', newUserAccount) 
      .then(response => {
        setMessage('User Account Added.');
        setErrorMessage('');
      })
      .catch(error => {
        setErrorMessage(error.message);
        setMessage('');
      });
  };

  const handleInputChange = (event) => {
    setNewUserAccount({
      ...newUserAccount,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      {message && <p className="alert alert-success">{message}</p>}
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <form>
        <div className="form-group">
          <label htmlFor="Name">Name:</label>
          <input type="text" id="Name" name="name" value={newUserAccount.name} onChange={handleInputChange} required className="form-control" pattern="[A-Za-z]{3,}" />
        </div>
        <div className="form-group">
          <label htmlFor="CdsId">CDS ID:</label>
          <input type="text" id="CdsId" name="cdsId" value={newUserAccount.cdsId} onChange={handleInputChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password:</label>
          <input type="password" id="Password" name="password" value={newUserAccount.password} onChange={handleInputChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="PhoneNumber">Phone Number:</label>
          <input type="text" id="PhoneNumber" name="phoneNumber" value={newUserAccount.phoneNumber} onChange={handleInputChange} required className="form-control" pattern="[0-9]{10}" />
        </div>
        <div className="form-group">
          <label htmlFor="Address">Address:</label>
          <textarea id="Address" name="address" value={newUserAccount.address} onChange={handleInputChange} required className="form-control" />
        </div>

        <button type="button" onClick={addUserAccount} className="btn btn-success">Add user Account</button>
         &nbsp;&nbsp;
        <button type='button' className='btn btn-primary' onClick={()=>navigate('/userlogin')}>Back to Login</button>
      </form>
    </div>
  );
}

export default UserRegistration;