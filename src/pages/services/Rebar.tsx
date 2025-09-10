import { useEffect } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import Estimate from "../../components/estimation/Estimate";
import Newsletter from "../../components/newsletter/Newsletter";

const banner: BannerPropType = {
  header: "Rebar Estimation",
  subheader: "and Detailing",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685614/banner-image/reber-banner_uigcbv.jpg",
};

const headSection = {
  title:
    "Allow us to help you submit quantitative bids with precise rebar estimates that make you stand out in the crowd.",
  description: [
    "While our detailing estimates cover all data points required by a sales estimator, it also helps to forecast the rebar requirements for the fabrication shop. Estimating the accurate usage of rebar helps in eliminating waste and identifying the crucial accessories required during the fabrication process. We understand how important it is to produce an error-free bar bending schedule that fits into the concrete framework, avoiding rework and cost overruns.",
    "Using the latest 3D modeling tools and in compliance with the AISC, ASTM, CRSI, ACI, RSIC, IS, and BS building codes, our rebar detailers generate precise estimates and drawings that help you visualize your projects.",
  ],
};

const rebarDetailing: string[] = [
  "Rebar placing / Shop drawing as per customers’ requirement",
  "Bar bending schedules (BBS).",
  "Miscellaneous site work detailing",
  "Section, Elevation detail drawings",
  "Masonry (CMU) wall detailing",
  "ASA bar listing output",
  "DWG, PDF, DXF, TIFF files",
];

const rebarEstimation = {
  title: "Rebar Estimation",
  description: [
    "Total estimation summary as per client’s requirement",
    "Rebar take-off summary",
    "List of accessories e.g. Chairs, Bolsters, Wire mesh",
    "Outputs in MS Excel, ASA estimation, Soule estimation formats",
  ],
};

const rebarStructures = {
  title: "Structures Detailed",
  description: [
    "Residential, Commercial, Industrial Buildings",
    "Metro rails & bridges",
    "Parking garages",
    "Oil, Gas and Chemical plants and refineries",
    "Tilt-up panels",
    "WWTP (Waste Water Treatment Plant)",
  ],
};

const workDone = [
  {
    title: "York County Resource Recovery Center",
    desc: "Pennsylvania – 572.88 MT",
  },
  {
    title: "York County Resource Recovery Center",
    desc: "OH – 727.04 MT",
  },
  {
    title: "Baltimore ESA Transport Facility",
    desc: "Baltimore – 195.17 MT",
  },
  {
    title: "Memorial Hospital",
    desc: "Pennsylvania – 231.75 MT",
  },
  {
    title: "Pennsylvania State WWTP",
    desc: "PA – 546.55 MT",
  },
  {
    title: "York County Tipping Hall",
    desc: "PA – 627.38 MT",
  },
  {
    title: "CPV Charles Cooling Tower",
    desc: "Pennsylvania – 203.76 MT",
  },
];

const jobDone: string[] = [
  "1st Place Condos – 900 MT",
  "Burnham Tower – 500 MT",
  "Potawatomi Casino – 5000 MT",
  "Johnson City – 2000 MT",
  "UMNC Health Center – 4000 MT",
  "Gansevoort Park, Bronx Community College – 700 MT",
  "Edison High School – 1000 MT",
];

function Rebar() {
  useEffect(() => {
    document.title = "Rebar Estimation and Detailing - Whiteboard Tech";
  });

  return (
    <>
      <PageBanner {...banner} />
      <div className="m-28 max-md:mx-3 mt-0 mb-5 p-4 flex flex-wrap justify-start items-start mx-auto lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="rounded-3xl mt-3 border-2 p-2 grid grid-cols-[60%_40%] gap-3 shadow-md max-md:grid-cols-1">
          <div className="order-1 m-4 leading-loose text-gray-700 max-md:order-2">
            {headSection.description?.map((desc, index) => {
              return (
                <p key={index} className="text-lg leading-relaxed text-justify">
                  {desc}
                </p>
              );
            })}
            <div className="text-2xl font-bold my-2 text-[#6abd45]">
              {headSection.title}
            </div>
          </div>
          <Estimate head="Get Rebar Detailing Estimates FREE. Yes, you heard us right!" />
        </section>
      </div>

      <div className="bg-gray-100">
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-7">
          <div className="text-3xl font-semibold text-[#6abd45] mb-8 px-3">
            Rebar Detailing
          </div>
          <section className="grid grid-cols-1 p-2 mt-3 md:gap-x-10 md:grid-cols-2">
            {rebarDetailing.map((detail, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row flex-wrap items-start py-1 md:py-2"
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
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path
                      d="M18 15l-6-6l-6 6h12"
                      transform="rotate(90 12 12)"
                    />
                  </svg>
                  <p className="text-lg flex max-md:w-[90%]">{detail}</p>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      <div className="py-10 px-4 mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="grid grid-cols-1 gap-6 p-6 mt-6 border-2 shadow-md rounded-3xl md:grid-cols-2">
          {/* Left Column - Rebar Estimation */}
          <div className="leading-loose text-gray-700">
            <div className="text-3xl font-bold mb-4 text-[#6abd45]">
              {rebarEstimation.title}
            </div>
            {rebarEstimation.description?.map((detail, index) => (
              <div key={index} className="flex items-start gap-2 py-2">
                <svg
                  className="h-6 w-6 text-[#6abd45] shrink-0"
                  width="24"
                  height="24"
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
          </div>

          {/* Right Column - Structures Detailed */}
          <div className="leading-loose text-gray-700">
            <div className="text-3xl font-bold mb-4 text-[#6abd45]">
              {rebarStructures.title}
            </div>
            {rebarStructures.description?.map((detail, index) => (
              <div key={index} className="flex items-start gap-2 py-2">
                <svg
                  className="h-6 w-6 text-[#6abd45] shrink-0"
                  width="24"
                  height="24"
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
          </div>
        </section>
      </div>

      <div>
        <div className="mx-auto my-10 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-6">
          <div className="text-3xl font-semibold my-2 text-[#6abd45] mt-7 px-3">
            Rebar Estimation Work Done
          </div>
          <section className="grid grid-cols-1 mt-3 md:gap-x-10 md:grid-cols-2">
            {workDone.map((detail, index) => {
              return (
                <div
                  className="py-1 mx-4 my-1 md:py-2 flex flex-wrap flex-col items-start max-md:w-[90%]"
                  key={index}
                >
                  <p className="flex text-lg">{detail.title}</p>
                  <p className="text-md flex text-[#6abd45]">{detail.desc}</p>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      <div className="bg-gray-100 shadow-md drop-shadow-md ">
        <div className="pt-3 mx-auto my-10 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="text-3xl font-semibold my-2 text-[#6abd45] mt-5 max-md:mx-2 px-7">
            Job Done By Our Teams
          </div>
          <section className="grid grid-cols-1 p-2 mt-3 md:gap-x-10 md:grid-cols-2 px-7">
            {jobDone.map((detail, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row flex-wrap items-start py-1 md:py-2"
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
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path
                      d="M18 15l-6-6l-6 6h12"
                      transform="rotate(90 12 12)"
                    />
                  </svg>
                  <p className="text-lg ml-1 flex max-md:w-[90%]">{detail}</p>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      <Newsletter />
    </>
  );
}

export default Rebar;
