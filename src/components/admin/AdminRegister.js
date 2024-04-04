
import React, { useState } from 'react';
import adminService from '../../services/AdminService';
import { useNavigate } from 'react-router-dom'; 

export default function AdminRegister(){
    // const { register, errors } = useForm();
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [admin, setAdmin] = useState({
       " name":'',
        "password":'',
        "cdsId":'',
        "secretKey":''
    });
    const handleAccountChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };
    const navigate=useNavigate();

    const handleSubmit =(e)=>{
        console.log(admin);
        e.preventDefault();
        adminService.addAdmin(admin)
            .then((response) => {
                console.log(response.data);
                setMessage("response added successfully");
                setErrorMessage('');
            
                // navigate('/adminlogin');
            })
            .catch((error) => {
                setMessage('');
                setErrorMessage(error.response.data.message);
            });
        }

    return (
        <div >
              {message && <p className='alert alert-success'>{message}</p>}
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
           
            <h2>Admin Register</h2>
            <form onSubmit={handleSubmit} className="form">

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        onChange={handleAccountChange}
                        required
                        pattern="[A-Za-z\s]+"
                        title="Please enter a valid name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        onChange={handleAccountChange}
                        required
                        minLength="8"
                        title="Password must be at least 8 characters long"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cdsId">CDS ID</label>
                    <input
                        type="text"
                        name="cdsId"
                        id="cdsId"
                        className="form-control"
                        onChange={handleAccountChange}
                        required
                        pattern="[A-Za-z0-9]+"
                        title="Please enter a valid CDS ID"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="secretKey">Secret Key</label>
                    <input
                        type="password"
                        name="secretKey"
                        id="secretKey"
                        className="form-control"
                        onChange={handleAccountChange}
                        required
                        minLength="6"
                        title="Secret Key must be at least 6 characters long"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
                <button className="btn btn-primary" onClick={()=>navigate('/adminlogin')}>Back to Login</button>
            </form>
          
        </div>
    );

    
};
