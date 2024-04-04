import React,{useState} from 'react'
import adminService from '../../services/AdminService';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate=useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const cdsId = e.target.cdsId.value; 
        const password = e.target.password.value;
        // console.log(cdsId,password);
        adminService.adminLogin(cdsId,password).then
        ((response) => {
           
            console.log(response.data);
            
            setMessage("Login successful");
            setErrorMessage('');
            localStorage.setItem("adminId", response.data.id);
            navigate('/adminhome');
        })
        .catch((error) => {
            console.log(error);
            setMessage('');
            setErrorMessage(error.response.data.message || "Login failed");
        });

    }
  return (
    <div>
        <h1>Admin Login</h1>
       {message&& <p className='alert alert-success'>{message}</p>    }
        {errorMessage &&<p className='alert alert-danger'>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="cdsId">Cds id</label>
                <input
                    type="text"
                    name="cdsId"
                    id="cdsId"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                />
            </div>

            <button className="btn btn-primary" type='submit'>Login</button>
            <button className="btn btn-primary" onClick={()=>navigate('/adminregister')}>Register</button>
        </form>
    </div>
  )
}

export default AdminLogin
