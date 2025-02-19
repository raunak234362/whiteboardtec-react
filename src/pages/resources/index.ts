import { BannerPropType } from "../../components/banner";
import WbtBlog from "./WbtBlog";
import CaseStudies from "./CaseStudies";
import Resources from "./Resources";

type ContextType = {
    head?: string,
    desc?: string,
}

type PostType = {
    title?: string;
    desc?: string;
}

type ResourcePropType = {
    banner: BannerPropType;
    context?: ContextType;
    posts?: PostType;
}


export {
    WbtBlog,
    CaseStudies,
    Resources,
}

export type {
    ResourcePropType,
}