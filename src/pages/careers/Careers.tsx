import { useEffect, useState } from "react";
import { BannerPropType, PageBanner } from "../../components/banner";
import { HeadSectionType, JobDescType } from ".";
import JobBox from "./JobBox";
import { Link } from "react-router-dom";
import Service from "../../config/service";

const banner: BannerPropType = {
  header: "Careers at",
  subheader: "Whiteboard",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685619/banner-image/career-banner_ccqwcf.jpg",
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
    icon: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685580/icons/people-icon_o8b5nn.png",
    head: "Our People",
    body: "Work with the best and the brightest minds in the industry. Imagine having everyday access to thought leaders and process champions who have been pivotal in driving sustainable construction technologies. At the heart of who we are today, are our people. People who have shared the vision with us and continue to push the frontiers of innovation in our industry.",
  },
  {
    icon: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685576/icons/work-icon_qbsh4o.png",
    head: "Work Environment",
    body: "A state-of-the-art facility that fosters innovation and promotes healthy productivity. A transparent office space that doesn't confine your creative juices and promotes interaction with our awesome community of people. Plus, who doesn't like a good blend of carefully sourced caffeine and a fully loaded pantry with cookies on us round the clock?",
  },
  {
    icon: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685577/icons/tech-icon_e2gofv.png",
    head: "Tools & Technology",
    body: "Get trained and hands-on with every modern software and tools that are used in our tradecraft. We believe if the right people are given the right tools, there is no definitive limit to what they can go out and achieve. From modern BIM tools to contemporary 3D modeling software, we work only with the best to drive outcomes for our clients.",
  },
];

function Careers() {
  const [job, setJob] = useState<JobDescType[]>([]);

  const fetchJob = async () => {
    try {
      const response = await Service.getJob();
      const jobList = response.map((job: any) => ({
        ...job,
      }));
      if (jobList.length === 0) {
        console.warn("No job listings found");
      }
      setJob(jobList);
    } catch (error) {
      console.error("Error fetching job listings", error);
    }
  };
  console.log("Fetched Career job listings:", job);

  useEffect(() => {
    document.title = "Careers - Whiteboard";
    fetchJob();
  }, []);

  return (
    <>
      <PageBanner {...banner} />
      <div className="mx-auto my-0 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="rounded-3xl mt-3 border-2 p-2 grid grid-cols-[60%_40%] gap-3 shadow-md max-md:grid-cols-1">
          <div className="order-1 m-4 leading-loose max-md:order-2">
            <div className="text-3xl font-bold my-2 text-[#6abd45]">
              {headSection.title}
            </div>
            {headSection.description?.map((desc, index) => (
              <p key={index} className="text-lg leading-relaxed text-justify">
                {desc}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap justify-center order-2 max-md:order-1">
            <div className="bg-[#6abd45] rounded-xl flex flex-wrap flex-col w-full h-fit shadow-2xl m-4 mr-8">
              {headSection.tagline?.map((tag, index) => (
                <h1 key={index} className="p-4 pb-2 text-2xl text-white">
                  {tag}
                </h1>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-100">
        <div className="pt-3 mx-auto my-10 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="my-2 text-4xl font-semibold text-black mt-7 px-2">
            Current Openings
          </div>
          <section className="grid grid-cols-1 p-2 mt-3 gap-y-5 gap-x-10 md:grid-cols-2">
            {job.length > 0 ? (
              job
                .filter((j) => j.status)
                .map((jobItem, index) => <JobBox key={index} {...jobItem} />)
            ) : (
              <p className="my-2 mt-3 text-lg text-black">
                No openings at the moment
              </p>
            )}
          </section>

          <div className="my-2 text-4xl font-semibold text-black mt-7 px-2">
            Campus Recruitment
          </div>
          <section className="grid grid-cols-1 p-2 mt-3 gap-y-5 gap-x-10 md:grid-cols-2">
            <div className="bg-white border-2 shadow-md rounded-3xl drop-shadow-md">
              <div className="p-3 m-5">
                <div className="text-[#6abd45] text-2xl font-semibold">
                  Campus Recruitment
                </div>
                <div className="my-2">
                  <div className="text-lg text-gray-700">
                    Location: Bengaluru, India
                  </div>
                  <div className="text-lg text-gray-700">
                    Job Type: Full Time
                  </div>
                  <div className="text-lg text-gray-700">
                    Qualification: Degree
                  </div>
                </div>
                <div className="flex flex-col flex-wrap mt-5 mb-0 md:flex-row justify-evenly">
                  <Link
                    to="http://106.51.141.125:808/#/register"
                    target="_blank"
                    className="border-2 w-1/4 rounded-full border-black border-opacity-50 text-center opacity-80 text-md px-5 py-2 hover:bg-[#6abd45] hover:text-white hover:border-white hover:shadow-lg"
                  >
                    Register ➤
                  </Link>
                  <Link
                    to="http://106.51.141.125:808/#/student/"
                    target="_blank"
                    className="border-2 w-1/4 text-center rounded-full max-md:mt-5 border-black border-opacity-50 opacity-80 text-md px-5 py-2 hover:bg-[#6abd45] hover:text-white hover:border-white hover:shadow-lg"
                  >
                    Test ➤
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <div className="my-2 mt-3 text-lg text-black max-md:mx-2 px-2">
            We might just be a part of the recruitment drive at your college.
            Follow our social handles for more information on campus events.
            {/* Social media icons section */}
          </div>
        </div>
      </div>

      <div className="pt-3 mx-auto my-10 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl scroll-px-2">
        <div className="my-2 text-3xl font-semibold text-black mt-7">
          We continue to attract and retain the best talent because of
        </div>
        <section className="grid grid-cols-1 p-2 mt-3 gap-y-5 gap-x-10 md:grid-cols-3">
          {treeData.map((data, index) => (
            <div
              key={index}
              className="bg-white border-2 shadow-md rounded-3xl"
            >
              <div className="p-3 m-5">
                <div className="flex items-center gap-2 text-xl font-semibold text-black">
                  <img src={data.icon} alt="icon" className="w-10 h-10" />
                  {data.head}
                </div>
                <div className="my-2 text-justify text-gray-700 text-md">
                  {data.body}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="bg-gray-100">
        <div className="pt-3 mx-auto mt-10 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <section className="mt-3 p-2 grid grid-cols-[35%_65%] gap-3 max-md:grid-cols-1">
            <div className="flex flex-wrap items-center justify-center m-5 max-md:h-1/2">
              <img
                src="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753698627/banner-image/a7cd38ce-7cdf-4b7e-b843-52cbbe584baf.png"
                alt="Equal Opportunity"
              />
            </div>
            <div className="flex flex-col flex-wrap justify-center">
              <div className="text-[#6abd45] text-3xl font-semibold">
                Equal Opportunity Employer
              </div>
              <div className="my-2 mr-10 text-lg text-justify">
                Whiteboard is an Equal Opportunity Employer and provides equal
                opportunities to all its employees regardless of their race,
                color, religion, gender, age, disability or marital status. We
                are committed to diversity and inclusion in the workplace and
                treat all our employees and potential employees fairly at all
                times.
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Careers;
