import { useEffect } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";

const banner: BannerPropType = {
  header: "Miscellaneous",
  subheader: "Steel Detailing",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685618/banner-image/misc-banner_x3hbow.jpg",
};

const headSection: string[] = [
<<<<<<< HEAD
  "Our portfolio spans across structural steel elements such as complex staircases, hand railings and other intricate misc. steel construction items. We understand the detailing needs from a fabrication point of view and execute comprehensive drawings that conform to your unique requirements..",
=======
  "Our portfolio spans across structural steel elements such as complex staircases, hand-railings and other intricate misc. steel construction items. We understand the detailing needs from a fabrication point of view and execute comprehensive drawings that are conformed to your unique requirements.",
>>>>>>> origin/main
  "Using the latest 3D modeling tools and in compliance with the AISC code, we will make sure you present your bids on time and in entirety.",
  "No job is too small for us and nothing is miscellaneous when you add an element of technical clarity to it.",
];

const MiscCapability: string[] = [
  "Egress Stairs (Switch back/Box stair/Scissor stairs) with Railing",
  "Ship ladder",
  "Industrial access stairs with railing",
  "Safety gates",
  "Platform guardrails",
  "Bollards",
  "Platform grating/ checkered plate",
  "Dumpster gate",
  "Ladder with / without gage",
  "Embeds",
];

const MiscType = [
  {
    title: "Types of Railing patterns",
    description: ["Picket Type Railing", "Inline Rail System", "Mesh Type"],
  },
  {
    title: "Types of Stringer Material",
    description: ["Channel", "Plate", "Built-up tube", "Rolled tube"],
  },
  {
    title: "Types of Treads",
    description: ["Concrete pan", "Checkered plate", "Tuff tread", "Tuff coat"],
  },
  {
    title: "Types of Codes",
    description: ["AISC", "IBC", "UBC", "OSHA", "BOCA, etc"],
  },
];

function MiscellaneousSteel() {
  useEffect(() => {
    document.title = "Miscellaneous Steel Detailing";
  });

  return (
    <>
      <PageBanner {...banner} />
      <section className=" flex flex-wrap justify-center items-start mx-auto ">
        <div className="flex flex-wrap flex-col">
          <div className="mx-auto my-0 m-28 lg:max-w-screen-lg xl:max-w-screen-xl">
            <section className="rounded-3xl mt-3 border-2 p-2 grid grid-cols-[60%_40%] gap-3 shadow-md max-md:grid-cols-1">
              <div className="order-1 m-4 leading-loose text-gray-700 max-md:order-2">
                <div className="my-2 text-xl font-semibold text-Black">
                  We specialize in miscellaneous steel detailing for
                  residential, commercial and industrial projects.
                </div>
                {headSection?.map((desc, index) => {
                  return (
                    <p
                      key={index}
                      className="text-lg leading-relaxed text-justify"
                    >
                      {desc}
                    </p>
                  );
                })}
              </div>
              <Estimate head="Get your Miscellaneous Steel Detailing Estimates done for FREE. Yes. You heard us right!" />
            </section>
          </div>

          <div className="bg-gray-100 my-5 rounded-2xl w-screen">
            <div className="p-5 mx-auto my-10 lg:max-w-screen-lg xl:max-w-screen-xl pb-7">
              <div className="text-3xl font-semibold  text-[#6abd45] px-3">
                Miscellaneous Detailing team Capabilities
              </div>
              <section className="grid grid-cols-1 p-2 mt-3 md:gap-x-10 md:grid-cols-2 px-2">
                {MiscCapability.map((detail, index) => {
                  return (
                    <span
                      key={index}
                      className="flex flex-row flex-wrap items-start py-2 max-md:py-1"
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
                      <span className="text-lg inline-flex max-md:w-[90%]">
                        {detail}
                      </span>
                    </span>
                  );
                })}
              </section>
            </div>
          </div>
        </div>
        <div className="mx-auto w-screen lg:max-w-screen-lg xl:max-w-screen-xl">
          <section className="grid grid-cols-1 gap-2 p-2 mt-3 border-2 shadow-md  rounded-2xl md:grid-cols-4 lg:grid-cols-4 px-4">
            {MiscType?.map((type, index) => {
              return (
                <div key={index} className="m-4 leading-loose text-gray-700">
                  <div className="text-xl font-semibold my-2 text-[#6abd45]">
                    {type.title}
                  </div>
                  {type.description?.map((detail, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row flex-wrap items-center py-1 md:py-2"
                      >
                        <svg
                          className="h-6 w-6 text-[#6abd45]"
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
                        <p className="flex text-lg">{detail}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </section>
        </div>
      </section>
      <Newsletter />
    </>
  );
}

export default MiscellaneousSteel;
