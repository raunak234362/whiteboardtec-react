import {
  JobPortalResponse,
  ApiResponse,
  PortfolioInterface,
  IProject,
  IJobApplication,
  blogInterface
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

  static async deleteJob(id: string): Promise<void> {
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

  static async editJob(id: string, payload: FormData): Promise<void> {
    console.log("Editing job with ID:", id);
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
      throw error;
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

  static async getCareersApplicants(
    jobroleId: string
  ): Promise<IJobApplication[]> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get<ApiResponse<IJobApplication[]>>(
        `applications/all/${jobroleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getJobApplicant(jobroleid: string): Promise<IJobApplication[]> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get<ApiResponse<IJobApplication[]>>(
        `/applications/${jobroleid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateJobApplicationStatus(
    jobroleid: string,
    applicationId: string,
    status: any
  ): Promise<IJobApplication> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.put<ApiResponse<IJobApplication>>(
        `/applications/update/${jobroleid}/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async ApplyJobApplication(
    formData: FormData,
    jobroleid: string
  ): Promise<IJobApplication> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.post<ApiResponse<IJobApplication>>(
        `/applications/create/${jobroleid}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      alert("Something went wrong while submitting the application.");
      throw error;
    }
  }

  static async deleteapplication(
    jobroleid: string,
    applicationId: string
  ): Promise<void> {
    try {
      const token = sessionStorage.getItem("token");
      await api.delete(`/applications/delete/${jobroleid}/${applicationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Application deleted successfully");
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Something went wrong while deleting the application.");
      throw error;
    }
  }
  static async createBlog(payload: FormData): Promise<blogInterface> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.post("/blog/posts", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const resData = response.data as ApiResponse<blogInterface>;
      return resData.data;
    } catch (error) {
      console.error(error);
      alert("Error creating blog");
      throw error;
    }
  }
  static async getBlogs(): Promise<blogInterface[]> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get<ApiResponse<blogInterface[]>>(
        "/blog/posts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async updateBlog(
    id: string,
    payload: FormData
  ): Promise<blogInterface> {
    try {
      const token = sessionStorage.getItem("token");
      console.log("Updating blog with ID:", id, "Payload:", payload);
      const response = await api.put<ApiResponse<blogInterface>>(
        `/blog/posts/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      alert("Error updating blog");
      throw error;
    }
  }
  static async deleteBlog(id: string): Promise<void> {
    try {
      const token = sessionStorage.getItem("token");
      await api.delete(`/blog/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error(error);
      alert("Error deleting blog");
      throw error;
    }
  }
  static async likes(blogId: string): Promise<number> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.patch<ApiResponse<{ likes: number }>>(
        `/blog/posts/${blogId}/like`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data.likes;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default Service;
