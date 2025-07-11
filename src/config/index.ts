export interface JobPortalInterface {
  Role: string;
  location: string;
  type: string;
  qualification: string;
  status:boolean;
  files:JSON|File
}