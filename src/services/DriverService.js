import { axiosInstance } from "./axios-httpclient";

class DriverService {
  addDriver(driver) {
    return axiosInstance.post("http://localhost:8090/driver", driver);
  }

  driverLogin(emailId, password) {
    return axiosInstance.post("http://localhost:8090/driver/login", { emailId, password });
  }

  getDriverById(driverId) {
    return axiosInstance.get(`http://localhost:8090/driver/${driverId}`);
  }

  updateDriver(driver) {
    return axiosInstance.put("http://localhost:8090/driver", driver);
  }

  deleteDriver(driverId) {
    return axiosInstance.delete(`http://localhost:8090/driver/${driverId}`);
  }

  getDriverBookings(driverId) {
    return axiosInstance.get(`http://localhost:8090/driver/${driverId}/bookings`);
  }

  getDriverRides(driverId) {
    return axiosInstance.get(`http://localhost:8090/driver/${driverId}/rides`);
  }

  getDriverRatings(driverId) {
    return axiosInstance.get(`http://localhost:8090/driver/${driverId}/ratings`);
  }
  getDriverName(driverId){
    return axiosInstance.get(`http://localhost:8090/driver/${driverId}`);
  }
  getBookings(id){
    return axiosInstance.get("http://localhost:8090/bookings/"+id);
  }
  driverRatings(id){
    return axiosInstance.get("http://localhost:8090/ratings/"+id);
  }
  leaveApply(leave){
    return axiosInstance.post("http://localhost:8090/leave",leave);
  }
}
export default new DriverService();