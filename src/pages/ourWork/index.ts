import OurWork from "./OurWork";
import Portfolio from "./Portfolio";
import { CarouselPropType } from "../../components/Carousel/CarouselDefault";

export type PortfolioPropType = {
    title: string,
    description: string,
    pdf: string,
    images?: CarouselPropType[],
}

export type PortfolioInfoPropType = {
    title: string,
    description: string,
    pdf: string,
}


export { OurWork, Portfolio };