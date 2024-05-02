import { useEffect } from "react"
import { PageBanner, BannerPropType } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";

const banner : BannerPropType = {
  header: "Miscellaneous",
  subheader: "Steel Detailing",
  image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Fbanner-image%2Fmisc-banner.jpg?alt=media&token=9443301c-f646-47b9-9df4-c40bfd6b0b73"
}

const headSection:string[] = [
  "Our portfolio spans across structural steel elements such as complex staircases, hand-railings and other intricate misc. steel construction items. We understand the detailing needs from a fabrication point of view and execute comprehensive drawings that are conformed to your unique requirements.",
  "Using the latest 3D modeling tools and in compliance with the AISC code, we will make sure you present your bids on time and in entirety.",
  "no job is too small for us and nothing is miscellaneous when you add an element of technical clarity to it."
]

const MiscCapability:string[] = [
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
]

const MiscType = [
  {
    title: "Types of Railing patterns",
    description: [
      "Picket Type Railing",
      "Inline Rail System",
      "Mesh Type",
    ]
  },
  {
    title: "Types of Stringer Material",
    description: [
      "Channel",
      "Plate",
      "Built-up tube",
      "Rolled tube"
    ]
  },
  {
    title: "Types of Treads",
    description: [
      "Concrete pan",
      "Checkered plate",
      "Tuff tread",
      "Tuff coat"
    ]
  },
  {
    title: "Types of Codes",
    description: [
      "AISC", "IBC", "UBC", "OSHA", "BOCA, etc"
    ]
  }
]

function MiscellaneousSteel() {
  useEffect(()=>{
    document.title = "Miscellaneous Steel Detailing"
  })

  return (
    <>
      <PageBanner {...banner} />
      <div className="m-28 my-0 mx-auto lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="rounded-3xl mt-3 border-2 p-2 grid grid-cols-[60%_40%] gap-3 shadow-md max-md:grid-cols-1">
          <div className="m-4 leading-loose text-gray-700 order-1 max-md:order-2">
            <div className="text-xl font-semibold my-2 text-Black">
            We specialize in miscellaneous steel detailing for residential, commercial and industrial projects.
            </div>
            {headSection?.map((desc, index) => {
              return (
                <p key={index} className="text-justify text-lg leading-relaxed">
                  {desc}
                </p>
              );
            })}
          </div>
          <Estimate head="Get your Miscellaneous Steel Detailing Estimates done for FREE. Yes. You heard us right!" />
        </section>
      </div>

      <div className="bg-gray-100">
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl pt-3 my-10 pb-7">
          <div className="text-3xl font-semibold my-2 text-[#6abd45] mt-5 max-md:mx-3">
          Miscellaneous Detailing team Capabilities
          </div>
          <section className="mt-3 p-2 grid grid-cols-1 md:gap-x-10 md:grid-cols-2">
            {MiscCapability.map((detail, index) => {
              return (
                <span
                  key={index}
                  className="max-md:py-1 py-2 flex flex-wrap flex-row items-start"
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
                  <span className="text-lg inline-flex max-md:w-[90%]">{detail}</span>
                </span>
              );
            })}
          </section>
        </div>
      </div>

      <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl mb-10">
        <section className="rounded-3xl mt-3 border-2 p-2 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2 shadow-md">
          {
            MiscType?.map((type, index) => {
              return(
                <div key={index} className="m-4 leading-loose text-gray-700">
                  <div className="text-xl font-semibold my-2 text-[#6abd45]">
                    {type.title}
                  </div>
                  {type.description?.map((detail, index) => {
                    return (
                      <div
                        key={index}
                        className="py-1 md:py-2 flex flex-wrap flex-row items-center"
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
                        <p className="text-lg flex">{detail}</p>
                      </div>
                    );
                  })}
                </div>
              )
            })
          }

        </section>
      </div>

      <Newsletter />
    </>
  )
}

export default MiscellaneousSteel