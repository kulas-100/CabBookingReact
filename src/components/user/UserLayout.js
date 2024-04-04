
import { Link, Outlet } from "react-router-dom";
import fordlogo from "../../resource/fordlogo-removebg-preview.png";
import { useNavigate } from "react-router-dom";
export default function UserLayout() {
    const navigate=useNavigate();
    const userLogout=()=>{
        if(window.confirm("do you want to logout?")){
            console.log("UserLogout");
            localStorage.setItem("menu", "true");
            navigate('/'); 
        }
        
    }
return (
   
<>
<nav className="navbar navbar-expand-sm bg-secondary navbar-dark">
<div className="container-fluid">
<ul className="navbar-nav">

<li className="nav-item">
    <img src={fordlogo} alt="profile" width="50px" height="50px" />
</li>
<li className="nav-item">
<Link to='/user-home' className="nav-link">User Home</Link>
</li>


{/* <li className="nav-item">
<Link to='/userregistration' className="nav-link">User Register</Link>
</li>

<li className="nav-item">
<Link to='/userlogin' className="nav-link"> User Login</Link>
</li> */}

<li className="nav-iten">
    <Link to='/livelocation' className="nav-link">Live Location</Link>
</li>
<li className="nav-item">
<Link to='/viewbookings' className="nav-link">view Bookings</Link>
</li>
<li className="nav-item">
    <Link to='/book' className="nav-link">Book</Link>
</li>
<li className="nav-item">
    <Link to='/cancelbooking' className="nav-link">Cancel Booking</Link>
</li>
<li className="nav-item">
    <Link to='/addrating' className="nav-link">Add Rating</Link>
</li>
<li className="nav-item">
    <Link to='/viewrating' className="nav-link">View Rating</Link>
</li>
<li className="nav-item">
    <button className="btn btn-danger" onClick={()=>userLogout()}>
        Logout
    </button>

</li>

</ul>
</div>


</nav>


<Outlet></Outlet>
</>
)
}