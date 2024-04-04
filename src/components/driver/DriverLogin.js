import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DriverLogin() {
  const [driverLoginDto, setDriverLoginDto] = useState({
    emailId: '',
    password: ''
  });
  const [mes, setMes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useNavigate();

  const login = () => {
    axios.post('http://localhost:8090/driver/login', driverLoginDto)
      .then(response => {
        console.log(response)
        console.log(response.data)
        console.log(response.data.id)
        localStorage.setItem("driverId", response.data.id);
        localStorage.setItem('menu','false')
        history('/driver-home');
      })
      .catch(error => {
        setErrorMessage("Login Failed");
      });
  };

  const handleChange = (e) => {
    setDriverLoginDto({
      ...driverLoginDto,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      {mes&& <div className='alert alert-success'>Logged in successfully</div>}
      {errorMessage && <div className='alert alert-danger'>Login Failed</div>}
      <h1>Driver Login</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" name="emailId" value={driverLoginDto.emailId} onChange={handleChange} placeholder="Enter email address" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="userPassword" name="password" placeholder="Password" required value={driverLoginDto.password} onChange={handleChange} />
        </div>
        <button type="button" className="btn btn-primary" onClick={login}>Submit</button>
        <button type="button" className="btn btn-primary" onClick={() => history('/driverregistration')}>Register</button>

      </form>
    </div>
  );
}

export default DriverLogin;