/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";
import { CarouselDefault, CarouselPropType } from "../../components/Carousel/CarouselDefault";
import Service from "../../config/service";

const banner: BannerPropType = {
  header: "Structural Steel",
  subheader: "Detailing",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685614/banner-image/services_wmb8hr.jpg",
};

const headSection: string[] = [
  "We mean it when we say; we understand your pressures. The complexity when it comes to execution of incomplete drawings, project fulfillment schedules and frequent cost overruns. You need an experienced detailer like us to step up, quickly understand, get it right and deliver drawings that are error-free and compliant.",
  "As the Steel Industry continues to evolve, we continue to drive fresh perspectives into the Detailing Services ecosystem. Because of our innate ability to understand the process of construction, and how it can impact the build and engineering, we place extreme importance on achieving the synchronization of the material functionality at all touch points.",
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
  "Senior Living Developments"
]

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
  }
  
  useEffect(() => {
    fetchAllGalleryImages();
  }, []);

  return (
    <>
      <PageBanner {...banner} />
      <div className="mx-auto my-0 m-28 lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="rounded-3xl mt-3 border-2 p-2 grid grid-cols-[60%_40%] gap-3 shadow-md max-md:grid-cols-1">
          <div className="order-1 m-4 leading-loose text-gray-700 max-md:order-2">
            <div className="text-3xl font-bold my-2 text-[#6abd45]">
              Steel industry continues to evolve
            </div>
            {headSection?.map((desc, index) => {
              return (
                <p key={index} className="text-lg leading-relaxed text-justify">
                  {desc}
                </p>
              );
            })}
          </div>
          <Estimate head="Get your Steel Detailing Estimates done for FREE. Yes. You heard us right!" />
        </section>
      </div>

      <div className="pb-16 bg-gray-100 shadow-md drop-shadow-md">
        <div className="pt-3 pl-16 mx-auto my-10 max-md:mx-0 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl max-md:px-5">
          <div className="text-4xl font-bold my-2 text-[#6abd45] mt-5">
            Our Services
          </div>
          <section className="flex flex-row flex-wrap mt-3 max-md:flex-col">
            <div className="flex flex-col flex-wrap p-2 mt-3 h-fit lg:w-3/5 md:flex-row">
              {services.map((detail, index) => {
                return (
                  <span
                    key={index}
                    className="flex flex-row flex-wrap items-center w-1/2 my-2 h-fit max-md:w-full"
                  >
                    <svg
                      className="h-6 w-6 text-[#6abd45] inline-flex"
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
                    <span className="inline-flex text-lg">{detail}</span>
                  </span>
                );
              })}
            </div>
            <div className="flex flex-wrap justify-center m-5 item-center ">
              <img
                src="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685663/insite-images/our-services_qnqsre.jpg"
                alt="Equal Opportunity"
              />
            </div>
          </section>
        </div>

        <div className="py-3 mx-auto bg-white border-2 shadow-md lg:max-w-screen-lg xl:max-w-screen-xl rounded-3xl">
          <section className="px-10">
            <div className="text-4xl font-bold mb-0 text-[#6abd45] mt-3">
              Our Portfolio
            </div>
            <section className="flex flex-col flex-wrap p-2 md:flex-row">
              <div className="flex flex-col flex-wrap p-2 h-fit md:flex-row">
                {portfolio.map((detail, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row flex-wrap items-center w-1/3 my-2 h-fit max-md:w-full"
                    >
                      <svg
                        className="h-6 w-6 text-[#6abd45] inline-flex"
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
                      <p className="inline-flex text-lg">{detail}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </section>
          <div className="flex flex-wrap items-center justify-center">
            <div className="w-full h-96 max-md:w-full">
            <CarouselDefault images={service_images ?? []} />
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
    </>
  );
}

export default StructuralSteel;
