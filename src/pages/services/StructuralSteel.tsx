/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PageBanner } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";
import {
  CarouselDefault,
  CarouselPropType,
} from "../../components/Carousel/CarouselDefault";
import Service from "../../config/service";
import structuralDetailingData from "../../data/structuralDetailing.json";

function StructuralSteel({ previewData, onSectionClick }: { previewData?: any; onSectionClick?: (sectionId: string) => void }) {
  const [service_images, setServiceImages] = useState<CarouselPropType[]>();

  useEffect(() => {
    document.title = "Structural Steel Detailing - Whiteboard Tech";
  }, []);

  const data = previewData || structuralDetailingData;
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

  const fetchAllGalleryImages = async () => {
    const response = await Service.getGalleryByDepartment("STRUCTURAL");
    const images = response.map((img: any) => ({
      url: img.file.secureUrl,
      title: img.title,
    }));
    setServiceImages(images);
    console.log("Fetched Gallery Images:", response);
  };

  useEffect(() => {
    fetchAllGalleryImages();
  }, []);

  const halfServices = Math.ceil(data.services.length / 2);

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
          {/* Intro + Estimate */}
          <div className="mx-auto my-20 lg:max-w-screen-lg xl:max-w-screen-xl px-4 w-full">
            <section className="rounded-3xl border-2 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 shadow-md bg-white">
              <div 
                className={`leading-loose text-gray-700 p-2 rounded ${getEditClass("intro")}`}
                onClick={(e) => handleClick(e, "intro")}
              >
                <h2 className="text-3xl font-bold mb-4 text-[#6abd45]">
                  {data.intro.title}
                </h2>
                {data.intro.headSection.map((desc: string, index: number) => (
                  <p
                    key={index}
                    className="text-lg leading-relaxed mb-4 text-justify"
                    dangerouslySetInnerHTML={{ __html: desc }}
                  />
                ))}
              </div>
              <div 
                className={`flex justify-center items-center p-2 rounded ${getEditClass("estimate")}`}
                onClick={(e) => handleClick(e, "estimate")}
              >
                <Estimate {...data.estimate} />
              </div>
            </section>
          </div>

          <div 
            className={`py-16 bg-gray-100 rounded-2xl w-full ${getEditClass("services")}`}
            onClick={(e) => handleClick(e, "services")}
          >
            <div className="mx-auto px-6 md:px-12 lg:max-w-screen-lg xl:max-w-screen-xl">
              <h2 className="text-4xl font-bold mb-8 text-[#6abd45]">
                Our Services
              </h2>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* First Column */}
                <div className="flex flex-col gap-4">
                  {data.services.slice(0, halfServices).map((detail: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
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
                      <span className="text-lg">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Second Column */}
                <div className="flex flex-col gap-4">
                  {data.services.slice(halfServices).map((detail: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
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
                      <span className="text-lg">{detail}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Our Portfolio */}
          <div 
            className={`py-16 bg-white w-full ${getEditClass("portfolio")}`}
            onClick={(e) => handleClick(e, "portfolio")}
          >
            <div className="mx-auto px-6 md:px-12 lg:max-w-screen-lg xl:max-w-screen-xl">
              <h2 className="text-4xl font-bold mb-8 text-[#6abd45]">
                Our Portfolio
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {data.portfolio.map((detail: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
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
                ))}
              </div>

              {/* Carousel */}
              <div className="w-full h-96">
                <CarouselDefault images={service_images ?? []} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
}

export default StructuralSteel;
