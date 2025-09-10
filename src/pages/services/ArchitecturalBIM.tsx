import { useEffect } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";

const banner: BannerPropType = {
  header: "Architectural",
  subheader: "BIM services",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685621/banner-image/bim-banner_utszir.jpg",
};

const headSection: string[] = [
  "As one of the early adopters of the Building Information Modeling (BIM) system, we understand how an elaborate 3D architectural design can set a conceptual project to life. As a matter of fact, our virtual models are so detailed that you can actually assess the feasibility and performance of a design even before the project execution. Putting to work the most up-to-date BIM tools combined with a design-thinking perspective, we generate stunning visual prototypes that count!",
  "As BIM continues to revolutionize the construction industry, we continue to innovate the construction ecosystem with visuals that are enriched with technical clarity. Is it possible to validate the minuscule details with enhanced visualizations? YES, it is. And our portfolio speaks for us.",
];

const BIMDetailing: string[] = [
  "3D, 4D & 5D Architectural Modeling & Design",
  "3D Modeling",
  "Shop Drawings / BIM Construction Plan",
  "Clash Detection",
  "Renders and other associated Visuals",
  "Cost Estimation Services",
];

function ArchitecturalBIM() {
  useEffect(() => {
    document.title = "Architectural BIM Services - Whiteboard Tech";
  });

  return (
    <>
      <PageBanner {...banner} />

      {/* Intro Section */}
      <div className="mx-auto my-16 px-6 md:px-12 lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="rounded-3xl border-2 p-6 lg:p-10 grid grid-cols-[60%_40%] gap-8 shadow-md bg-white max-md:grid-cols-1">
          <div className="order-1 leading-relaxed text-gray-700 max-md:order-2">
            {headSection.map((desc, index) => (
              <p key={index} className="text-lg mb-4 text-justify">
                {desc}
              </p>
            ))}
            <div className="mt-4 text-xl font-semibold text-black">
              Collaborate seamlessly with all stakeholders at every touch point,
              mitigate risks and impact overall revenues.
            </div>
          </div>
          <Estimate head="Get your Architectural BIM Estimates done for FREE. Yes. You heard us right!" />
        </section>
      </div>

      {/* Offerings Section */}
      <div className="bg-gray-100 py-16">
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-12">
          <h2 className="text-3xl font-semibold text-[#6abd45] mb-8">
            Our BIM Architectural Service Offerings
          </h2>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BIMDetailing.map((detail, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg
                  className="h-6 w-6 text-[#6abd45] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M18 15l-6-6l-6 6h12" transform="rotate(90 12 12)" />
                </svg>
                <span className="text-lg">{detail}</span>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-12 bg-white">
        <Newsletter />
      </div>
    </>
  );
}

export default ArchitecturalBIM;
