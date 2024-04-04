type HeadSectionType = {
    title: string;
    description: string[];
    tagline: string[];
}

type JobDescType = {
    id: string,
    role: string;
    location: string;
    "type": string;
    qualification: string;
    jd: string;
}

type JobListType = {
    jobList: JobDescType[];
    applyMail: string;
}

type 

export type {
    HeadSectionType,
    JobListType,
    JobDescType,
}