import { useEffect } from "react"
import { PageBanner, BannerPropType } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";

const banner: BannerPropType = {
  header: "Architectural",
  subheader: "BIM services",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685621/banner-image/bim-banner_utszir.jpg",
};

const headSection:string[] = [
  "As one of the early adopters of the Building Information Modeling (BIM) system we understand how an elaborate 3D architectural design can set a conceptual project to life. As a matter of fact, our virtual models are so detailed that you can actually assess the feasibility and performance of a design even before the project execution. Putting to work the most up to date BIM tools combined with a design-thinking perspective, we generate stunning visual prototypes that count!",
  "As BIM continues to revolutionise the construction industry, we continue to innovate the construction ecosystem with visuals that are enriched with technical clarity. Is it possible to validate the minuscule details with enhanced visualisations? YES, it is. And our portfolio speaks for us."
]

const BIMDetailing:string[] = [
  "3D, 4D & 5D Architectural Modeling & Design",
  "3D Modeling",
  "Shop Drawings / BIM Construction Plan",
  "3Clash Detection",
  "Renders and other associated Visuals",
  "Cost Estimation Services",
]

function ArchitecturalBIM() {
  useEffect(() => {
    document.title = "Architectural BIM Services - Whiteboard Tech";
  })

  return (
    <>
      <PageBanner {...banner} />
      <div className="mx-auto my-0 m-28 lg:max-w-screen-lg xl:max-w-screen-xl ">
        <section className="rounded-3xl mt-3 border-2 p-2 grid grid-cols-[60%_40%] gap-3 shadow-md max-md:grid-cols-1">
          <div className="order-1 m-4 leading-loose text-gray-700 max-md:order-2">
            {headSection?.map((desc, index) => {
              return (
                <p key={index} className="text-lg leading-relaxed text-justify">
                  {desc}
                </p>
              );
            })}
            <div className="my-2 text-xl font-semibold text-Black">
            Collaborate seamlessly with all stakeholders at every touch point, mitigate risks and impact overall revenues.
            </div>
          </div>
          <Estimate head="Get your Architectural BIM Estimates done for FREE. Yes. You heard us right!" />
        </section>
      </div>

      <div className="bg-gray-100">
        <div className="pt-3 mx-auto my-10  pb-7 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="text-3xl font-semibold my-2 text-[#6abd45] mt-5 max-md:mx-2">
          Our BIM Architectural Service Offerings
          </div>
          <section className="grid grid-cols-1 p-2 mt-3 md:gap-x-10 md:grid-cols-2">
            {BIMDetailing.map((detail, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row flex-wrap items-center py-1 md:py-2"
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
                  <p className="text-lg inline-flex max-md:w-[90%]">{detail}</p>
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

export default ArchitecturalBIM