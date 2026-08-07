import Header from "./Header"
import Sidebar from "./Sidebar"
import SubNavbar from "./SubNavbar"
import { useSidebar } from "./useSidebar"

type HeaderProp = {
    head: string;
}

export type {
    HeaderProp
}

type CandidateApplication = {
    id: string;
    name: string;
    email: string;
    phone: string;
    resume: string;
}

export type {
    CandidateApplication
}

export {
    Header,
    Sidebar,
    SubNavbar,
    useSidebar
}