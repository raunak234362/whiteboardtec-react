import Header from "./Header"
import Sidebar from "./Sidebar"

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
    Sidebar
}