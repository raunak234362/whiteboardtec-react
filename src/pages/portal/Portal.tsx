import { BannerPropType } from "../../components/banner";
import { PageBanner } from "../../components/banner";
import { useEffect } from "react";
import Newsletter from "../../components/newsletter/Newsletter";

type ContextType = {
  title: string;
  description: string[];
};

type LinkPropType = {
  url: string;
  device: "web" | "android" | "ios";
};

type PortalPropType = {
  banner: BannerPropType;
  context: ContextType;
  portal: LinkPropType[];
};

const data: PortalPropType = {
  banner: {
    header: "Portal",
    image: "/src/assets/image/banner-image/portal-banner.jpg",
  },
  context: {
    title:
      "Structural Detailing Project Management with Whiteboard now made seamless. A tool designed to help you stay responsive and manage all your projects on the go.",
    description: [
      "Upload all your relevant project, bid documents (RFIs, RFQs), and associated drawings and photos in a jiffy.",
      "Collaborate with our team literally from anywhere, at any time, on any device.",
      "Comment, version control and respond directly with our team.",
      "Follow your submittals and provide instant feedback.",
      "No upload limit. Supports all file types. PNG, JPEG, & PDF.",
    ],
  },
  portal: [
    {
      url: "/web/#",
      device: "web",
    },
    {
      url: "/android/#",
      device: "android",
    },
    {
      url: "/ios/#",
      device: "ios",
    },
  ]
};

function Portal() {


  useEffect(() => {
    document.title = "Portal - Whiteboard";
  })

  return (
    <>
      <PageBanner {...data.banner} />
      {data.context && (
        <section className="rounded-3xl m-28 border-4 p-2 grid grid-cols-[75%_25%] gap-3 shadow-xl drop-shadow-xl mx-auto my-10 lg:max-w-screen-xl">
          <div className="m-4 pr-10">
            <div className="text-xl text-justify m-1 text-[#6abd45]">
              {data.context.title}
            </div>
            <ul>
              {data.context.description.map((item, index) => (
                <div key={index} className="flex-row flex justify-start mr-2 my-2">
                  <span className="text-gray-700 m-1 mt-1">
                    <svg
                      className="h-4 w-4 text-[#6abd45]"
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
                  <span className="text-gray-500">
                    <span className="flex text-sm">{item}</span>
                  </span>
                </div>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap justify-center">
            <div className="bg-[#6abd45] rounded-xl flex flex-wrap flex-col w-full h-fit shadow-2xl mx-4">
            <h1 className="text-white text-xl font-semibold p-4 pb-2">Bridge all gaps and supercharge your projects on the fly.</h1>
              <div className="flex flex-wrap flex-col justify-center mx-2 mb-2">
                {data.portal.map((item, index) => {
                  return (
                    <a
                      key={index}
                      href={item.url}
                      className="m-2 rounded-xl h-fit w-fit shadow-2xl"
                    >
                      <img
                        src={`/src/assets/icon/${item.device}.png`}
                        alt={item.device}
                        className="h-fit w-fit"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
      <Newsletter />
    </>
  );
}

export default Portal;
