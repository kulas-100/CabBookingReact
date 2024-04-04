import { axiosInstance } from "./axios-httpclient";
class RouteService {
    
    addRoute(route){
        return axiosInstance.post("http://localhost:8090/locations",route);
    }
    viewRoute(){
        return axiosInstance.get("http://localhost:8090/location");
    }
    deleteRouteById(id){
        return axiosInstance.delete("http://localhost:8090/deleteroute/"+id);
    }
    updateRoute(route){
        return axiosInstance.put("http://localhost:8090/updateRoute",route);
    }
    getRoute(id){
        return axiosInstance.get("http://localhost:8090/location/"+id)
    }
}
export default new RouteService();