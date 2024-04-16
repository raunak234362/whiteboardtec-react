import { BannerPropType, PageBanner } from "../../components/banner";
import { HeadSectionType, JobDescType } from ".";
import { useCallback, useEffect, useState } from "react";
import JobBox from "./JobBox";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

const banner: BannerPropType = {
  header: "Careers at",
  subheader: "Whiteboard",
  image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Fbanner-image%2Fcareer-banner.jpg?alt=media&token=1f9ef382-ebae-4663-aec6-927f675d26be",
};

const headSection: HeadSectionType = {
  title: "Our people just don't get to work because they have to.",
  description: [
    "They get to work knowing the work they do is substantially important in shaping up the future of how steel is being used in construction. They realize that their contributions lead to ground-breaking realities and innovations across a diverse range of sectors. They are a part of our team because what we do matters. We are on a mission to create a sustainable future and a better tomorrow.",
    "We're super passionate about what we do and we need like-minded individuals who can join us in our revolutionary journey. If you have the skills, we have the opportunities, technologies, and resources that will expand your learning horizons.",
  ],
  tagline: [
    "Innovate, Collaborate and Thrive!",
    "Be empowered to change the world with us!",
  ],
};

const treeData = [
  {
    icon: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Ficon%2Fpeople-icon.png?alt=media&token=b32abb2d-08f8-4703-8a60-93a1b07cc9cf",
    head: "Our People",
    body: "Work with the best and the brightest minds in the industry. Imagine having everyday access to thought leaders and process champions who have been pivotal in driving sustainable construction technologies. At the heart of who we are today, are our people. People who have shared the vision with us and continue to push the frontiers of innovation in our industry."
  },
  {
    icon: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Ficon%2Fwork-icon.png?alt=media&token=8eecf9dd-f504-467c-b7e7-b0750d3b3542",
    head: "Work Environment",
    body: "A state-of-the-art facility that fosters innovation and promotes healthy productivity. A transparent office space that doesn’t confine your creative juices and promotes interaction with our awesome community of people. Plus, who doesn’t like a good blend of carefully sourced caffeine and a fully loaded pantry with cookies on us round the clock?"
  },
  {
    icon: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Ficon%2Ftech-icon.png?alt=media&token=07fa5299-c7bf-42c3-86a8-7290b5030897",
    head: "Tools & Technology",
    body: "Get trained and hands-on with every modern software and tools that are used in our tradec“raft. We believe if the right people are given the right tools, there is no definitive limit to what they can go out and achieve. From modern BIM tools to contemporary 3D modeling software, we work only with the best to drive outcomes for our clients."
  }
]


function Careers() {
  const [job, setJob] = useState<JobDescType[]>([]);

  const fetchJob = useCallback(async () => {
    const career = collection(db, "career");
    const jobs = query(career, where("status", "==", true));
    const querySnapshot = await getDocs(jobs);
    const data = querySnapshot.docs.map((doc) => ({
      id: String(doc.id),
      ...doc.data(),
    }));
    setJob(data as JobDescType[]); // Fix: Cast 'data' as 'JobDescType[]'
  }, []);

  useEffect(() => {
    document.title = "Careers - Whiteboard";
    fetchJob();
  }, []);

  return (
    <>
      <PageBanner {...banner} />
      <div className="mx-auto my-0 lg:max-w-screen-xl">
        <section className="rounded-3xl mt-3 border-4 p-2 grid grid-cols-[60%_40%] gap-3 shadow-xl drop-shadow-xl">
          <div className="m-4 leading-loose">
            <div className="text-2xl font-bold my-2 text-[#6abd45]">
              {headSection.title}
            </div>
            {headSection.description?.map((desc, index) => {
              return (
                <p key={index} className="text-justify text-sm leading-relaxed">
                  {desc}
                </p>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center">
            <div className="bg-[#6abd45] rounded-xl flex flex-wrap flex-col w-full h-fit shadow-2xl m-4 mr-8">
              {headSection.tagline?.map((tag, index) => {
                return (
                  <h1 key={index} className="text-white text-2xl p-4 pb-2">
                    {tag}
                  </h1>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      <div className="bg-gray-100">
        <div className="pt-3 my-10 mx-auto lg:max-w-screen-xl">
          <div className="text-4xl font-semibold my-2 text-black mt-7">
            Current Openings
          </div>

          <section className="mt-3 p-2 grid grid-cols-1 gap-y-5 gap-x-10 md:grid-cols-2">
            {
              (job.length > 0) && (
                job?.map((job, index) => {
                  return job.status && (
                    <JobBox key={index} {...job} />
                  );
                })
              ) || (
                <p className="text-lg my-2 text-black mt-3">
                  No openings at the moment
                </p>
              )
            }
          </section>

          <div className="text-4xl font-semibold my-2 text-black mt-7">
            Campus Recruitment
          </div>

          <div className="text-md my-2 text-black mt-3">
            We might just be a part of the recruitment drive at your college.
            Follow our social handles for more information on campus events.
            <div className="flex-row flex items-center ml-2">
              <span className="[&>svg]:h-5 [&>svg]:w-5 m-2">
                <button
                  type="button"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  onClick={() => {
                    window.open(
                      "https://www.facebook.com/whiteboardtec/",
                      "_blank"
                    );
                  }}
                  style={{ backgroundColor: "#1877f2" }}
                  className="mb-2 inline-block rounded bg-[#1877f2] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                >
                  <span className="[&>svg]:h-4 [&>svg]:w-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                    </svg>
                  </span>
                </button>
              </span>
              <span className="[&>svg]:h-6 [&>svg]:w-6 m-2">
                <button
                  type="button"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  onClick={() => {
                    window.open(
                      "https://www.instagram.com/whiteboardtec/",
                      "_blank"
                    );
                  }}
                  style={{ backgroundColor: "#c13584" }}
                  className="mb-2 inline-block rounded bg-[#c13584] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                >
                  <span className="[&>svg]:h-4 [&>svg]:w-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                  </span>
                </button>
              </span>
              <span className="[&>svg]:h-6 [&>svg]:w-6 m-2">
                <button
                  type="button"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  onClick={() => {
                    window.open(
                      "https://www.linkedin.com/company/whiteboardtec",
                      "_blank"
                    );
                  }}
                  style={{ backgroundColor: "#0077b5" }}
                  className="mb-2 inline-block rounded bg-[#0077b5] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                >
                  <span className="[&>svg]:h-4 [&>svg]:w-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                    >
                      <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                    </svg>
                  </span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-3 my-10 mx-auto lg:max-w-screen-xl">
        <div className="text-2xl font-semibold my-2 text-black mt-7">
          We continue to attract and retain the best talent because of
        </div>
        <section className="mt-3 p-2 grid grid-cols-1 gap-y-5 gap-x-10 md:grid-cols-3">
          {treeData.map((data, index) => {
            return (
              <div
                key={index}
                className="rounded-3xl border-2 shadow-lg drop-shadow-lg bg-white"
              >
                <div className="m-5 p-3">
                  <div className="text-[#6abd45] text-lg font-semibold">
                    <img src={data.icon} alt="icon" className="w-10 h-10" />
                    {data.head}
                  </div>
                  <div className="my-2 text-gray-700 text-sm text-justify">
                    {data.body}
                  </div>
                </div>
              </div>
            );
          })}
          </section>
      </div>

      <div className="bg-gray-100">
        <div className="pt-3 mt-10 mx-auto my-0 lg:max-w-screen-xl">
          <section className="mt-3p-2 grid grid-cols-[35%_65%] gap-3">
            <div className="flex flex-wrap item-center justify-center m-5">
              <img src="https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2Fequal-opportunity.png?alt=media&token=5a88a52e-4519-426c-967f-8ff0e5226f18" alt="Equal Opportunity"/>
            </div>
            <div className="flex flex-wrap flex-col justify-center">
              <div className="text-[#6abd45] text-2xl font-semibold">
              Equal Opportunity Employer
              </div>
              <div className="text-sm text-justify my-2 mr-10">
              Whiteboard is an Equal Opportunity Employer and provides equal opportunities to all its employees regardless of their race, color, religion, gender, age, disability or marital status. We are committed to diversity and inclusion in the workplace and treat all our employees and potential employees fairly at all times.
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Careers;
