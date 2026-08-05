import { useEffect } from "react";
import { PageBanner } from "../../components/banner";
import ourFirmData from "../../data/ourFirm.json";

function OurFirm() {
  useEffect(() => {
    document.title = "Our Firm - Whiteboard";
  }, []);

  return (
    <>
      <PageBanner {...ourFirmData.banner} />
      <div className="mx-auto my-0 m-28 lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="rounded-3xl mt-3 border-4 p-2 grid grid-cols-[60%_40%] gap-3 shadow-xl drop-shadow-xl max-md:grid-cols-1">
          <div className="order-1 pt-2 pl-4 m-4 max-md:order-2">
            <div className="text-3xl font-bold my-2 text-[#6abd45]">
              {ourFirmData.intro.heading}
            </div>
            <p className="text-lg leading-relaxed text-justify">
              {ourFirmData.intro.paragraph1}
            </p>
            <p className="text-lg leading-relaxed text-justify">
              {ourFirmData.intro.paragraph2}
            </p>
          </div>

          <div className="flex flex-wrap justify-center order-2 max-md:order-1">
            <div className="bg-[#6abd45] rounded-xl flex flex-wrap flex-col w-full h-fit shadow-2xl m-4 mr-8 p-4">
              <h1 className="px-4 pt-2 text-3xl font-semibold text-white">
                Vision
              </h1>
              <p className="px-4 text-justify text-white text-md">
                {ourFirmData.visionMission.vision}
              </p>
              <h1 className="px-4 pt-4 text-3xl font-semibold text-white">
                Mission
              </h1>
              <p className="px-4 pb-4 text-justify text-white text-md">
                {ourFirmData.visionMission.mission}
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-100">
        <div className="pt-3 mx-auto lg:max-w-screen-lg xl:max-w-screen-xl">
          <section className="mt-3 p-2 grid grid-cols-1 gap-y-5 -gap-x-80 md:grid-cols-[20%_80%] lg:grid-cols-2">
            <div className="flex flex-row items-center justify-center py-4 my-2">
              <img
                src="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685669/insite-images/connection-design_byqy7o.png"
                alt="Have a large project in mind?"
              />
            </div>

            <div className="py-2 my-5">
              <div className="text-4xl text-[#6abd45] m-2">
                <span dangerouslySetInnerHTML={{ __html: ourFirmData.largeProject.heading.replace("large project", "<strong>large project</strong>") }} />
              </div>
              <div className="m-2 my-5 text-2xl font-bold text-gray-500">
                {ourFirmData.largeProject.subheading}
              </div>
              <div className="m-2 my-5 text-justify text-md">
                {ourFirmData.largeProject.description}
              </div>
              <div className="mx-2 mt-8 text-2xl font-bold text-justify">
                {ourFirmData.largeProject.conclusion1}
              </div>
              <div className="mx-2 text-2xl font-bold text-justify">
                {ourFirmData.largeProject.conclusion2}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="pt-3 mx-auto lg:max-w-screen-lg xl:max-w-screen-xl">
        <div className="text-4xl font-semibold my-2 text-[#6abd45] mt-7">
          Our Key Differentiators
        </div>
        <section className="grid grid-cols-1 p-2 mt-3 gap-y-5 gap-x-10 md:grid-cols-2">
          {ourFirmData.keyDifferentiators.map((data, index) => {
            return (
              <div
                key={index}
                className="bg-white border-2 shadow-lg rounded-3xl drop-shadow-lg"
              >
                <div className="p-3 m-5">
                  <div className="text-2xl font-medium text-black">
                    <img src={data.icon} alt="icon" className="w-14 h-14 inline-block mr-2" />
                    {data.head}
                  </div>
                  <div className="my-2 text-justify text-gray-700 text-md">
                    {data.body}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>

      <div className="bg-[#6abd45]">
        <div className="pt-2 mx-auto mt-3 lg:max-w-screen-lg xl:max-w-screen-xl">
          <section className="mt-3 p-2 grid grid-cols-1 gap-y-0 gap-x-0 md:gap-y-5 md:gap-x-10 md:grid-cols-[45%_55%] lg:grid-cols-2">
            <div className="py-2 text-white my-7">
              <div className="text-3xl font-bold">
                {ourFirmData.projectManagement.heading}
              </div>
              <div className="my-3 text-lg text-justify">
                {ourFirmData.projectManagement.description}
              </div>
              <div className="text-2xl font-bold">Features</div>
              <div className="my-2 text-lg text-justify">
                <ul className="list-none list-inside">
                  {ourFirmData.projectManagement.features.map((feature, idx) => (
                    <li key={idx} className="flex flex-row justify-start my-1 mr-2">
                      <span className="m-1 mt-0.5">
                        <svg
                          className="w-4 h-4 text-white"
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
                      </span>
                      <span>
                        <span className="flex">{feature}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-10 md:py-4 md:m-2">
              <img
                className="border-2 border-white rounded-md shadow-lg drop-shadow-lg md:m-2"
                src="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753698359/banner-image/c9c368d7-5e65-4718-9da0-3baf162d84f6.png"
                alt="Our Firm"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default OurFirm;
