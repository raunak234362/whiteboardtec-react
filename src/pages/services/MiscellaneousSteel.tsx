import { useEffect } from "react";
import { PageBanner } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";
import miscellaneousDetailingData from "../../data/miscellaneousDetailing.json";

function MiscellaneousSteel({ previewData, onSectionClick }: { previewData?: any; onSectionClick?: (sectionId: string) => void }) {
  useEffect(() => {
    document.title = "Miscellaneous Steel Detailing";
  }, []);

  const data = previewData || miscellaneousDetailingData;
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
      <section className="flex flex-wrap justify-center items-start mx-auto w-full">
        <div className="flex flex-wrap flex-col w-full">
          <div className="mx-auto my-20 lg:max-w-screen-lg xl:max-w-screen-xl px-4 w-full">
            <section className="rounded-3xl border-2 p-6 grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 shadow-md bg-white">
              <div 
                className={`order-1 leading-loose text-gray-700 max-md:order-2 p-2 rounded ${getEditClass("intro")}`}
                onClick={(e) => handleClick(e, "intro")}
              >
                <div className="my-2 text-xl font-semibold text-Black" dangerouslySetInnerHTML={{ __html: data.intro.title }} />
                {data.intro.headSection?.map((desc: string, index: number) => {
                  return (
                    <p
                      key={index}
                      className="text-lg leading-relaxed text-justify mb-4"
                      dangerouslySetInnerHTML={{ __html: desc }}
                    />
                  );
                })}
              </div>
              <div 
                className={`flex justify-center items-center order-2 max-md:order-1 p-2 rounded ${getEditClass("estimate")}`}
                onClick={(e) => handleClick(e, "estimate")}
              >
                <Estimate {...data.estimate} />
              </div>
            </section>
          </div>

          <div 
            className={`bg-gray-100 my-5 rounded-2xl w-full ${getEditClass("capabilities")}`}
            onClick={(e) => handleClick(e, "capabilities")}
          >
            <div className="p-8 mx-auto lg:max-w-screen-lg xl:max-w-screen-xl">
              <div className="text-3xl font-semibold text-[#6abd45] mb-6">
                Miscellaneous Detailing team Capabilities
              </div>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.capabilities.map((detail: string, index: number) => {
                  return (
                    <span
                      key={index}
                      className="flex items-start py-2 gap-2"
                    >
                      <svg
                        className="h-6 w-6 text-[#6abd45] shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path
                          d="M18 15l-6-6l-6 6h12"
                          transform="rotate(90 12 12)"
                        />
                      </svg>
                      <span className="text-lg">
                        {detail}
                      </span>
                    </span>
                  );
                })}
              </section>
            </div>
          </div>
        </div>

        <div 
          className={`mx-auto w-full lg:max-w-screen-lg xl:max-w-screen-xl px-4 mt-6 ${getEditClass("miscTypes")}`}
          onClick={(e) => handleClick(e, "miscTypes")}
        >
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 border-2 shadow-md rounded-2xl bg-white mb-20">
            {data.miscTypes?.map((type: any, index: number) => {
              return (
                <div key={index} className="leading-loose text-gray-700">
                  <div className="text-xl font-semibold my-2 text-[#6abd45]">
                    {type.title}
                  </div>
                  {type.description?.map((detail: string, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center py-1 gap-2"
                      >
                        <svg
                          className="h-5 w-5 text-[#6abd45] shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path
                            d="M18 15l-6-6l-6 6h12"
                            transform="rotate(90 12 12)"
                          />
                        </svg>
                        <p className="text-lg">{detail}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </section>
        </div>
      </section>
      <Newsletter />
    </>
  );
}

export default MiscellaneousSteel;
