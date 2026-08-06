import { useEffect, useState } from "react";
import { PageBanner } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";
import Service from "../../config/service";
import {
  CarouselDefault,
  CarouselPropType,
} from "../../components/Carousel/CarouselDefault";
import pembDetailingData from "../../data/pembDetailing.json";

function PEMB({ previewData, onSectionClick }: { previewData?: any; onSectionClick?: (sectionId: string) => void }) {
  const [pembImages, setPembImages] = useState<CarouselPropType[]>([]);

  useEffect(() => {
    document.title = "PEMB Detailing - Whiteboard Tech";
    fetchPEMBGalleryImages();
  }, []);

  const data = previewData || pembDetailingData;
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

  const fetchPEMBGalleryImages = async () => {
    try {
      const response = await Service.getGalleryByDepartment("PEMB");
      const images = response.map((img: any) => ({
        url: img.file?.secureUrl,
        title: img.title,
      }));
      setPembImages(images);
    } catch (error) {
      console.error("Error fetching PEMB images", error);
    }
  };

  return (
    <>
      <div
        className={getEditClass("banner")}
        onClick={(e) => handleClick(e, "banner")}
      >
        <PageBanner {...data.banner} />
      </div>

      {/* Head Section */}
      <div className="mx-auto my-16 lg:max-w-screen-lg xl:max-w-screen-xl px-8">
        <section className="rounded-3xl border-2 p-6 grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 shadow-md bg-white">
          <div 
            className={`order-1 leading-loose text-gray-700 max-md:order-2 p-2 rounded ${getEditClass("intro")}`}
            onClick={(e) => handleClick(e, "intro")}
          >
            {data.intro.headSection.map((desc: string, index: number) => (
              <p
                key={index}
                className="text-lg leading-relaxed text-justify mb-4"
                dangerouslySetInnerHTML={{ __html: desc }}
              />
            ))}
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
        className={`bg-gray-100 py-12 ${getEditClass("portfolio")}`}
        onClick={(e) => handleClick(e, "portfolio")}
      >
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-12">
          <h2 className="text-4xl font-bold text-[#6abd45] mb-6">
            Our PEMB Design Engineering Portfolio Includes
          </h2>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.portfolio.map((detail: string, index: number) => (
              <div key={index} className="flex items-start gap-2 py-2">
                <svg
                  className="h-6 w-6 text-[#6abd45] shrink-0 mt-1"
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
          </section>
        </div>
      </div>

      {/* Carousel Section */}
      {pembImages.length > 0 && (
        <div className="py-10 mx-auto my-10 bg-white border-2 shadow-md lg:max-w-screen-lg xl:max-w-screen-xl rounded-3xl px-14">
          <h2 className="text-4xl font-bold text-[#6abd45] mb-6">
            Our PEMB Portfolio
          </h2>
          <div className="w-full h-96">
            <CarouselDefault images={pembImages} />
          </div>
        </div>
      )}

      <Newsletter />
    </>
  );
}

export default PEMB;
