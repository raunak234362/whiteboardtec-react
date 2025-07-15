export interface JobPortalInterface {
  Role: string;
  location: string;
  type: string;
  qualification: string;
  status:boolean;
  jd: any[];
}

export interface JobPortalResponse {
  id: string;
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
