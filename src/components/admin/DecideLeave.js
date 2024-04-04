import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import AdminLayout from '../AdminLayout';

function DecideLeave() {
  const [leavelist, setLeavelist] = useState([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8090/allLeaves') 
      .then(response => {
        setLeavelist(response.data);
      })
      .catch(error => {
        console.log(error);
        setErrorMessage("Could't Load Accounts");
        setMessage('');
      });
  }, []);

  const disapprove = (leaveId) => {
    axios.put(`http://localhost:8090/disapproveLeave/${leaveId}`) 
      .then(response => {
        console.log(response.data);
        setMessage("Leave Disapproved");
        setErrorMessage('');
        setLeavelist(leavelist.filter(leave => leave.leaveId !== leaveId));
      })
      .catch(error => {
        console.log(error);
        if (error.status === 0)
          setErrorMessage("Network error, please try again later.");
        else
          setErrorMessage(error.error);
        setMessage('');
      });
  };

  const approve = (leaveId) => {
    axios.put(`http://localhost:8090/approveLeave/${leaveId}`) 
      .then(response => {
        console.log(response.data);
        setMessage("Leave Approved");
        setErrorMessage('');
        setLeavelist(leavelist.filter(leave => leave.leaveId !== leaveId));
      })
      .catch(error => {
        console.log(error);
        if (error.status === 0)
          setErrorMessage("Network error, please try again later.");
        else
          setErrorMessage(error.error);
        setMessage('');
      });
  };

  return (
    <div>
      <AdminLayout/>
      {message && <div className="alert alert-success">
        <p>{message}</p>
      </div>}
      {errorMessage && <div className="alert alert-danger">
        <p>{errorMessage}</p>
      </div>}
      {leavelist.length < 1 && <h3>No Request Found.</h3>}
      {leavelist.length > 0 && <table className="table">
        <thead>
          <tr>
            <th>Leave Id</th>
            <th>Driver Id</th>
            <th>Start date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {leavelist.map(leave => (
            <tr key={leave.leaveId}>
              <td>{leave.leaveId}</td>
              <td>{leave.driverId}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.status}</td>
              <td>{leave.reason}</td>
              <td><button onClick={() => approve(leave.leaveId)} className="btn btn-success">Approve</button></td>
              <td><button onClick={() => disapprove(leave.leaveId)} className="btn btn-danger">Disapprove</button></td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}

export default DecideLeave;