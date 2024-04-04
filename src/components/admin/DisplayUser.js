import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AdminService from '../../services/AdminService';
import AdminLayout from '../AdminLayout';

function DisplayAllUser() {
  const [query, setQuery] = useState("");
  const [useraccounts, setUseraccounts] = useState([]);

  useEffect(() => {
    AdminService.getUsers()
      .then(response => {
        setUseraccounts(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const filteredUseraccounts = useraccounts.filter(useraccount =>
    useraccount.name.toLowerCase().includes(query.toLowerCase())||
    useraccount.cdsId.toLowerCase().includes(query.toLowerCase())||
    useraccount.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <AdminLayout/>
        <h2>User Details</h2>
        <label htmlFor="search">Search</label>
      <input type="text" id="search" name="search" value={query} onChange={e => setQuery(e.target.value)} />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>cdsId</th>
            <th>password</th>
            <th>phoneNumber</th>
            <th>address</th>
          </tr>
        </thead>
        <tbody>
          {filteredUseraccounts.map(useraccount => (
            <tr key={useraccount.id}>
              <td>{useraccount.id}</td>
              <td>{useraccount.name}</td>
              <td>{useraccount.cdsId}</td>
              <td>{useraccount.password}</td>
              <td>{useraccount.phoneNumber}</td>
              <td>{useraccount.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayAllUser;