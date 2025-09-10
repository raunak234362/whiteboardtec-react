/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";
import {
  CarouselDefault,
  CarouselPropType,
} from "../../components/Carousel/CarouselDefault";
import Service from "../../config/service";

const banner: BannerPropType = {
  header: "Structural Steel",
  subheader: "Detailing",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685614/banner-image/services_wmb8hr.jpg",
};

const headSection: string[] = [
  "We mean it when we say, we understand your pressures. The complexity when it comes to the execution of incomplete drawings, project fulfillment schedules and frequent cost overruns. You need an experienced detailer like us to step up, quickly understand, get it right and deliver drawings that are error-free and compliant.",
  "As the Steel Industry continues to evolve, we continue to drive fresh perspectives into the Detailing Services ecosystem. Because of our innate ability to understand the process of construction, and how it can impact the construction and engineering, we place extreme importance on achieving the synchronization of material functionality at all touch points.",
];

const services: string[] = [
  "3D Modeling",
  "Creation of Shop Drawings",
  "Erection Drawings",
  "Connection Design Coordination",
  "BIM Coordination",
  "Project Management",
];

const portfolio: string[] = [
  "Residential Projects",
  "Industrial Projects",
  "High-Rise Developments",
  "Commercial Buildings",
  "Energy Efficient Buildings",
  "Warehouses",
  "Aircraft Hangers",
  "Senior Living Developments",
];

function StructuralSteel() {
  const [service_images, setServiceImages] = useState<CarouselPropType[]>();

  useEffect(() => {
    document.title = "Structural Steel Detailing - Whiteboard Tech";
  });

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

  return (
    <>
      <PageBanner {...banner} />
      <section className=" flex flex-wrap justify-center items-start mx-auto ">
        <div className="flex flex-wrap flex-col">
          {/* Intro + Estimate */}
          <div className="mx-auto my-20 lg:max-w-screen-lg xl:max-w-screen-xl">
            <section className="rounded-3xl border-2 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 shadow-md bg-white">
              <div className="leading-loose text-gray-700">
                <h2 className="text-3xl font-bold mb-4 text-[#6abd45]">
                  Steel industry continues to evolve
                </h2>
                {headSection.map((desc, index) => (
                  <p
                    key={index}
                    className="text-lg leading-relaxed mb-4 text-justify"
                  >
                    {desc}
                  </p>
                ))}
              </div>
              <div className="flex justify-center items-center">
                <Estimate head="Get your Steel Detailing Estimates done for FREE. Yes. You heard us right!" />
              </div>
            </section>
          </div>

          <div className="py-16 bg-gray-100 rounded-2xl w-screen">
            <div className="mx-auto px-6 md:px-12 lg:max-w-screen-lg xl:max-w-screen-xl">
              <h2 className="text-4xl font-bold mb-8 text-[#6abd45]">
                Our Services
              </h2>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* First Column */}
                <div className="flex flex-col gap-4">
                  {services.slice(0, 3).map((detail, index) => (
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
                  {services.slice(3, 6).map((detail, index) => (
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
          <div className="py-16 bg-white">
            <div className="mx-auto px-6 md:px-12 lg:max-w-screen-lg xl:max-w-screen-xl">
              <h2 className="text-4xl font-bold mb-8 text-[#6abd45]">
                Our Portfolio
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {portfolio.map((detail, index) => (
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
