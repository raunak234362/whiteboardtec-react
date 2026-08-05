import { useEffect } from "react";
import { PageBanner } from "../../components/banner";
import ourFirmData from "../../data/ourFirm.json";

function OurFirm({ previewData, onSectionClick }: { previewData?: any; onSectionClick?: (sectionId: string) => void }) {
  useEffect(() => {
    document.title = "Our Firm - Whiteboard";
  }, []);

  const data = previewData || ourFirmData;
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
      <div className={`mx-auto my-0 m-28 lg:max-w-screen-lg xl:max-w-screen-xl ${getEditClass("intro")}`} onClick={(e) => handleClick(e, "intro")}>
        <section className="rounded-3xl mt-3 border-4 p-2 grid grid-cols-[60%_40%] gap-3 shadow-xl drop-shadow-xl max-md:grid-cols-1">
          <div className="order-1 pt-2 pl-4 m-4 max-md:order-2">
            <div className="text-3xl font-bold my-2 text-[#6abd45]">
              {data.intro.heading}
            </div>
            <div
              className="text-lg leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: data.intro.paragraph1 }}
            />
            <div
              className="text-lg leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: data.intro.paragraph2 }}
            />
          </div>

          <div className={`flex flex-wrap justify-center order-2 max-md:order-1 ${getEditClass("visionMission")}`} onClick={(e) => handleClick(e, "visionMission")}>
            <div className="bg-[#6abd45] rounded-xl flex flex-wrap flex-col w-full h-fit shadow-2xl m-4 mr-8 p-4">
              <h1 className="px-4 pt-2 text-3xl font-semibold text-white">
                Vision
              </h1>
              <div
                className="px-4 text-justify text-white text-md"
                dangerouslySetInnerHTML={{ __html: data.visionMission.vision }}
              />
              <h1 className="px-4 pt-4 text-3xl font-semibold text-white">
                Mission
              </h1>
              <div
                className="px-4 pb-4 text-justify text-white text-md"
                dangerouslySetInnerHTML={{ __html: data.visionMission.mission }}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-100">
        <div className={`pt-3 mx-auto lg:max-w-screen-lg xl:max-w-screen-xl ${getEditClass("largeProject")}`} onClick={(e) => handleClick(e, "largeProject")}>
          <section className="mt-3 p-2 grid grid-cols-1 gap-y-5 -gap-x-80 md:grid-cols-[20%_80%] lg:grid-cols-2">
            <div className="flex flex-row items-center justify-center py-4 my-2">
              <img
                src="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685669/insite-images/connection-design_byqy7o.png"
                alt="Have a large project in mind?"
              />
            </div>

            <div className="py-2 my-5">
              <div className="text-4xl text-[#6abd45] m-2">
                <span dangerouslySetInnerHTML={{ __html: data.largeProject.heading.replace("large project", "<strong>large project</strong>") }} />
              </div>
              <div className="m-2 my-5 text-2xl font-bold text-gray-500">
                {data.largeProject.subheading}
              </div>
              <div
                className="m-2 my-5 text-justify text-md"
                dangerouslySetInnerHTML={{ __html: data.largeProject.description }}
              />
              <div className="mx-2 mt-8 text-2xl font-bold text-justify">
                {data.largeProject.conclusion1}
              </div>
              <div className="mx-2 text-2xl font-bold text-justify">
                {data.largeProject.conclusion2}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className={`pt-3 mx-auto lg:max-w-screen-lg xl:max-w-screen-xl ${getEditClass("keyDifferentiators")}`} onClick={(e) => handleClick(e, "keyDifferentiators")}>
        <div className="text-4xl font-semibold my-2 text-[#6abd45] mt-7">
          Our Key Differentiators
        </div>
        <section className="grid grid-cols-1 p-2 mt-3 gap-y-5 gap-x-10 md:grid-cols-2">
          {data.keyDifferentiators.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="bg-white border-2 shadow-lg rounded-3xl drop-shadow-lg"
              >
                <div className="p-3 m-5">
                  <div className="text-2xl font-medium text-black">
                    <img src={item.icon} alt="icon" className="w-14 h-14 inline-block mr-2" />
                    {item.head}
                  </div>
                  <div
                    className="my-2 text-justify text-gray-700 text-md"
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  />
                </div>
              </div>
            );
          })}
        </section>
      </div>

      <div className="bg-[#6abd45]">
        <div className={`pt-2 mx-auto mt-3 lg:max-w-screen-lg xl:max-w-screen-xl ${getEditClass("projectManagement")}`} onClick={(e) => handleClick(e, "projectManagement")}>
          <section className="mt-3 p-2 grid grid-cols-1 gap-y-0 gap-x-0 md:gap-y-5 md:gap-x-10 md:grid-cols-[45%_55%] lg:grid-cols-2">
            <div className="py-2 text-white my-7">
              <div className="text-3xl font-bold">
                {data.projectManagement.heading}
              </div>
              <div
                className="my-3 text-lg text-justify"
                dangerouslySetInnerHTML={{ __html: data.projectManagement.description }}
              />
              <div className="text-2xl font-bold">Features</div>
              <div className="my-2 text-lg text-justify">
                <ul className="list-none list-inside">
                  {data.projectManagement.features.map((feature: any, idx: number) => (
                    <li key={idx} className="flex flex-row justify-start my-1 mr-2">
                      <span className="m-1 mt-0.5">
                        <svg
                          className="w-4 h-4 text-white"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <path stroke="none" d="M0 0h24v24H0z" />{" "}
                          <path
                            d="M18 15l-6-6l-6 6h12"
                            transform="rotate(90 12 12)"
                          />
                        </svg>
                      </span>
                      <span>
                        <span className="flex">{feature}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-10 md:py-4 md:m-2">
              <img
                className="border-2 border-white rounded-md shadow-lg drop-shadow-lg md:m-2"
                src="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753698359/banner-image/c9c368d7-5e65-4718-9da0-3baf162d84f6.png"
                alt="Our Firm"
              />
            </div>
          </section>
        </div>
      </div>

      {/* RENDER ADDITIONAL BLOCKS */}
      {data.additionalBlocks && data.additionalBlocks.length > 0 && (
        <div className="py-8 mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-4 space-y-12">
          {data.additionalBlocks.map((block: any, idx: number) => {
            if (block.type === 'text') {
              return (
                <div 
                  key={idx} 
                  className="prose max-w-none lg:prose-lg text-gray-700" 
                  dangerouslySetInnerHTML={{ __html: block.content }} 
                />
              );
            }
            if (block.type === 'quote') {
              return (
                <div key={idx} className="border-l-8 border-[#6abd45] pl-8 py-4 bg-gray-50 rounded-r-lg my-8 shadow-sm">
                  <p className="text-2xl italic text-gray-700 mb-4 leading-relaxed">"{block.text}"</p>
                  <p className="text-lg font-bold text-[#6abd45]">— {block.author}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </>
  );
}

export default OurFirm;
