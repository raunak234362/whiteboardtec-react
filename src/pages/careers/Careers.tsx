import { useEffect, useState } from "react";
import { PageBanner } from "../../components/banner";
import { JobDescType } from ".";
import JobBox from "./JobBox";
import { Link } from "react-router-dom";
import Service from "../../config/service";
import careersData from "../../data/careers.json";

function Careers({ previewData, onSectionClick }: { previewData?: any; onSectionClick?: (sectionId: string) => void }) {
  const [job, setJob] = useState<JobDescType[]>([]);

  const fetchJob = async () => {
    try {
      const response = await Service.getJob();
      const jobList = response.map((job: any) => ({
        ...job,
      }));
      setJob(jobList);
    } catch (error) {
      console.error("Error fetching job listings", error);
    }
  };

  useEffect(() => {
    document.title = "Careers - Whiteboard";
    fetchJob();
  }, []);

  const data = previewData || careersData;
  const isEditMode = !!onSectionClick;

  const handleClick = (e: React.MouseEvent, sectionId: string) => {
    if (isEditMode && onSectionClick) {
      e.stopPropagation();
      e.preventDefault();
      onSectionClick(sectionId);
    }
  };

  const getEditClass = (_sectionId: string) => {
    return isEditMode
      ? "relative cursor-pointer hover:ring-4 hover:ring-blue-500 hover:ring-opacity-50 transition-all duration-200 rounded-md"
      : "";
  };

  return (
    <>
      <div
        className={getEditClass("banner")}
        onClick={(e) => handleClick(e, "banner")}
      >
        <PageBanner {...data.banner} />
      </div>

      <div className="mx-auto my-16 lg:max-w-screen-lg xl:max-w-screen-xl px-4">
        <section className="rounded-3xl border-2 p-4 grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4 shadow-md bg-white">
          <div 
            className={`order-1 m-4 leading-loose max-md:order-2 p-2 rounded ${getEditClass("headSection")}`}
            onClick={(e) => handleClick(e, "headSection")}
          >
            <div className="text-3xl font-bold my-2 text-[#6abd45]" dangerouslySetInnerHTML={{ __html: data.headSection.title }} />
            {data.headSection.description?.map((desc: string, index: number) => (
              <p 
                key={index} 
                className="text-lg leading-relaxed text-justify mb-4"
                dangerouslySetInnerHTML={{ __html: desc }}
              />
            ))}
          </div>

          <div 
            className={`flex flex-wrap justify-center order-2 max-md:order-1 p-2 rounded ${getEditClass("tagline")}`}
            onClick={(e) => handleClick(e, "tagline")}
          >
            <div className="bg-[#6abd45] rounded-xl flex flex-wrap flex-col w-full h-fit shadow-2xl m-4 p-4">
              {data.headSection.tagline?.map((tag: string, index: number) => (
                <h1 key={index} className="pb-2 text-2xl text-white font-semibold" dangerouslySetInnerHTML={{ __html: tag }} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-100 py-12">
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-4">
          <div className="my-2 text-4xl font-semibold text-black px-2">
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

          <div 
            className={`my-2 text-4xl font-semibold text-black mt-12 px-2 p-2 rounded ${getEditClass("campusRecruitment")}`}
            onClick={(e) => handleClick(e, "campusRecruitment")}
          >
            Campus Recruitment
            <section className="grid grid-cols-1 mt-6 gap-y-5 gap-x-10 md:grid-cols-2">
              <div className="bg-white border-2 shadow-md rounded-3xl p-6">
                <div className="text-[#6abd45] text-2xl font-semibold mb-4" dangerouslySetInnerHTML={{ __html: data.campusRecruitment.title }} />
                <div className="my-2 space-y-1">
                  <div className="text-lg text-gray-700 font-normal">
                    {data.campusRecruitment.location}
                  </div>
                  <div className="text-lg text-gray-700 font-normal">
                    {data.campusRecruitment.jobType}
                  </div>
                  <div className="text-lg text-gray-700 font-normal">
                    {data.campusRecruitment.qualification}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row mt-6 gap-4 justify-start">
                  <Link
                    to={data.campusRecruitment.registerUrl}
                    target="_blank"
                    className="border-2 rounded-full border-black border-opacity-50 text-center text-md px-6 py-2 hover:bg-[#6abd45] hover:text-white hover:border-white hover:shadow-lg transition-all"
                  >
                    Register ➤
                  </Link>
                  <Link
                    to={data.campusRecruitment.testUrl}
                    target="_blank"
                    className="border-2 text-center rounded-full border-black border-opacity-50 text-md px-6 py-2 hover:bg-[#6abd45] hover:text-white hover:border-white hover:shadow-lg transition-all"
                  >
                    Test ➤
                  </Link>
                </div>
              </div>
            </section>
            <div className="my-4 text-lg text-gray-600 font-normal" dangerouslySetInnerHTML={{ __html: data.campusRecruitment.note }} />
          </div>
        </div>
      </div>

      <div 
        className={`py-12 bg-white ${getEditClass("treeData")}`}
        onClick={(e) => handleClick(e, "treeData")}
      >
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-4">
          <div className="my-2 text-3xl font-semibold text-black mb-6">
            We continue to attract and retain the best talent because of
          </div>
          <section className="grid grid-cols-1 p-2 mt-3 gap-y-5 gap-x-10 md:grid-cols-3">
            {data.treeData.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white border-2 shadow-md rounded-3xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 text-xl font-semibold text-black mb-4">
                    {item.icon && <img src={item.icon} alt="icon" className="w-10 h-10 object-contain" />}
                    <span dangerouslySetInnerHTML={{ __html: item.head }} />
                  </div>
                  <div className="text-justify text-gray-600 text-md leading-relaxed" dangerouslySetInnerHTML={{ __html: item.body }} />
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      <div 
        className={`bg-gray-100 py-12 ${getEditClass("equalOpportunity")}`}
        onClick={(e) => handleClick(e, "equalOpportunity")}
      >
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-4">
          <section className="p-2 grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 items-center bg-white rounded-3xl shadow border">
            {data.equalOpportunity.image && (
              <div className="flex items-center justify-center p-4">
                <img
                  src={data.equalOpportunity.image}
                  alt="Equal Opportunity"
                  className="max-h-60 object-contain rounded-xl"
                />
              </div>
            )}
            <div className="flex flex-col justify-center p-4">
              <div className="text-[#6abd45] text-3xl font-semibold mb-4" dangerouslySetInnerHTML={{ __html: data.equalOpportunity.title }} />
              <div className="text-lg text-justify text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.equalOpportunity.body }} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Careers;
