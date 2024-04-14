import { useEffect } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";
import { CarouselDefault, CarouselPropType } from "../../components/Carousel/CarouselDefault";

const banner: BannerPropType = {
  header: "Structural Steel",
  subheader: "Detailing",
  image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Fbanner-image%2Fstructural-stell-banner.jpg?alt=media&token=14415ab1-9e18-4dca-9f61-51ee82b0450c",
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

const service_images : CarouselPropType[] =  [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2FLOVES-894-ISO.png?alt=media&token=ca13ee2a-781c-4516-bbb5-6a6604506c73",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2FPINON-MISC-ISO.png?alt=media&token=e2c99360-f6f1-4453-92b7-ee880a914e04"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2FEast-Chambers-Show-Barn-Addition-ISO.png?alt=media&token=ace6e434-b4f3-4b9c-afbc-5d368aa2b5b2"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2FCross-Creek-Ranch-Fire-Station-ISO.png?alt=media&token=94b13c74-0198-4e81-8488-699afbc41203"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2FTRINITY-ISO.png?alt=media&token=0da83470-01d1-4d68-80a3-dfad99b62529"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2FFreeport-Chilled-Storage-ISO.png?alt=media&token=3df733e9-2ad3-4d55-bbe9-8cbb2a900b47"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2FWest-Fraser-Sawmill-Production-Building-1715-ISO.png?alt=media&token=7540999d-f87e-41c7-9b11-bce6180b4ed7"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2FCUMMINGS-ISO.png?alt=media&token=64587f6d-4fa2-47d5-ace9-23c3817c3100"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2FCollage-1-Jefferson-ISO.png?alt=media&token=be7212a2-8842-412c-92fb-2ed5ce971322"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2FYARBROUGH-ISO.png?alt=media&token=500a72ca-227a-4474-a191-e695df3907ba"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2FPINON-ISO.png?alt=media&token=ed6c67e3-3d5e-484b-98f8-f727612fac8b"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2FKBC-ISO.png?alt=media&token=14d6a871-c7b9-4fd2-89d1-6ae6a2c1c341"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2FTHE-BLOCK-ISO.png?alt=media&token=f731d98d-a8fa-4f5d-b984-5c269ce562f9"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2FTest-Range-Support-Facility-ISO.png?alt=media&token=42e6e401-b9a8-4c97-a469-74793a718b44"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2FPUEBLO-ISO.png?alt=media&token=94f2ea26-d909-4267-9f26-a235ef586298"
  },
]

function StructuralSteel() {
  useEffect(() => {
    document.title = "Structural Steel Detailing - Whiteboard Tech";
  });

  return (
    <>
      <PageBanner {...banner} />
      <div className="m-28 my-0 mx-auto lg:max-w-screen-xl">
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
        <div className="mx-auto lg:max-w-screen-xl pt-3 my-10">
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
                src="https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2Four-services.jpg?alt=media&token=56d33c91-c20d-4d23-bdc3-9d8cae9bb336"
                alt="Equal Opportunity"
              />
            </div>
          </section>
        </div>

        <div className="mx-auto lg:max-w-screen-xl py-3 rounded-3xl border-4 shadow-xl drop-shadow-xl">
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
            <div className="h-60 w-1/2 border-2">
            <CarouselDefault images={service_images} />
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
    </>
  );
}

export default StructuralSteel;
