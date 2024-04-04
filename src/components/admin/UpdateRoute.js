
import React from 'react'
import RouteService from '../../services/RouteService';
import { useState ,useEffect} from 'react';


const UpdateRoute = ({ route: initialRoute,closeModal}) => {

    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const[route,setRoute]=useState(initialRoute);
    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log(route);
        RouteService.updateRoute(route).then((result) => {
            console.log(result.data);
            setMessage("Route updated successfully");
            setErrorMessage('');
            closeModal();
        }).catch((error) => {
            console.log(error);
            setMessage('');
            // setErrorMessage(error.response.data.message);
        });
        // const handleUpdate = (route) => {
        //     console.log(route);
        //      RouteService.updateRoute(route)
        //      .then(
        //          (resp)=>{
        //              console.log(resp);
        //              setRoute(route.map((a)=>a.locationId === route.locationId ? route : a))
        //          }
        //      )
        //      .catch(
        //          (err)=>{
        //              console.log(err);
        //          }
        //      )
        // }
    }
    useEffect(() => {
        // Fetch the route data and set the form values
        RouteService.getRoute(route.locationId).then((result) => {
            console.log(result)
            const routeData = result.data;
            setRoute({
                locationId: routeData.locationId,

                startLocation: routeData.startLocation,
                endLocation: routeData.endLocation,
                fare: routeData.fare,
                startTime: routeData.startTime,
                endTime: routeData.endTime
            });
        }).catch((error) => {
            console.log(error);
        });
    }, []);
     
    const handleRouteChange = (e) => {
        setRoute({ ...route, [e.target.name]: e.target.value });

  
}
  return (
    
    <div>
        <h1>Update Route</h1>
        {message&& <p className='alert alert-success'>{message}</p>    }
        {errorMessage &&<p className='alert alert-danger'>{errorMessage}</p>}
        <form name='updateform' onSubmit={handleSubmit}>
        {/* <div className="form-group">
                <label htmlFor='id' >Start Location</label>
                <input type='id' className='form-control' id='id' name='id' value={route.locationId} onChange={handleRouteChange} />
            </div> */}
            <div className="form-group">
                <label htmlFor='startLocation'>Start Location</label>
                <input type='text' className='form-control' id='startLocation' name='startLocation' value={route.startLocation} onChange={handleRouteChange} />
            </div>
            <div className="form-group">
                <label htmlFor='endLocation'>End Location</label>
                <input type='text' className='form-control' id='endLocation' name='endLocation' value={route.endLocation} onChange={handleRouteChange} />
            </div>
            <div className="form-group">
                <label htmlFor='fare'>Fare</label>
                <input type='number' className='form-control' id='fare' name='fare' value={route.fare} onChange={handleRouteChange} />
            </div>
            <div className="form-group">
                <label htmlFor='duration'>Start Time</label>
                <input type='text' className='form-control' id='startTime' name='startTime' value={route.startTime} onChange={handleRouteChange} />
            </div>
            <div className="form-group">
                <label htmlFor='duration'>End Time</label>
                <input type='text' className='form-control' id='endTime' name='endTime' value={route.endTime} onChange={handleRouteChange} />
            </div>
            <br/>
            <button type='submit' className="btn btn-primary"  >Update Route</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type='reset' className="btn btn-danger">reset</button>
        {/* </form> */}
           {/* <Link to='/displayRoute' >
           {<button type='button'  className="btn btn-secondary">View Routes</button>}
     
            </Link> */}
            </form> 
    </div>
  )
     }

export default UpdateRoute