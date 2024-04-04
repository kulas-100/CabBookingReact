
import { Link, Outlet } from "react-router-dom";
import fordlogo from "../../resource/fordlogo-removebg-preview.png";
import { useNavigate } from "react-router-dom";
// import './Layout.css';
export default function DriverLayout() {
    const navigate=useNavigate();
    const driverLogout = () => {
        if(window.confirm("Do you want to logout?")){
        console.log("driverLogout");
        localStorage.setItem("menu", "true");
        navigate('/'); 
        }
      };
return (
    <>
        <nav className="navbar navbar-expand-sm bg-primary navbar-white">
            <div className="container-fluid">
                <ul className="navbar-nav">

                    <li className="nav-item ">
                        <img src={fordlogo} alt="profile" width="50px" height="50px" />
                    </li>
                    <li className="nav-item" >
                        <Link to='/driver-home' className="nav-link">Driver Home</Link>
                    </li>

                    {/* <li className="nav-item">
                        <Link to='/driverregistration' className="nav-link">Driver Register</Link>
                    </li>

                    <li className="nav-item">
                        <Link to='/driverlogin' className="nav-link"> Driver Login</Link>
                    </li> */}
                    <li className="nav-item">
                        <Link to='/driverbookings' className="nav-link"> View Bookings</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/driverratings' className="nav-link">Driver Rating</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/applyleave' className="nav-link">Apply leave</Link>
                    </li>

                    <li className="nav-item ml-right">
                        <button className="btn btn-danger" onClick={() => driverLogout()}>Logout </button>
                    </li>

                </ul>
            </div>
        </nav>

        <Outlet></Outlet>
    </>
)
}
