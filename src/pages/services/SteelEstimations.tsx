import { useEffect } from "react";
import { PageBanner } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";
import { ClipboardList, FileText, Scale, Ruler } from "lucide-react";
import steelEstimationData from "../../data/steelEstimation.json";

const iconMap: { [key: string]: React.ReactNode } = {
  FileText: <FileText className="w-12 h-12 text-[#6abd45]" />,
  ClipboardList: <ClipboardList className="w-12 h-12 text-[#6abd45]" />,
  Scale: <Scale className="w-12 h-12 text-[#6abd45]" />,
  Ruler: <Ruler className="w-12 h-12 text-[#6abd45]" />
};

function SteelEstimation({ previewData, onSectionClick }: { previewData?: any; onSectionClick?: (sectionId: string) => void }) {
  useEffect(() => {
    document.title = "Steel Estimation & Take-Off Services - Whiteboard Tech";
  }, []);

  const data = previewData || steelEstimationData;
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
      <div className="mx-auto my-16 lg:max-w-screen-lg xl:max-w-screen-xl px-6">
        <section className="rounded-3xl border-2 p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 shadow-md bg-white">
          {/* LEFT SIDE - Content + Image */}
          <div 
            className={`flex flex-col justify-between p-2 rounded ${getEditClass("intro")}`}
            onClick={(e) => handleClick(e, "intro")}
          >
            <div className="leading-relaxed text-gray-700 mb-6">
              <p className="text-3xl font-bold text-[#6abd45] mb-4">
                {data.intro.title}
              </p>
              {data.intro.headSection.map((desc: string, index: number) => (
                <p
                  key={index}
                  className="text-lg leading-relaxed mb-4 text-justify text-gray-700"
                  dangerouslySetInnerHTML={{ __html: desc }}
                />
              ))}
            </div>

            {/* Image */}
            {data.intro.image && (
              <div className="h-[220px] md:h-[200px] rounded-2xl overflow-hidden shadow-md">
                <img
                  src={data.intro.image}
                  alt="Steel Estimation Example"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* RIGHT SIDE - Estimate Card */}
          <div 
            className={`flex items-center justify-center p-2 rounded ${getEditClass("estimate")}`}
            onClick={(e) => handleClick(e, "estimate")}
          >
            <Estimate {...data.estimate} />
          </div>
        </section>
      </div>

      {/* Our Take-Offs */}
      <div 
        className={`bg-gray-100 py-16 ${getEditClass("takeoffs")}`}
        onClick={(e) => handleClick(e, "takeoffs")}
      >
        <div className="mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-6">
          <h2 className="text-3xl font-semibold mb-8 text-[#6abd45]">
            Our Detailed Take-Offs Cover
          </h2>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.takeoffs.map((detail: string, index: number) => {
              const [heading, description] = detail.split(":");
              return (
                <div
                  key={index}
                  className="bg-white text-gray-800 p-6 rounded-2xl shadow-md border"
                >
                  <h3 className="text-xl font-semibold mb-2">{heading}</h3>
                  <p className="text-base">{description?.trim()}</p>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      {/* Our Deliverables Section */}
      <div 
        className={`py-16 bg-white ${getEditClass("deliverables")}`}
        onClick={(e) => handleClick(e, "deliverables")}
      >
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-6">
          <h2 className="text-3xl font-semibold mb-8 text-[#6abd45]">
            Our Deliverables
          </h2>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.deliverables.map((item: any, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-md border"
              >
                <div className="mb-4 bg-gray-50 p-4 rounded-full shadow-inner">
                  {iconMap[item.iconKey] || <FileText className="w-12 h-12 text-[#6abd45]" />}
                </div>
                <p className="text-base text-gray-700 font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-12 bg-white">
        <Newsletter />
      </div>
    </>
  );
}

export default SteelEstimation;
