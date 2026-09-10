import { useEffect } from "react";
import { PageBanner } from "../../components/banner";
import Estimate from "../../components/estimation/Estimate";
import Newsletter from "../../components/newsletter/Newsletter";
import rebarEstimationData from "../../data/rebarEstimation.json";

function Rebar({ previewData, onSectionClick }: { previewData?: any; onSectionClick?: (sectionId: string) => void }) {
  useEffect(() => {
    document.title = "Rebar Estimation and Detailing - Whiteboard Tech";
  }, []);

  const data = previewData || rebarEstimationData;
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

      <div className="my-16 max-md:mx-3 px-4 flex flex-wrap justify-start items-start mx-auto lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="rounded-3xl border-2 p-4 grid sm:grid-cols-1 lg:grid-cols-[60%_40%] gap-6 shadow-md bg-white">
          <div 
            className={`order-1 m-4 leading-loose text-gray-700 max-md:order-2 p-2 rounded ${getEditClass("headSection")}`}
            onClick={(e) => handleClick(e, "headSection")}
          >
            {data.headSection.description?.map((desc: string, index: number) => {
              return (
                <p 
                  key={index} 
                  className="text-lg leading-relaxed text-justify mb-4"
                  dangerouslySetInnerHTML={{ __html: desc }}
                />
              );
            })}
            {data.headSection.title && (
              <div className="text-2xl font-bold my-2 text-[#6abd45]">
                {data.headSection.title}
              </div>
            )}
          </div>
          <div 
            className={`order-2 flex items-center justify-center p-2 rounded ${getEditClass("estimate")}`}
            onClick={(e) => handleClick(e, "estimate")}
          >
            <Estimate {...data.estimate} />
          </div>
        </section>
      </div>

      {/* Rebar Detailing offerings */}
      <div 
        className={`bg-gray-100 py-12 ${getEditClass("rebarDetailing")}`}
        onClick={(e) => handleClick(e, "rebarDetailing")}
      >
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-7">
          <div className="text-3xl font-semibold text-[#6abd45] mb-8 px-3">
            Rebar Detailing
          </div>
          <section className="grid grid-cols-1 p-2 md:gap-x-10 md:grid-cols-2">
            {data.rebarDetailing.map((detail: string, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-row flex-wrap items-start py-1 md:py-2"
                >
                  <svg
                    className="h-6 w-6 text-[#6abd45] shrink-0 mt-0.5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path
                      d="M18 15l-6-6l-6 6h12"
                      transform="rotate(90 12 12)"
                    />
                  </svg>
                  <p className="text-lg flex max-md:w-[90%] pl-2">{detail}</p>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      {/* Rebar Estimation and Structures */}
      <div 
        className={`py-12 bg-white ${getEditClass("estimationAndStructures")}`}
        onClick={(e) => handleClick(e, "estimationAndStructures")}
      >
        <div className="mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4">
          <section className="grid grid-cols-1 gap-6 p-6 border-2 shadow-md rounded-3xl md:grid-cols-2 bg-white">
            {/* Left Column - Rebar Estimation */}
            <div className="leading-loose text-gray-700">
              <div className="text-3xl font-bold mb-4 text-[#6abd45]">
                {data.rebarEstimation.title}
              </div>
              {data.rebarEstimation.description?.map((detail: string, index: number) => (
                <div key={index} className="flex items-start gap-2 py-2">
                  <svg
                    className="h-6 w-6 text-[#6abd45] shrink-0 mt-1"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M18 15l-6-6l-6 6h12" transform="rotate(90 12 12)" />
                  </svg>
                  <p className="text-lg">{detail}</p>
                </div>
              ))}
            </div>

            {/* Right Column - Structures Detailed */}
            <div className="leading-loose text-gray-700">
              <div className="text-3xl font-bold mb-4 text-[#6abd45]">
                {data.rebarStructures.title}
              </div>
              {data.rebarStructures.description?.map((detail: string, index: number) => (
                <div key={index} className="flex items-start gap-2 py-2">
                  <svg
                    className="h-6 w-6 text-[#6abd45] shrink-0 mt-1"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M18 15l-6-6l-6 6h12" transform="rotate(90 12 12)" />
                  </svg>
                  <p className="text-lg">{detail}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Work Done */}
      <div 
        className={`py-12 bg-white ${getEditClass("workDone")}`}
        onClick={(e) => handleClick(e, "workDone")}
      >
        <div className="mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-6">
          <div className="text-3xl font-semibold my-2 text-[#6abd45] mt-7 px-3">
            Rebar Estimation Work Done
          </div>
          <section className="grid grid-cols-1 mt-3 md:gap-x-10 md:grid-cols-2">
            {data.workDone.map((detail: any, index: number) => {
              return (
                <div
                  className="py-1 mx-4 my-1 md:py-2 flex flex-wrap flex-col items-start max-md:w-[90%]"
                  key={index}
                >
                  <p className="flex text-lg font-medium">{detail.title}</p>
                  <p className="text-md flex text-[#6abd45]">{detail.desc}</p>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      {/* Job Done */}
      <div 
        className={`bg-gray-100 py-12 shadow-inner ${getEditClass("jobDone")}`}
        onClick={(e) => handleClick(e, "jobDone")}
      >
        <div className="mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="text-3xl font-semibold my-2 text-[#6abd45] mt-5 max-md:mx-2 px-7">
            Job Done By Our Teams
          </div>
          <section className="grid grid-cols-1 p-2 mt-3 md:gap-x-10 md:grid-cols-2 px-7">
            {data.jobDone.map((detail: string, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-row flex-wrap items-start py-1 md:py-2"
                >
                  <svg
                    className="h-6 w-6 text-[#6abd45] shrink-0 mt-0.5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path
                      d="M18 15l-6-6l-6 6h12"
                      transform="rotate(90 12 12)"
                    />
                  </svg>
                  <p className="text-lg ml-1 flex max-md:w-[90%] pl-2">{detail}</p>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      <Newsletter />
    </>
  );
}

export default Rebar;
