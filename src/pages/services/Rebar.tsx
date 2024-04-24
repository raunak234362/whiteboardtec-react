import { useEffect } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import Estimate from "../../components/estimation/Estimate";
import Newsletter from "../../components/newsletter/Newsletter";

const banner: BannerPropType = {
  header: "Rebar Estimation",
  subheader: "and Detailing",
  image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Fbanner-image%2Freber-banner.jpg?alt=media&token=aab957bb-df5b-486f-b8dd-4d12968001d8",
};

const headSection = {
  title:
    "Allow us to help you submit quantitative bids with precise rebar estimates that make you stand out in the crowd.",
  description: [
    "While our detailing estimates cover all data points required by a sales estimator, it definitely helps to forecast the rebar requirements for the fabrication shop as well. Estimating the accurate usage of rebar usage helps in eliminating waste and identifying the crucial accessories that are required during the fabrication process. We understand how important it is to produce an error-free bar bending schedule that fits into the concrete framework avoiding rework and cost over runs.",
    "Using the latest 3D modelling tools and in compliance with the AISC, ASTM, CRSI, ACI, RSIC, IS and BS building codes, our rebar detailers generate precise estimates and drawings that help you visualise your projects.",
  ],
};

const rebarDetailing: string[] = [
  "Rebar placing /Shop drawing as per costumers’ requirement",
  "Bar bending schedules (BBS).",
  "Misc. Site work detailing",
  "Section, Elevation Detail drawings.",
  "Masonry (CMU) wall detailing",
  "ASA bar listing out put",
  "Dwg, pdf, dxf, tiff files.",
];

const rebarEstimation = {
  title: "Rebar Estimation",
  description: [
    "Total estimation summary as per client’s requirement",
    "Rebar Take off summary",
    "List of accessories EX. Chairs, Bolsters, Wire mesh",
    "Out puts is MS Excel, ASA estimation, Soule estimation Formats."
  ],
}

const rebarStructures = {
  title: "Structures Detailed",
  description: [
    "Residential, Commercial, Industrial Buildings",
    "Metro rails & bridges",
    "Parking garages",
    "Oil, Gas and Chemical plants and refineries",
    "Tilt-UP panels",
    "WWTP (Waste Water Treatment Plant)",
  ]
}

const workDone = [
  {
    title: "York county resource recovery centre",
    desc: "Pennsylvania – 572.88 MT"
  },
  {
    title: "York county resource recovery centre",
    desc: "OH – 727.04 MT"
  },
  {
    title: "Baltimore ESA transport facility",
    desc: "Baltimore – 195.17 MT"
  },
  {
    title: "Memorial hospital",
    desc: "Pennsylvania – 231.75 MT"
  },
  {
    title: "Pennsylvania state WWTP",
    desc: "PA – 546.55 MT"
  },
  {
    title: "York County Tipping Hall",
    desc: "PA – 627.38 MT"
  },
  {
    title: "CPV Charles Cooling tower",
    desc: "Pennsylvania – 203.76 MT"
  }
]

const jobDone:string[] = [
  "1 st Place Condos – 900 MT",
  "Burnham Tower – 500MT",
  "Potawatomi Casino – 5000 MT",
  "Johnson City – 2000 MT",
  "UMNC Health Centre – 4000 MT",
  "Gansevoort Park, Bronx Community college – 700 MT",
  "Edison High school – 1000 MT",
]

function Rebar() {
  useEffect(() => {
    document.title = "Rebar Estimation and Detailing - Whiteboard Tech";
  });

  return (
    <>
      <PageBanner {...banner} />
      <div className="m-28 my-0 mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="rounded-3xl mt-3 border-4 p-2 grid grid-cols-[60%_40%] gap-3 shadow-xl drop-shadow-xl max-md:grid-cols-1">
          <div className="m-4 leading-loose text-gray-700 order-1 max-md:order-2">
            {headSection.description?.map((desc, index) => {
              return (
                <p key={index} className="text-justify text-lg leading-relaxed">
                  {desc}
                </p>
              );
            })}
            <div className="text-2xl font-bold my-2 text-[#6abd45]">
              {headSection.title}
            </div>
          </div>
          <Estimate head="Get Rebar Detailing Estimates done for FREE.Yes. You heard us right!" />
        </section>
      </div>

      <div className="bg-gray-100">
        <div className="mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl pt-3 my-10">
          <div className="text-4xl font-bold my-2 text-[#6abd45] mt-5 max-md:mx-2">
            Rebar Detailing
          </div>
          <section className="mt-3 p-2 grid grid-cols-1 md:gap-x-10 md:grid-cols-2">
            {rebarDetailing.map((detail, index) => {
              return (
                <div
                  key={index}
                  className="py-1 md:py-2 flex flex-wrap flex-row items-start"
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
                  <p className="text-lg flex max-md:w-[90%]">{detail}</p>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      <div className="m-28 my-0 mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="rounded-3xl mt-3 border-4 p-2 grid grid-cols-2 max-md:grid-cols-1 gap-3 shadow-xl drop-shadow-xl">
          <div className="m-10 mr-4 leading-loose text-gray-700 max-md:m-4">
            <div className="text-3xl font-bold my-2 text-[#6abd45] max-md:mx-1">
              {rebarEstimation.title}
            </div>
            {rebarEstimation.description?.map((detail, index) => {
              return (
                <div
                  key={index}
                  className="py-1 md:py-2 flex flex-wrap flex-row items-start"
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
                  <p className="text-lg flex max-md:w-[88%]">{detail}</p>
                </div>
              );
            })}
          </div>

          <div className="m-10 ml-4 leading-loose text-gray-700 max-md:m-2">
            <div className="text-3xl font-bold my-2 text-[#6abd45] max-md:m-1">
              {rebarStructures.title}
            </div>
            {rebarStructures.description?.map((detail, index) => {
              return (
                <div
                  key={index}
                  className="py-1 md:py-2 flex flex-wrap flex-row items-start"
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
                  <p className="text-lg flex max-md:w-[88%]">{detail}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl pt-3 mt-5">
          <div className="text-3xl font-semibold my-2 text-[#6abd45] mt-5 max-md:mx-2">
          Rebar Estimation work done
          </div>
          <section className="mt-3 p-2 grid grid-cols-1 md:gap-x-10 md:grid-cols-2">
            {workDone.map((detail, index) => {
              return (
                <div
                  className="py-1 mx-4 my-1 md:py-2 flex flex-wrap flex-col items-start max-md:w-[90%]"
                  key={index} >
                  <p className="text-lg flex">{detail.title}</p>
                  <p className="text-md flex text-[#6abd45]">{detail.desc}</p>
                </div>
              );
            })}
          </section>
        </div>

        <div className="bg-gray-100 shadow-md drop-shadow-md">
        <div className="mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl pt-3 my-10">
          <div className="text-3xl font-semibold my-2 text-[#6abd45] mt-5 max-md:mx-2">
          Job Done By Our Teams
          </div>
          <section className="mt-3 p-2 grid grid-cols-1 md:gap-x-10 md:grid-cols-2">
            {jobDone.map((detail, index) => {
              return (
                <div
                  key={index}
                  className="py-1 md:py-2 flex flex-wrap flex-row items-start"
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
