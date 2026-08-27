import { PageBanner } from "../../components/banner";
import Estimate from "../../components/estimation/Estimate";
import { useEffect } from "react";
import businessModelData from "../../data/businessModel.json";

function BusiessModel({ previewData, onSectionClick }: { previewData?: any; onSectionClick?: (sectionId: string) => void }) {
  useEffect(() => {
    document.title = "Business Model - Whiteboard Tech";
  }, []);

  const data = previewData || businessModelData;
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
      <div className="pt-3 mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-4">
        <section className="grid grid-cols-1 my-10 gap-8 md:grid-cols-2 items-stretch">
          <div
            className={`h-full ${getEditClass("estimate")}`}
            onClick={(e) => handleClick(e, "estimate")}
          >
            <Estimate head={data.estimate.head} />
          </div>
          {data.models.map((model: any, index: number) => {
            return model && (
              <div
                key={index}
                className={`rounded-xl border-2 shadow-lg drop-shadow-lg bg-white h-full flex flex-col justify-between ${getEditClass("models")}`}
                onClick={(e) => handleClick(e, "models")}
              >
                <div className="p-6">
                  <div className="text-2xl text-black flex items-center gap-3 font-semibold">
                    {model.icon && <img src={model.icon} alt="icon" className="w-12 h-12 object-contain shrink-0" />}
                    <span>{model.head}</span>
                  </div>
                  <div 
                    className="mt-4 text-md text-justify text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: model.body }}
                  />
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default BusiessModel;