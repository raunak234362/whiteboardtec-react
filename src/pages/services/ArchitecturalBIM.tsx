import { useEffect } from "react";
import { PageBanner } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";
import architecturalBIMData from "../../data/architecturalBIM.json";

function ArchitecturalBIM({ previewData, onSectionClick }: { previewData?: any; onSectionClick?: (sectionId: string) => void }) {
  useEffect(() => {
    document.title = "Architectural BIM Services - Whiteboard Tech";
  }, []);

  const data = previewData || architecturalBIMData;
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

      {/* Intro Section */}
      <div className="mx-auto my-16 px-6 md:px-12 lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="rounded-3xl border-2 p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 shadow-md bg-white">
          <div 
            className={`order-1 leading-relaxed text-gray-700 max-md:order-2 p-2 rounded ${getEditClass("intro")}`}
            onClick={(e) => handleClick(e, "intro")}
          >
            {data.intro.headSection.map((desc: string, index: number) => (
              <p 
                key={index} 
                className="text-lg mb-4 text-justify"
                dangerouslySetInnerHTML={{ __html: desc }}
              />
            ))}
            {data.intro.cta && (
              <div className="mt-4 text-xl font-semibold text-black">
                {data.intro.cta}
              </div>
            )}
          </div>
          
          <div 
            className={`flex items-center justify-center p-2 rounded ${getEditClass("estimate")}`}
            onClick={(e) => handleClick(e, "estimate")}
          >
            <Estimate {...data.estimate} />
          </div>
        </section>
      </div>

      {/* Offerings Section */}
      <div 
        className={`bg-gray-100 py-16 ${getEditClass("offerings")}`}
        onClick={(e) => handleClick(e, "offerings")}
      >
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-12">
          <h2 className="text-3xl font-semibold text-[#6abd45] mb-8">
            Our BIM Architectural Service Offerings
          </h2>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.offerings.map((detail: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <svg
                  className="h-6 w-6 text-[#6abd45] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M18 15l-6-6l-6 6h12" transform="rotate(90 12 12)" />
                </svg>
                <span className="text-lg">{detail}</span>
              </div>
            ))}
          </section>
        </div>
      </div>

      <Newsletter />
    </>
  );
}

export default ArchitecturalBIM;
