import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import UserLayout from './UserLayout';
function UserHome() {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(require('../../resource/background.jpeg'));
  const [userName, setUserName] = useState('');
  const id = localStorage.getItem("userId");

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8090/userName/${id}`) 
        .then(response => {
          setUserName(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  const showMenu = () => {
    return localStorage.getItem("menu") === "false";
  };

  const userLogout = () => {
    console.log("userLogout");
    localStorage.setItem("menu","true");
  };

  const showNavBar = () => {
    return localStorage.getItem("userId") === null;
  };

  return (
    <div>
      <div className="background-image" style={{backgroundImage: `url(${backgroundImageUrl})`}}></div>
      {showMenu() &&
      <><UserLayout /><div className="box">
                  <h3>Welcome {userName}</h3>
              </div></>}
    </div>
  );
}

export default UserHome;