import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';

function AdminHome() {
  // const [backgroundImageUrl, setBackgroundImageUrl] = useState(require('../resource/background.jpeg'));
  const navigate = useNavigate();

  const showMenu = () => {
    return localStorage.getItem("menu") === "false";
  };

  // const adminLogout = () => {
  //   console.log("userLogout");
  //   localStorage.setItem("menu", "true");
  //   navigate('/adminlogin'); // assuming you want to redirect to login page after logout
  // };
  const showAdminNavBar = () => {
    return localStorage.getItem("adminId") === null;
  };

  useEffect(() => {
    if (showAdminNavBar()) {
      navigate('/adminlogin'); // redirect to login page if adminId is null
    }
  }, []);

  return (
    <div >
      {showMenu() && (
        <><AdminLayout/><div className="box">
          <h3>Welcome admin</h3>
        </div></>
      )}
    </div>
  );
}

export default AdminHome;