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
export interface portfolioInterface{
  id: string;
  title: string;
  description: string;
  file: any[];
  status: boolean;
}
