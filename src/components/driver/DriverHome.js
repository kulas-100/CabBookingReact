import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DriverService from '../../services/DriverService';
import DriverLayout from './DriverLayout';

function DriverHome() {
  const id = localStorage.getItem("driverId");
  const numberId = id !== null ? Number(id) : 0;
  const [driverName, setDriverName] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('assets/background.jpeg');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(numberId);
    DriverService.getDriverName(numberId)
      .then(data => {
        setDriverName(data.data);
        console.log(data);
      });
  }, [numberId]);

  const showMenu = () => {
    return localStorage.getItem("menu") === "false";
  };

  const driverLogout = () => {
    console.log("driverLogout");
    localStorage.setItem("menu", "true");
    navigate('/driverlogin'); // assuming you want to redirect to login page after logout
  };

  const showDriverNavBar = () => {
    return localStorage.getItem("driverId") === null;
  };

  useEffect(() => {
    if (showDriverNavBar()) {
      navigate('/driverlogin'); // redirect to login page if driverId is null
    }
  }, []);

  return (
    <div className="background-image" style={{backgroundImage: `url(${backgroundImageUrl})`}}>
      {showMenu() && (
       <><DriverLayout/><div className="box">
                  <h3>Welcome {driverName}</h3>

              </div></>
      )}
    </div>
  );
}

export default DriverHome;