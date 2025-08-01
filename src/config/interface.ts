export interface JobPortalInterface {
  id: string;
  Role: string;
  location: string;
  type: string;
  qualification: string;
  status: boolean;
  jd?: any[];
}

export interface JobPortalResponse {
  id: string;
  Role: string;
  location: string;
  type: string;
  qualification: string;
  jd: any[];
  status: "true" | "false";
} 

export interface ApiResponse<Type> {
  success: boolean;
  message: string;
  data: Type;
}

export interface PortfolioInterface {
  id: string;
  title: string;
  description: string;
  file: any[];
  status: boolean;
  pdf?: { path: string }[]; 
}

export type ProjectType =
  | "Institute"
  | "Commercial"
  | "Facility Expension"
  | "Industrial"
  | "Other";

export type ProjectStatus =
  | "Planning"
  | "In Progress"
  | "Completed"
  | "On Hold"
  | "Cancelled";

export interface IProject {
  id: string;
  title: string;
  description: string;
  location: string;
  type: ProjectType;
  technologyused: string;
  status: ProjectStatus;
  images?: string[];
  file: string[];
  createdAt?: string;
  updatedAt?: string;
  department: string;
  __v?: number;
  secureUrl?: string;
}

export interface GalleryProjectFrontend
  extends Omit<IProject, "id" | "status" | "type" | "technologyused"> {
  id: string;
  type: ProjectType;
  status: ProjectStatus;
  technologyused: string;
  onUpdateSuccess: (updatedItem: GalleryProjectFrontend) => void;
  onDeleteSuccess: (deletedId: string) => void;
}

export interface GalleryImagesProps {
  department: string;
}

export interface PortfolioPropType {
  file: any[];
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface ConnectProps {
  name: string;
  email: string;
  phone: string;
  message: string;
  file: File | null;
}
export type ApplicationStatus =
  | "PENDING"
  | "REVIEWED"
  | "INTERVIEW"
  | "OFFERED"
  | "REJECTED"
  | "HIRED";

export interface IJobApplication {
  id: string;
  jobId: string;
  jobTitle: string; 
  applicantName: string;
  email: string;
  phone: string;
  resumeUrl: string; 
  coverLetter?: string;
  appliedDate: string; 
  status: ApplicationStatus; 
  
  [key: string]: any; 
}