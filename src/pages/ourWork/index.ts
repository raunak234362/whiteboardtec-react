import OurWork from "./OurWork";
import Portfolio from "./Portfolio";
import { CarouselPropType } from "../../components/Carousel/CarouselDefault";

export type PortfolioPropType = {
    id: string,
    title: string,
    description: string,
    pdf: string,
    images?: CarouselPropType[],
    status?: boolean,
}

export type PortfolioInfoPropType = {
    title: string,
    description: string,
    pdf: string,
}


export { OurWork, Portfolio };