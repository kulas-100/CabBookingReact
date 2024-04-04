import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../AdminLayout';

function DisplayCabs() {
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cabaccounts, setCabaccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8090/showCabs')
      .then(response => {
        setCabaccounts(response.data);
  
          console.log(response.data);
       
        
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const updateDriver = (driverId, cabId) => {
    navigate(`/assign-driver/${driverId}`);
  };

  const updateRoute = (driverId, cabId) => {
    if (driverId == null) {
      setErrorMessage("Assign a driver before a route");
    } else {
      navigate(`/assign-route/${driverId}/${cabId}`);
    }
  };

  return (
    <div>
      <AdminLayout/>
        <h2>Cab Details</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <label htmlFor="search">Search</label>
      <input type="text" id="search" name="search" value={query} onChange={e => setQuery(e.target.value)} />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>CarNumber</th>
            <th>Capacity</th>
            <th>AvailableSeats</th>
          </tr>
        </thead>
        <tbody>

          {cabaccounts.filter(cabaccount => cabaccount?.type?.includes(query)).map(cabaccount => (
            <tr key={cabaccount.id}>
              <td>{cabaccount.id}</td>
              <td>{cabaccount.type}</td>
              <td>{cabaccount.carNumber}</td>
              <td>{cabaccount.capacity}</td>
              <td>{cabaccount.availableSeats}</td>
              {cabaccount.driver !== null && <td><button onClick={() => updateDriver(cabaccount.driver.id, cabaccount.id)}>Update Driver</button></td>}
              {cabaccount.driver == null && <td><button onClick={() => updateDriver()}>Assign Driver</button></td>}
              {cabaccount.route !== null && <td><button onClick={() => updateRoute(cabaccount.driver?.id, cabaccount.id)}>Update Route</button></td>}
              {cabaccount.route == null && <td><button onClick={() => updateRoute(cabaccount.driver?.id, cabaccount.id)}>Assign Route</button></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayCabs;