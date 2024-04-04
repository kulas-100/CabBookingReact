
import React,{useState} from 'react'
import RouteService from '../../services/RouteService';
import { Link } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
const AddRoute = () => {
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const[route,setRoute]=useState({startLocation:'',endLocation:'',fare:'',startTime:'',endTime:''});
    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log(route);
        RouteService.addRoute(route).then((result) => {
            console.log(result.data);
            setMessage("Route added successfully");
            setErrorMessage('');
        }).catch((error) => {
            console.log(error);
            setMessage('');
            setErrorMessage(error.response.data.message);
        });
    }
     
    const handleRouteChange = (e) => {
        setRoute({ ...route, [e.target.name]: e.target.value });

    }
  return (
    <div>
        
        <h1>Add Route</h1>
        <AdminLayout/>
        {message&& <p className='alert alert-success'>{message}</p>    }
        {errorMessage &&<p className='alert alert-danger'>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
            {/* <div className="form-group">
                <label htmlFor='routeId'>Route Id</label>
                <input type='number' className='form-control' id='routeId' name='routeId' onChange={handleRouteChange}/>
            </div> */}
            <div className="form-group">
                <label htmlFor='startLocation'>Start Location</label>
                <input type='text' className='form-control' id='startLocation' name='startLocation' onChange={handleRouteChange} />
            </div>
            <div className="form-group">
                <label htmlFor='endLocation'>End Location</label>
                <input type='text' className='form-control' id='endLocation'name='endLocation' onChange={handleRouteChange} />
            </div>
            <div className="form-group">
                <label htmlFor='fare'>Fare</label>
                <input type='number'className='form-control' id='fare' name='fare' onChange={handleRouteChange} />
            </div>
            <div className="form-group">
                <label htmlFor='duration'>Start Time</label>
                <input type='text'className='form-control' id='startTime' name='startTime' onChange={handleRouteChange} />
            </div>
            <div className="form-group">
                <label htmlFor='duration'>End Time</label>
                <input type='text'className='form-control' id='endTime' name='endTime' onChange={handleRouteChange} />
            </div>
            <br/>
            <button type='submit'  className="btn btn-primary">Add Route</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type='reset' className="btn btn-danger">reset</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <Link to='/displayRoute' >
           {<button type='button'  className="btn btn-secondary">View Routes</button>}
     
            </Link>
            </form> 
    </div>
  )
}
export default AddRoute;
