import { useEffect } from "react";
import { PageBanner } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";
import connectionDesignData from "../../data/connectionDesign.json";

function PESEStampig({ previewData, onSectionClick }: { previewData?: any; onSectionClick?: (sectionId: string) => void }) {
  useEffect(() => {
    document.title = "Connection Design And PE/SE Stamping - Whiteboard Tech";
  }, []);

  const data = previewData || connectionDesignData;
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

      {/* Connection Solutions Section */}
      <div className="mx-auto my-20 lg:max-w-screen-lg xl:max-w-screen-xl px-4">
        <section className="rounded-3xl border-2 p-6 grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 shadow-md bg-white">
          <div 
            className={`leading-loose text-gray-700 p-2 rounded ${getEditClass("intro")}`}
            onClick={(e) => handleClick(e, "intro")}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#6abd45]" dangerouslySetInnerHTML={{ __html: data.intro.title }} />
            {data.intro.headSection?.map((desc: string, index: number) => (
              <p
                key={index}
                className="text-lg leading-relaxed text-justify mb-4"
                dangerouslySetInnerHTML={{ __html: desc }}
              />
            ))}
            {data.intro.cta && (
              <p className="mt-4 text-xl font-semibold text-black" dangerouslySetInnerHTML={{ __html: data.intro.cta }} />
            )}
          </div>

          {/* Estimate Card */}
          <div 
            className={`flex items-center justify-center p-2 rounded ${getEditClass("estimate")}`}
            onClick={(e) => handleClick(e, "estimate")}
          >
            <Estimate {...data.estimate} />
          </div>
        </section>
      </div>

      {/* PE/SE Stamping Section */}
      <div 
        className={`bg-gray-100 py-16 shadow-inner ${getEditClass("stamping")}`}
        onClick={(e) => handleClick(e, "stamping")}
      >
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-4">
          <section className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6 items-center">
            {/* Text */}
            <div>
              <h2 className="text-[#6abd45] text-3xl font-semibold mb-4" dangerouslySetInnerHTML={{ __html: data.stamping.title }} />
              <div className="text-lg text-justify space-y-4">
                {data.stamping.paragraphs?.map((pText: string, index: number) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: pText }} />
                ))}
                {data.stamping.cta && (
                  <p className="font-semibold text-black pt-2" dangerouslySetInnerHTML={{ __html: data.stamping.cta }} />
                )}
              </div>
            </div>

            {/* Image */}
            {data.stamping.image && (
              <div className="flex justify-center items-center">
                <img
                  src={data.stamping.image}
                  alt="PE/SE Stamping"
                  className="max-h-80 object-contain rounded-xl shadow-sm"
                />
              </div>
            )}
          </section>
        </div>
      </div>

      <Newsletter />
    </>
  );
}

export default PESEStampig;
