import {
  JobPortalResponse,
  ApiResponse,
  PortfolioInterface,
  IProject,
  
  IJobApplication,
  ApplicationStatus,
} from "./interface";
import api from "./api"; // Ensure this path is correct

class Service {
  /**
   * Creates a new job role.
   * @param payload FormData containing job role details.
   * @returns The API response data.
   */
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

  /**
   * Fetches all job roles.
   * @returns A promise that resolves to an array of JobPortalResponse objects.
   */
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

  /**
   * Deletes a job role by its ID.
   * @param id The ID of the job role to delete (string).
   */
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

  /**
   * Edits an existing job role.
   * @param id The ID of the job role to edit (string).
   * @param payload FormData containing updated job role details.
   */
  static async editJob(id: string, payload: FormData): Promise<void> {
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

  /**
   * Creates a new portfolio entry.
   * @param payload FormData containing portfolio details.
   */
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

  /**
   * Fetches all portfolio entries.
   * @returns A promise that resolves to an array of PortfolioInterface objects.
   */
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

  /**
   * Updates an existing portfolio entry.
   * @param id The ID of the portfolio entry to update.
   * @param payload FormData containing updated portfolio details.
   */
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

  /**
   * Deletes a portfolio entry.
   * @param id The ID of the portfolio entry to delete.
   */
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

  /**
   * Creates a new gallery project entry.
   * @param payload FormData containing gallery project details.
   */
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

  /**
   * Fetches all gallery projects.
   * @returns A promise that resolves to an array of IProject objects.
   */
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

  /**
   * Fetches gallery projects filtered by department.
   * @param department The department to filter by.
   * @returns A promise that resolves to an array of IProject objects.
   */
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

  /**
   * Updates an existing gallery project.
   * @param id The ID of the gallery project to update.
   * @param payload FormData containing updated gallery project details.
   * @returns A promise that resolves to the updated IProject object.
   */
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

  /**
   * Deletes a gallery project.
   * @param id The ID of the gallery project to delete.
   */
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

  /**
   * Fetches gallery projects by department (duplicate of getGalleryByDepartment, keeping for now).
   * @param department The department to filter by.
   * @returns A promise that resolves to an array of IProject objects.
   */
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

  /**
   * Fetches PDF files related to careers (from all projects).
   * @returns A promise that resolves to an array of IProject objects.
   */
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

  /**
   * Fetches all job applications for a specific job role.
   * @param jobroleId The ID of the job role.
   * @returns A promise that resolves to an array of IJobApplication objects.
   */
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

  /**
   * Fetches job applications (this endpoint seems redundant with getCareersApplicants, verify backend).
   * @param jobroleid The ID of the job role.
   * @returns A promise that resolves to an array of IJobApplication objects.
   */
  static async getJobApplications(
    jobroleid: string
  ): Promise<IJobApplication[]> {
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

  /**
   * Updates the status of a specific job application.
   * @param jobroleid The ID of the job role the application belongs to.
   * @param applicationId The ID of the application to update.
   * @param status The new status for the application.
   * @returns A promise that resolves to the updated IJobApplication object.
   */
  static async updateJobApplicationStatus(
    jobroleid: string,
    applicationId: string,
    status: ApplicationStatus
  ): Promise<IJobApplication> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.patch<ApiResponse<IJobApplication>>(
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

  /**
   * Submits a new job application.
   * @param payload FormData containing application details (e.g., resume).
   * @param jobroleid The ID of the job role the application is for.
   * @returns A promise that resolves to the created IJobApplication object.
   */
  static async postJobApplication(
    payload: FormData,
    jobroleid: string
  ): Promise<IJobApplication> {
    try {
      const token = sessionStorage.getItem("token"); // Assuming application submission can be authenticated
      const response = await api.post<ApiResponse<IJobApplication>>(
        `/applications/create/${jobroleid}`,
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
      console.log(error);
      alert("Something went wrong while submitting the application.");
      throw error;
    }
  }

  /**
   * Deletes a specific job application.
   * @param jobroleid The ID of the job role the application belongs to.
   * @param applicationId The ID of the application to delete.
   */
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
}

export default Service;
