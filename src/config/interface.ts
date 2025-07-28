export interface JobPortalInterface {
  id: number;
  Role: string;
  location: string;
  type: string;
  qualification: string;
  status: "active" | "inactive";
  jd: string;
}

export interface JobPortalResponse {
  id: number;
  Role: string;
  location: string;
  type: string;
  qualification: string;
  jd: string; // Or URL if file is uploaded
  status: "active" | "inactive";
}
export interface ApiResponse<Type> {
  success: boolean;
  message: string;
  data: Type;
} 

export interface PortfolioInterface{
  id: string;
  title: string;
  description: string;
  file: any[];
  status: boolean;
 // Assuming pdf is a string URL or path
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
// Define ProjectType

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
