import { useEffect } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";
import { CarouselDefault } from "../../components/Carousel/CarouselDefault";

const banner: BannerPropType = {
  header: "Structural Steel",
  subheader: "Detailing",
  image: "/src/assets/image/banner-image/structural-stell-banner.jpg",
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
  useEffect(() => {
    document.title = "Structural Steel Detailing - Whiteboard Tech";
  });

  return (
    <>
      <PageBanner {...banner} />
      <div className="m-28 my-0 ">
        <section className="rounded-3xl mt-3 border-4 p-2 grid grid-cols-[60%_40%] gap-3 shadow-xl drop-shadow-xl">
          <div className="m-4 leading-loose text-gray-700">
            <div className="text-2xl font-bold my-2 text-[#6abd45]">
              Steel industry continues to evolve
            </div>
            {headSection?.map((desc, index) => {
              return (
                <p key={index} className="text-justify text-sm leading-relaxed">
                  {desc}
                </p>
              );
            })}
          </div>
          <Estimate head="Get your Steel Detailing Estimates done for FREE. Yes. You heard us right!" />
        </section>
      </div>

      <div className="bg-gray-100 shadow-md drop-shadow-md pb-16">
        <div className="mx-28 pt-3 my-10">
          <div className="text-4xl font-bold my-2 text-[#6abd45] mt-5">
            Our Services
          </div>
          <section className="mt-3 flex flex-wrap md:flex-row flex-col">
            <div className="mt-3 p-2 h-fit flex flex-wrap flex-col w-2/3 md:flex-row">
              {services.map((detail, index) => {
                return (
                  <div
                    key={index}
                    className=" h-fit w-1/2 my-2 flex flex-wrap flex-row items-center"
                  >
                    <svg
                      className="h-4 w-4 text-[#6abd45] inline-flex"
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
                    <p className="text-sm inline-flex">{detail}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap item-center justify-center m-5">
              <img
                src="/src/assets/image/insite-images/our-services.jpg"
                alt="Equal Opportunity"
              />
            </div>
          </section>
        </div>

        <div className="mx-28 py-3 rounded-3xl border-4 shadow-xl drop-shadow-xl">
          <section className="px-10">
            <div className="text-4xl font-bold mb-0 text-[#6abd45] mt-3">
              Our Portfolio
            </div>
            <section className="p-2 flex flex-wrap md:flex-row flex-col">
              <div className="p-2 h-fit flex flex-wrap flex-col md:flex-row">
                {portfolio.map((detail, index) => {
                  return (
                    <div
                      key={index}
                      className=" h-fit w-1/3 my-2 flex flex-wrap flex-row items-center"
                    >
                      <svg
                        className="h-4 w-4 text-[#6abd45] inline-flex"
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
                      <p className="text-sm inline-flex">{detail}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </section>
          <div className="flex flex-wrap items-center justify-center">
            <div className="h-60 w-1/2 border-2 ">
                <CarouselDefault/>
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
    </>
  );
}

export default StructuralSteel;
