import { axiosInstance } from "./axios-httpclient";
class AdminService {
    addAdmin(admin) {
        return axiosInstance.post("http://localhost:8090/admin",admin);
    }
    adminLogin(cdsId, password) {
        return axiosInstance.post("http://localhost:8090/adminlogin", { cdsId, password });
    }
    getUsers(){
        return axiosInstance.get("http://localhost:8090/showUsers");
    }
    getBookings(){  
        return axiosInstance.get("http://localhost:8090/customerbookings");
    }
  

}
export default new AdminService();