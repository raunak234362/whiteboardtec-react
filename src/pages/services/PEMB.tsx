import { useEffect } from "react"
import { PageBanner, BannerPropType } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";

const banner : BannerPropType = {
  header: "PEMB Detailing",
  image: "/src/assets/image/banner-image/pemb-banner.jpg"
}

const headSection:string[] = [
  "Product innovations are constant to the construction ecosystem. Pre Engineered Buildings bring a myriad of benefits such as reducing construction costs, driving sustainability, flexibility with design and are rapidly gaining traction within the infrastructure spheres. Our experience with PEMB Design and Detailing go deep into critical infrastructure projects.",
  "We specialize in all aspects of PEMB steel detailing with our core practice area being Pre-Engineered Metal Buildings (PEMB), Structural Steel, Hybrid Structures, small or large. Leveraging the most up-to-date 3D modelling and design tools, we bring definitive value to any project. We comply with all leading industry standards such as ASD, LRFD, AISI and MBMA."
]

const pembDetailing:string[] = [
  "Hybrid PEMB & Structural Steel Structures",
  "Buildings with Mezzanines",
  "Buildings with multiple cranes",
  "High bay, low bay buildings",
  "Buildings with Portal Frames",
  "Fixed Based Column Bracings",
  "Heavy Equipment Supporting Platforms",
  "Buildings for Industrial and Commercial Construction",
  "Buildings with Miscellaneous attachments like a staircase, handrails, etc."
]

function PEMB() {
  useEffect(() => {
    document.title = "PEMB Detailing - Whiteboard Tech"
  })

  return (
    <>
      <PageBanner {...banner} />
      <div className="m-28 my-0 ">
        <section className="rounded-3xl mt-3 border-4 p-2 grid grid-cols-[60%_40%] gap-3 shadow-xl drop-shadow-xl">
          <div className="m-4 leading-loose text-gray-700">
            {headSection?.map((desc, index) => {
              return (
                <p key={index} className="text-justify text-sm leading-relaxed">
                  {desc}
                </p>
              );
            })}
          </div>
          <Estimate head="Get your PEMB Detailing Estimates done for FREE. Yes. You heard us right!" />
        </section>
      </div>

      <div className="bg-gray-100">
        <div className="mx-28 pt-3 my-10">
          <div className="text-4xl font-bold my-2 text-[#6abd45] mt-5">
          Our Structural Design Engineering Portfolio Includes
          </div>
          <section className="mt-3 p-2 grid grid-cols-1 md:gap-x-10 md:grid-cols-2">
            {pembDetailing.map((detail, index) => {
              return (
                <div
                  key={index}
                  className="py-1 md:py-2 flex flex-wrap flex-row items-center"
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
          </section>
        </div>
      </div>

      <Newsletter />
    </>
  )
}

export default PEMB