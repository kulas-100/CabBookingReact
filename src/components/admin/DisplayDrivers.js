import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../AdminLayout';

function DisplayDrivers() {
  const [query, setQuery] = useState("");
  const [driveraccounts, setDriveraccounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8090/showDrivers')
      .then(response => {
        setDriveraccounts(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <AdminLayout/>
        <h2>Driver Details</h2>

    <label htmlFor="search">Search</label>
      <input type="text" id="search" name="search" value={query} onChange={e => setQuery(e.target.value)} />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>emailId</th>
            <th>password</th>
            <th>phoneNumber</th>
            <th>licenseNumber</th>
          </tr>
        </thead>
        <tbody>
          {driveraccounts.filter(driveraccount => driveraccount.name.includes(query)).map(driveraccount => (
            <tr key={driveraccount.id}>
              <td>{driveraccount.id}</td>
              <td>{driveraccount.name}</td>
              <td>{driveraccount.emailId}</td>
              <td>{driveraccount.password}</td>
              <td>{driveraccount.phoneNumber}</td>
              <td>{driveraccount.licenseNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayDrivers;