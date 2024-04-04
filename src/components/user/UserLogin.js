import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function UserLogin() {
  const [loginDto, setLoginDto] = useState({
    cdsId: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const[message,setMessage]=useState('');
  const navigate=useNavigate();

  const userLogin = () => {
    axios.post('http://localhost:8090/account/login', loginDto) 
      .then(response => {
        console.log(response)
        console.log(response.data)
        console.log(response.data.id)
        localStorage.setItem("userId", response.data.id);
        navigate('/user-home')
        
      })
      .catch(error => {
        setErrorMessage('Login Failed');
      });
  };

  const handleInputChange = (event) => {
    setLoginDto({
      ...loginDto,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
        {message&& <div> Logged in successfully</div>}
      {errorMessage && <div>Login Failed</div>}

        <h1>User Login</h1>
      <form>
        <div className="form-group">
            <label htmlFor="cdsId">CDS ID</label>
          <input type="text" className="form-control" id="cdsId" name="cdsId" value={loginDto.cdsId} onChange={handleInputChange} placeholder="Enter cdsId" pattern="[A-Z0-9]+" required />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Password" required value={loginDto.password} onChange={handleInputChange} />
        </div>
        <button type="button" className="btn btn-primary" onClick={userLogin}>Submit</button>
       <Link to='/userregistration'><button type='button' className='btn btn-primary' >Register</button></Link> 
      </form>
    </div>
  );
}

export default UserLogin;