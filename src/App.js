import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UserLogin from './components/user/UserLogin';
import AdminLogin from './components/admin/AdminLogin';
import DriverLogin from './components/driver/DriverLogin';
import UserRegistration from './components/user/UserRegistration';
import AdminRegister from './components/admin/AdminRegister';
import DriverRegistration from './components/driver/DriverRegistration';
import AdminLayout from './components/AdminLayout';
import { useEffect } from 'react';
// import UserNavbar from './components/UserNavbar';
// import AdminNavbar from './components/AdminNavbar';
// import DriverNavbar from './components/DriverNavbar';

// // import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
import NoPage from './components/NoPage';
import AdminHome from './components/AdminHome';
// import AdminRegister from './components/admin/AdminRegister';
// import AdminLogin from './components/admin/AdminLogin';
import Location from './components/admin/Route';
import AddRoute from './components/admin/AddRoute';
import ViewRoute from './components/admin/ViewRoute';
import UpdateRoute from './components/admin/UpdateRoute';
import DisplayAllUser from './components/admin/DisplayUser';
import DisplayBookings from './components/admin/DisplayBookings';
import DisplayCabs from './components/admin/DisplayCabs';
import DisplayDrivers from './components/admin/DisplayDrivers';
import DriverHome from './components/driver/DriverHome';
import DriverLayout from './components/driver/DriverLayout';
import DriverBooking from './components/driver/DriverBooking';
import DriverRating from './components/driver/DriverRating';
import ApplyLeave from './components/driver/ApplyLeave';
import UserLayout from './components/user/UserLayout';
import UserHome from './components/user/UserHome';
import DecideLeave from './components/admin/DecideLeave'
import LiveLocation from './components/user/LiveLocation'
import ViewBookings from './components/user/ViewBookings';
import Book from './components/user/Book';
import CancelBooking from './components/user/CancelBooking';
import AddRating from './components/user/AddRating';
import EnterRating from './components/user/EnterRating';
import ViewRating from './components/user/ViewRating';
import UpdateRating from './components/user/UpdateRating';
import Payment from './components/user/Payment';
import PaymentSuccess from './components/user/PaymentSuccess';
import UpdateDriver from './components/admin/UpdateDriver';
import AssignRoute from './components/admin/AssignRoutes';
// function App() {
//   return (
//     <div className="App">
//       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
//       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
//       <BrowserRouter>
//       <Routes>
//           <Route path='/' element={<Layout />}>

//             <Route index element={<Home/>}></Route>

//           {/* <Route path='/accounts' element={<DisplayAccounts />}></Route> */}
//             <Route path='/adminRegister' element={<AdminRegister />}></Route>
//             {/* <Route path='/demos' element={<AllDemo />}></Route> */}
//             <Route path='/adminlogin' element={<AdminLogin/>}></Route>
//             <Route path='/location' element={<Location/>}></Route>
//             <Route path='/addRoute' element={<AddRoute/>}></Route>
//             <Route path='/displayRoute' element={<ViewRoute/>}></Route>
//             <Route path='/updateroute' element={<UpdateRoute/>}></Route>
//             <Route path='/displayuser' element={<DisplayAllUser/>}></Route>
//             <Route path='/displaybookings' element={<DisplayBookings/>}></Route>
//             <Route path='/displaycabs' element={<DisplayCabs/>}></Route>
//             <Route path='/displaydrivers' element={<DisplayDrivers/>}></Route>

//             <Route path='*' element={<NoPage/>}></Route> 
//           </Route>
//         </Routes>
//         </BrowserRouter>
      
//     </div>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import { BrowserRouter, Route,Routes, Link } from 'react-router-dom';
// import QRCode from 'react-qr-code';
// import AdminLogin from './components/admin/AdminLogin';
// import Layout from './components/Layout';

// function App() {
//   const [menu, setMenu] = useState(localStorage.getItem((menu)|| "true"));
//   const [userId, setUserId] = useState(localStorage.getItem("userId"));
//   const [adminId, setAdminId] = useState(localStorage.getItem("adminId"));
//   const [driverId, setDriverId] = useState(localStorage.getItem("driverId"));

//   const userLogout = () => {
//     if (window.confirm("Are you sure you want to log out")) {
//       console.log("userLogout");
//       localStorage.setItem("menu", "true");
//       localStorage.removeItem("userId");
//       setUserId(null);
//       setMenu("true");
//     }
//   };
//   const adminLogout = () => {
//     if (window.confirm("Are you sure you want to log out")) {
//       console.log("adminLogout");
//       localStorage.setItem("menu", "true");
//       localStorage.removeItem("adminId");
//       setAdminId(null);
//       setMenu("true");
//     }
//   }
//   const driverLogout = () => {
//     if (window.confirm("Are you sure you want to log out")) {
//       console.log("driverLogout");
//       localStorage.setItem("menu", "true");
//       localStorage.removeItem("driverId");
//       setDriverId(null);
//       setMenu("true");
//     }
//   }
//   // Similar functions for adminLogout and driverLogout...

//   const userLogin = () => {
//     console.log("userLogin");
//     localStorage.setItem("menu", "false");
//     setMenu("false");
//   };

//   const adminLogin = () => {
//     console.log("adminLogin");
//     localStorage.setItem("menu", "false");
//     setMenu("false");
//   }
//   const driverLogin = () => {
//     console.log("driverLogin");
//     localStorage.setItem("menu", "false");
//     setMenu("false");
//   } 

//   // Similar functions for driverLogin and adminLogin...

//   return (
    
//     <div className="App">
//       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
//        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
//     <BrowserRouter>
    
      
//         {menu === "true" && (
//           <>
//           <div>
//             <h3>Are you a user</h3>
//             <Link to="/user-login" onClick={userLogin}>Click here to Login</Link>
//           </div>
//           <div>
//             <h3>Are you an admin</h3>
//             <Link to="/adminlogin" onClick={adminLogin}>Click here to Login</Link>
//           </div>
//           <div>
//             <h3>Are you a driver</h3>
//             <Link to="/driver-login" onClick={driverLogin}>Click here to Login</Link>
//           </div>
//           </>
//         )}
      

//       {userId && (
//         <nav>
//           <ul>
//             <li><Link to="/location">Live Location</Link></li>
         
//             <li><button onClick={userLogout}>User Logout</button></li>
//           </ul>
//         </nav>
//       )}

//       {adminId && (
//         <nav>
//           <ul>
//             <li><Link to="/register">Register</Link></li>
         
//             <li><button onClick={adminLogout}>Admin Logout</button></li>
//           </ul>
//         </nav>
//       )}

//       {driverId && (
//         <nav>
//           <ul>
//             <li><Link to="/driver-bookings">View Bookings</Link></li>
      
//             <li><button onClick={driverLogout}>Driver Logout</button></li>
//           </ul>
//         </nav>
//       )}
       
//       {/* Your routes go here */}
//       <Routes>
//        {/* <Route path='/' element={<App/>}></Route> */}

//     <Route path="/adminlogin" element={<AdminLogin/>}></Route>
//     </Routes>
//     </BrowserRouter>
//     </div>
//   );
// }

// export default App;

function App() {
  const [menu, setMenu] = useState(localStorage.getItem('menu') || 'true');
  useEffect(() => {
    setMenu('true');
  }, []);
  
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [adminId, setAdminId] = useState(localStorage.getItem('adminId'));
  const [driverId, setDriverId] = useState(localStorage.getItem('driverId'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const userLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.setItem('menu', 'true');
      localStorage.removeItem('userId');
      setUserId(null);
      setMenu('true');
    }
  };

  const adminLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.setItem('menu', 'true');
      localStorage.removeItem('adminId');
      setAdminId(null);
      setMenu('true');
    }
  };

  const driverLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.setItem('menu', 'true');
      localStorage.removeItem('driverId');
      setDriverId(null);
      setMenu('true');
    }
  };

  const userLogin = () => {
    
    localStorage.setItem('menu', 'false');
    setMenu('false');
    setIsLoggedIn(true);
  };

  const adminLogin = () => {
    localStorage.setItem('menu', 'false');
    setMenu('false');
    setIsLoggedIn(true);
  };

  const driverLogin = () => {
    localStorage.setItem('menu', 'false');
    setMenu('false');
    setIsLoggedIn(true);
  };

  return (

    <div className="App">
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAL1dpRK3hh19hFrWMi44JA2yxgGkNrOTY"></script>
      <BrowserRouter>
      {menu === "true" && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h3>Are you a user?</h3>
                  <Link to="/userlogin" onClick={userLogin}>
                    Click here to Login
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h3>Are you an admin?</h3>
                  <Link to="/adminlogin" onClick={adminLogin}>
                    Click here to Login
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h3>Are you a driver?</h3>
                  <Link to="/driverlogin" onClick={driverLogin}>
                    Click here to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    
            {/* <div>
              <h3>Are you a user?</h3>
              <Link to="/userlogin" onClick={userLogin}>
                Click here to Login
              </Link>
            </div>
            <div>
              <h3>Are you an admin?</h3>
              <Link to="/adminlogin" onClick={adminLogin} >
                Click here to Login
              </Link>
            </div>
            <div>
              <h3>Are you a driver?</h3>
              <Link to="/driverlogin" onClick={driverLogin}>
                Click here to Login
              </Link>
            </div>
           */}
      
{/* 
        {userId && (
          <>
            <UserLayout />
            <nav>
              <ul>
                <li>
                  <button onClick={userLogout}>User Logout</button>
                </li>
              </ul>
            </nav>
          </>
        )} */}

        {/* {adminId && (
          <>
            <AdminLayout />
            <nav>
              <ul>
                <li>
                  <button onClick={adminLogout}>Admin Logout</button>
                </li>
              </ul>
            </nav>
          </>
        )} */}

        {/* {driverId && (
          <>
            <DriverLayout />
            <nav>
              <ul>
                <li>
                  <button onClick={driverLogout}>Driver Logout</button>
                </li>
              </ul>
            </nav>
          </>
        )} */}

        <Routes>
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/driverlogin" element={<DriverLogin />} />
          <Route path="/userregistration" element={<UserRegistration />} />
          <Route path="/adminregister" element={<AdminRegister />} />
          <Route path="/driverregistration" element={<DriverRegistration />} />
          

          <Route path='/location' element={<Location/>}></Route>
             <Route path='/addRoute' element={<AddRoute/>}></Route>
             <Route path='/displayRoute' element={<ViewRoute/>}></Route>
             <Route path='/updateroute' element={<UpdateRoute/>}></Route>
             <Route path='/displayuser' element={<DisplayAllUser/>}></Route>
             <Route path='/displaybookings' element={<DisplayBookings/>}></Route>
             <Route path='/displaycabs' element={<DisplayCabs/>}></Route>
             <Route path='/displaydrivers' element={<DisplayDrivers/>}></Route>
             <Route path='/adminhome' element={<AdminHome/>}></Route>
          <Route path='/displayleaves' element={<DecideLeave/>}></Route>

          <Route path='/driver-home' element={<DriverHome/>}></Route>
          <Route path='/driverbookings' element={<DriverBooking/>}></Route>
          <Route path='/driverratings' element={<DriverRating/>}></Route>
          <Route path='/applyleave' element={<ApplyLeave/>}></Route>

          <Route path='user-home' element={<UserHome/>}></Route>
          <Route path='livelocation' element={<LiveLocation/>}></Route>
          <Route path='viewbookings' element={<ViewBookings/>}></Route>
          <Route path='book' element={<Book/>}></Route>
          <Route path='cancelbooking' element={<CancelBooking/>}></Route>
          <Route path='addrating' element={<AddRating/>}></Route>
          <Route path='enterrating' element={<EnterRating/>}></Route>
          <Route path='viewrating' element={<ViewRating/>}></Route>
          <Route path='updaterating' element={<UpdateRating/>}></Route>
          <Route path='payment' element={<Payment/>}></Route>
          <Route path='paymentsuccess' element={<PaymentSuccess/>}></Route>
          <Route path='assign-driver/:driverId' element={<UpdateDriver/>}></Route>
          <Route path='assign-route/:driverId/:carId' element={<AssignRoute/>}></Route>

          
          <Route path='/'></Route>

             {/* <Route path='/' element={<AdminLayout />} /> */}
          <Route path='*' element={<NoPage/>}></Route> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
