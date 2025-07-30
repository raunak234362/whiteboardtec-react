import {
  JobPortalResponse,
  ApiResponse,
  PortfolioInterface,
  IProject,
  ConnectProps, // Make sure CareerProps is correctly imported
} from "./interface";
import api from "./api"; // Ensure this path is correct

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
      throw error; // Always throw to allow calling component to handle
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
      console.log("Job data:", response.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error; // Propagate the error for handling
    }
  }

  static async deleteJob(id: number): Promise<void> {
    try {
      const token = sessionStorage.getItem("token");
      await api.delete(`/jobrole/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async editJob(id: number, payload: FormData): Promise<void> {
    try {
      const token = sessionStorage.getItem("token");
      await api.put(`/jobrole/update/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async portfolio(payload: FormData) {
    try {
      const token = sessionStorage.getItem("token");
      await api.post(`/portfolioWork/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong, Please try again later");
      throw error; // Always throw to allow calling component to handle
    }
  }

  static async getPortfolio(): Promise<PortfolioInterface[]> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get<ApiResponse<PortfolioInterface[]>>(
        "/portfolioWork/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Portfolio data:", response.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error; // Propagate the error for handling
    }
  }

  static async updatePortfolio(id: string, payload: FormData): Promise<void> {
    try {
      const token = sessionStorage.getItem("token");
      await api.put(`portfolioWork/update/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong while updating the portfolio");
      throw error;
    }
  }

  static async deletePortfolio(id: string): Promise<void> {
    try {
      const token = sessionStorage.getItem("token");
      await api.delete(`/portfolioWork/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong while deleting portfolio");
      throw error;
    }
  }

  static async createGallery(payload: FormData): Promise<void> {
    try {
      const token = sessionStorage.getItem("token");
      await api.post(`/project/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Gallery created successfully");
    } catch (error) {
      console.log(error);
      alert("Something went wrong while creating the gallery");
      throw error;
    }
  }

  static async getGallery(): Promise<IProject[]> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get<ApiResponse<IProject[]>>("/project/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Gallery data:", response.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error; // Propagate the error for handling
    }
  }

  static async getGalleryByDepartment(department: string): Promise<IProject[]> {
    console.log("Fetching gallery for department:", department);
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get<ApiResponse<IProject[]>>(
        `/project/sampleFiles/${department}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Gallery data:", response.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error; // Propagate the error for handling
    }
  }

  static async updateGallery(id: string, payload: FormData): Promise<IProject> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.patch<ApiResponse<IProject>>(
        `/project/update/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Gallery updated successfully");
      return response.data.data;
    } catch (error) {
      console.log(error);
      alert("Something went wrong while updating the gallery");
      throw error;
    }
  }

  static async deleteGallery(id: string): Promise<void> {
    try {
      const token = sessionStorage.getItem("token");
      await api.delete(`/project/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Gallery project deleted successfully!");
    } catch (error) {
      console.error("Error deleting gallery project:", error);
      alert("Something went wrong while deleting the gallery project.");
      throw error;
    }
  }

  static async Gallery(department: string): Promise<IProject[]> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get<ApiResponse<IProject[]>>(
        `/project/sampleFiles/${department}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Gallery data:", response.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error; // Propagate the error for handling
    }
  }

  static async getCareersPdf(): Promise<IProject[]> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get<ApiResponse<IProject[]>>("/project/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("PDF data (from Careers PDF - /project/all):", response.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

 
  static async getformDetails(): Promise<ConnectProps[]> {
    try {
      const token = sessionStorage.getItem("token"); 
      const response = await api.get<ApiResponse<ConnectProps[]>>(
        "api/user/userData", 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Form details data:", response.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async postCareerForm(payload: ConnectProps): Promise<string> {
    try {
;
      const response = await api.post<ApiResponse<any>>(
        "api/user/response", 
        payload
      );
      console.log("Connect form submission response:", response.data);
 
      return response.data.message || "Application submitted successfully!";
    } catch (error: any) {
      console.error("Error submitting career form:", error);
    
      throw new Error(
        error.response?.data?.message ||
          "Failed to submit application. Please try again."
      );
    }
  }
}

export default Service;
