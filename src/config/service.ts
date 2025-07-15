
import {
  JobPortalInterface,
  JobPortalResponse,
  ApiResponse,
} from "./interface";
import api from "./api";

class Service {
  static async JobPortal(payload: FormData) {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.post("/jobrole/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      alert("Something went wrong, Please try again later");
    }
  }
  static async getJob(): Promise<JobPortalResponse[]> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get<ApiResponse<JobPortalResponse[]>>(
        "/jobrole/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data; 
    } catch (error) {
      console.log(error);
      throw error; // Propagate the error for handling
    }
  }
}

export default Service;