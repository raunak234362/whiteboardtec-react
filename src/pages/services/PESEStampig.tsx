import { useEffect } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";

const banner: BannerPropType = {
  header: "Connection Design",
  subheader: "and PE/SE Stamping",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685615/banner-image/pese-banner_vqgyve.jpg",
};

const headSection: string[] = [
  "From the simplest to the most complex connection configurations, our experienced team can interpret and achieve detailed drawings that are accurate and in compliance with the AISC Standards at all times. Our scope of services span across Welded, Bolted, Standard, and Non–Standard Shear Connections to Braces and Trusses and everything in between. Complexities motivate us and we take them head-on!",
  "We’re also the “A” team when it comes to dealing with steel connections that require heavy customizations. Fabricators and Erectors have turned to us to help them navigate through the intricate connection design challenges across a range of industries and projects.",
];

function PESEStampig() {
  useEffect(() => {
    document.title = "Connection Design And PE/SE Stamping - Whiteboard Tech";
  });

  return (
    <>
      <PageBanner {...banner} />

      {/* Connection Solutions Section */}
      <div className="mx-auto my-20 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4">
        <section className="rounded-3xl border-2 p-6 grid grid-cols-[60%_40%] gap-6 shadow-md max-md:grid-cols-1">
          <div className="leading-loose text-gray-700">
            <h2 className="text-3xl font-bold mb-4 text-[#6abd45]">
              Connection Solutions
            </h2>
            {headSection?.map((desc, index) => (
              <p
                key={index}
                className="text-lg leading-relaxed text-justify mb-4"
              >
                {desc}
              </p>
            ))}
            <p className="mt-4 text-xl font-semibold text-black">
              Have a complex design project that needs our review? Get in touch
              with us for a free consultation today
            </p>
          </div>

          {/* Estimate Card */}
          <Estimate head="Get your Connection Design and PE/SE Stamping Estimates done for FREE. Yes. You heard us right!" />
        </section>
      </div>

      {/* PE/SE Stamping Section */}
      <div className="bg-gray-100 py-16 shadow-inner">
        <div className="mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4">
          <section className="grid grid-cols-[65%_35%] gap-6 items-center max-md:grid-cols-1">
            {/* Text */}
            <div>
              <h2 className="text-[#6abd45] text-3xl font-semibold mb-4">
                PE/SE Stamping
              </h2>
              <div className="text-lg text-justify space-y-4">
                <p>
                  Through a network of Professional Engineers we have the
                  capability of providing full-spectrum PE/SE Stamping services
                  to Fabricators and Erectors in the U.S & Canada.
                </p>
                <p>
                  Our partners are licensed to practice across all 50 states in
                  the U.S and can certify your calculations with paramount
                  accuracy. We undertake PE/SE reviews for all your project
                  documentation and engineering documents.
                </p>
                <p className="font-semibold">
                  Need your document stamped? Submit your documents on our
                  Project Portal right away
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center items-center">
              <img
                src="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685669/insite-images/connection-design_byqy7o.png"
                alt="PE/SE Stamping"
                className="max-h-80 object-contain"
              />
            </div>
          </section>
        </div>
      </div>

      <Newsletter />
    </>
  );
}

export default PESEStampig;
