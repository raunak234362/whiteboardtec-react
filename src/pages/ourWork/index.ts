import OurWork from "./OurWork";
import Portfolio from "./Portfolio";
import { CarouselPropType } from "../../components/Carousel/CarouselDefault";

export type PortfolioPropType = {
  id: string;
  title: string;
  description: string;
  pdf: string;
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
  pdf: string;
};

export { OurWork, Portfolio };
