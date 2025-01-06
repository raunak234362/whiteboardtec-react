import OurFirm from "./OurFirm";
import Gallery from "./Gallery";
import LeadershipTeam from "./LeadershipTeam";
import BusiessModel from "./BusinessModel";
import PEMB from "./PEMB";
import Structural from "./Structural";
import Tekla from "./Tekla";

type LeaderDetailType = {
    name: string;
    designation: string;
    thoughts: string[];
    sociallink: string;
}

export type {
    LeaderDetailType
}


export {
    OurFirm,
    Gallery,
    LeadershipTeam,
    BusiessModel,
    PEMB,
    Structural,
    Tekla,
}