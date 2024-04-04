import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import DriverService from '../../services/DriverService'; // assuming you have a similar service in React
import DriverLayout from './DriverLayout';


function ApplyLeave() {
    const [leave, setLeave] = useState({
        leaveId:Math.floor( Math.random()*Date.now()%10000),
        driverId: '',
        startDate: '',
        endDate: '',
        status: 'Applied',
        reason: ''
    });
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const driverId = localStorage.getItem('driverId');
        setLeave(prevLeave => ({ ...prevLeave, driverId }));
    }, []);

    const handleInputChange = (event) => {
        setLeave({
            ...leave,
            [event.target.name]: event.target.value
        });
    };

    const applyLeave = () => {
        DriverService.leaveApply(leave)
            .then(response => {
                console.log(response);
                setMessage('Leave Applied');
                setErrorMessage('');
            })
            .catch(error => {
                console.log(error);
                if (error.status === '0') {
                    setErrorMessage('Network error, please try again later.');
                } else {
                    setErrorMessage(error.error);
                }
                setMessage('');
            });
    };

    return (
        <div>
            <DriverLayout/>
            {message && <div className="alert alert-success">{message}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form>
                <h1>Apply Leave</h1>
               
                <div className="form-group">
                    <label htmlFor="leaveId">Leave Id</label>
                    <input type="text" id="leaveId" name="leaveId" value={leave.leaveId} readOnly className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="driverId">Driver Id</label>
                    <input type="text" id="driverId" name="driverId" value={leave.driverId} readOnly className="form-control" />
                </div>
                    
               <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={leave.startDate}
                        min={today}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={leave.endDate}
                        min={leave.startDate}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={leave.status}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reason">Reason</label>
                    <textarea
                        id="reason"
                        name="reason"
                        value={leave.reason}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                    />
                </div>
               
                <button type="submit" className="btn btn-primary" onClick={applyLeave}>Submit</button>
            </form>
        </div>
    );
}

export default ApplyLeave;