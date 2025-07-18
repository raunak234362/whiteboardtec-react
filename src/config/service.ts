
import {
  JobPortalInterface,
  JobPortalResponse,
  ApiResponse,
  PortfolioInterface,
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
  static async updatePortfolio(
    id: string,
    payload: FormData
  ): Promise<void> {
    try {
      const token = sessionStorage.getItem("token");
      await api.put(`portfolioWork/update/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      });
    } catch (error) {
      console.log(error);
      alert("Soomething wennt wrong while updating the portfolio");
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
      alert("something went wrong while delelting portfolio")
      throw error;
    }
  }
}
export default Service;