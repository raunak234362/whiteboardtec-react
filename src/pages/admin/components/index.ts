import Header from "./Header"
import Sidebar from "./Sidebar"
import SubNavbar from "./SubNavbar"

type HeaderProp = {
    head: string;
}

export type {
    HeaderProp
}

export type CandidateApplication = {
    id: string;
    name: string;
    email: string;
    phone: string;
    resume: string;
}

export {
    Header,
    Sidebar,
    SubNavbar
}