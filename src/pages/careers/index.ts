type HeadSectionType = {
    title: string;
    description: string[];
    tagline: string[];
}

type JobDescType = {
    id: string,
    Role: string;
    location: string;
    "type": string;
    qualification: string;
    jd: string;
    status: boolean;
}

type JobListType = {
    jobList: JobDescType[];
    applyMail: string;
}

export type {
    HeadSectionType,
    JobListType,
    JobDescType,
}