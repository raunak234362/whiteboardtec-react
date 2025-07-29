import OurWork from "./OurWork";
import Portfolio from "./Portfolio";

export type PortfolioPropType = {
  id: string;
  title: string;
  description: string;
  pdf?: string;
  file?: any;
  // images?: CarouselPropType[];
  status: "active" | "inactive" | boolean;
};

export type ImagePortfolioPropType = {
  id: string;
  title: string;
  description: string;
  img?: string | string[];
  imageGallery?: string | string[];
  location?: string;
  projectDepartment?: string;
  projectType?: string;
  softwareUsed?: string;
  projectStatus?: string;
};

export type PortfolioInfoPropType = {
  title: string;
  description: string;
  file?: any;
};

export { OurWork, Portfolio };
