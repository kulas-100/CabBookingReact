import { useState } from "react";
import { useEffect } from "react";
import RouteService from "../../services/RouteService";
import UpdateRoute from "./UpdateRoute";
import AdminLayout from "../AdminLayout";

function RoutesTable({ routesArray, handleDelete, handleUpdate }) {
    console.log(routesArray);

    return (
        <>
            <h3> All Routes</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>startLocation</th>
                        <th>endlocation</th>
                        <th>fare</th>
                        <th>start Time</th>
                        <th>end time</th>
                    </tr>
                </thead>

                <tbody>
                    {routesArray.map((route) => (
                        <tr key={route.locationId}>
                            <td>{route.startLocation}</td>
                            <td>{route.endLocation}</td>
                            <td>{route.fare}</td>
                            <td>{route.startTime}</td>
                            <td>{route.endTime}</td>
                            <td>
                                <button
                                    className="btn btn-outline-danger active"
                                    onClick={() => handleDelete(route.locationId)}
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline-warning active"
                                    type="button"
                                    onClick={() => handleUpdate(route)}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

function ViewRoute() {
    let [routes, setRoutes] = useState([]);
    let [selectedRoute, setSelectedRoute] = useState(null); // Add selectedRoute state
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = () => {
        RouteService.viewRoute()
            .then((resp) => {
                console.log(resp.data);
                setRoutes(resp.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                console.log("Loaded all data from Server");
            });
    }

    const handleDelete = (id) => {
        console.log(id);
        RouteService.deleteRouteById(id)
            .then((resp) => {
                console.log(resp);
                setRoutes(routes.filter((a) => a.locationId !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleUpdate = (route) => {
        console.log(route);
        setSelectedRoute(route); // Set the selectedRoute state to the clicked route
    }
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRoute(null);
        // Fetch routes again to reflect the updated route
        RouteService.viewRoute().then((result) => {
            setRoutes(result.data);
        });
    };



    return (
        <>
        <AdminLayout/>
            <h3> Display all Accounts.</h3>

            {routes.length > 0 ? (
                <RoutesTable
                    routesArray={routes}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                />
            ) : (
                <h3> No Accounts found.</h3>
            )}

            {selectedRoute && (
                <UpdateRoute 
                    route={selectedRoute}
                    closeModal={closeModal}
                   
                />
            )}
        </>
    );
}

export default ViewRoute;



// function RoutesTable({ routesArray,handleDelete,handleUpdate}) {

//     console.log(routesArray);

//     return (
//         <>
//             <h3> All Routes</h3>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>startLocation</th>
//                         <th>endlocation</th>
//                         <th>fare</th>
//                         <th>start Time</th>
//                         <th>end time</th>

//                     </tr>
//                 </thead>

//                 <tbody>
//                     {
//                         routesArray.map(
//                             (route) =>
//                             (<tr key={route.locationId}>
//                                 <td>{route.startLocation}</td>
//                                 <td>{route.endLocation}</td>
//                                 <td>{route.fare}</td>
//                                 <td>{route.startTime}</td>
//                                 <td>{route.endTime}</td>
//                                 <td><button className='btn btn-outline-danger active' onClick={() => handleDelete(route.locationId)}>Delete</button></td>
//                                 <td> <button className='btn btn-outline-warning active' type="button"onClick={()=>handleUpdate(route)} >Update</button></td>
                                     
//                             </tr>)
//                         )
//                     }
//                  </tbody>             
//             </table>
     
//             </>
//     );
// }

// function ViewRoute() {

    

//     let [routes, setRoutes] = useState([]);

//     useEffect(() => {
        
//         loadAllData();
//     }, []);

//     const loadAllData = () => {

//         RouteService.viewRoute()
//             .then(
//                 (resp) => {
//                     console.log(resp.data);
//                     //accounts = resp.data;
//                     setRoutes(resp.data);
//                 }
//             )
//             .catch(
//                 (err) => {
//                     console.log(err);
//                 }
//             )
//             .finally(
//                 () => {
//                     console.log("Loaded all data from Server");
//                 }
//             )
//     }

//     // loadAllData();

//     const handleDelete = (id) => {
//         console.log(id);
//        RouteService.deleteRouteById(id)
//         .then(
//             (resp)=>{
//               console.log(resp);      
//               setRoutes(routes.filter((a)=>a.locationId !==id))
//             }
//         )
//         .catch(
//             (err)=>{
//                 console.log(err);
//             }
//         )
//     }

//       const handleUpdate = (route) => {
//             console.log(route);
//              RouteService.updateRoute(route)
//              .then(
//                  (resp)=>{
//                      console.log(resp);
//                      setRoutes(routes.map((a)=>a.locationId === route.locationId ? route : a))
//                  }
//              )
//              .catch(
//                  (err)=>{
//                      console.log(err);
//                  }
//              )
//         }

//     return (
//         <>
//             <h3> Display all Accounts.</h3>
           
//             {
//                routes.length > 0 ? <RoutesTable routesArray={routes} handleDelete={handleDelete} handleUpdate={handleUpdate}/> : <h3> No Accounts found.</h3>
//             }
//         </>
//     );
// }

// export default ViewRoute ;