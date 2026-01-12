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
  status: true | false;
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
  file: Files[];
  status: boolean;
}


export type ProjectStatus =
  | "Planning"
  | "In Progress"
  | "Completed"
  | "On Hold"
  | "Cancelled";

export interface IProject {
  projectTitle: string;
  id: string;
  projectID?: any;
  otherType: string;
  title: string;
  description: string;
  location: string;
  type: string;
  technologyused: string;
  designingSoftware?: string;
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
  type: string;
  status: ProjectStatus;
  technologyused: string;
  onUpdateSuccess: (updatedItem: GalleryProjectFrontend) => void;
  onDeleteSuccess: (deletedId: string) => void;
}

export interface GalleryImagesProps {
  department: string;
}

export interface Files {
  size: number;
  fileId?: string;
  fileName?: string;
  path: string;
  secureUrl?: string;
  originalName?: string;
}

export interface PortfolioPropType {
  id: string;
  title: string;
  description: string;
  status: boolean;
  file: Files[] | null;
}

export interface ConnectProps {
  name: string;
  email: string;
  phone: string;
  message: string;
  file: File | null;
}

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
  status: any; 
  
  [key: string]: any; 
}

export interface blogInterface {
  id: string;
  title: string;
  content: string;
  files:JSON
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
  likes: number;
}
