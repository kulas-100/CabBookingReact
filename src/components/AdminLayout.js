
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import './Layout.css';
export default function AdminLayout() {
    const navigate=useNavigate();
    const adminLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            console.log("AdminLogout");
            localStorage.setItem("menu", "true");
            navigate('/'); 
        }
      };
    
return (
<>
<nav className="navbar navbar-expand-sm bg-secondary navbar-dark">
<div className="container-fluid">
<ul className="navbar-nav">

<li className="nav-item">
    <img src={require("../resource/fordlogo-removebg-preview.png")} alt="profile" width="50px" height="50px" ></img>
</li>
<li className="nav-item">
<Link to='/adminhome' className="nav-link">Home</Link>
</li>


{/* <li className="nav-item">
<Link to='/adminRegister' className="nav-link">Admin Register</Link>
</li>

<li className="nav-item">
<Link to='/adminlogin' className="nav-link">Login</Link>
</li> */}

<li className="nav-item">
<Link to='/location' className="nav-link">Route</Link>
</li>
<li className="nav-item">
<Link to='/displayuser' className="nav-link">Display Users</Link>
</li>
<li className="nav-item">
<Link to='/displaybookings' className="nav-link">Display Bookings</Link>
</li>
<li className="nav-item">
<Link to='/displaycabs' className="nav-link">Display Cabs</Link>
</li>
<li className="nav-item">
<Link to='/displaydrivers' className="nav-link">Display Drivers</Link>
</li>
<li className="nav-item">
<Link to='/displayleaves' className="nav-link">Display Leaves</Link>
</li>
<li className="nav-item">
 <button onClick={()=>adminLogout()} className="btn btn-danger">Logout</button>
</li>
{/* <li className="nav-item">
<Link to='/account' className="nav-link">Add Accounts</Link>
</li>


<li className="nav-item">
<Link to='/demos' className="nav-link">Demos</Link> */}
{/* </li> */}
</ul>
</div>


</nav>


<Outlet></Outlet>
</>
)
}
