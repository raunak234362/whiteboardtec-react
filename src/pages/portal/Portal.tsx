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
  image: string;
};

type PortalPropType = {
  banner: BannerPropType;
  context: ContextType;
  portal: LinkPropType[];
};

const data: PortalPropType = {
  banner: {
    header: "Portal",
    image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Fbanner-image%2Fportal-banner.jpg?alt=media&token=ba2cd7e6-4283-4fb2-a1b8-4d1519cd7679",
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
      image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Ficon%2Fweb.png?alt=media&token=27bf29ed-2d7b-405a-bc74-fe5c0cf6989c",
    },
    {
      url: "/android/#",
      device: "android",
      image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Ficon%2Fandroid.png?alt=media&token=7e6f8195-2f90-4003-bdc8-80b1f682271d",
    },
    {
      url: "/ios/#",
      device: "ios",
      image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Ficon%2Fios.png?alt=media&token=cf2c825a-40dd-4904-9055-b26d6aaaa62d",
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
        <section className="rounded-3xl m-28 border-4 p-2 grid grid-cols-[75%_25%] gap-3 shadow-xl drop-shadow-xl mx-auto my-10 lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="m-4 pr-10">
            <div className="text-3xl text-justify m-1 text-[#6abd45]">
              {data.context.title}
            </div>
            <ul>
              {data.context.description.map((item, index) => (
                <div key={index} className="flex-row flex justify-start mr-2 my-2">
                  <span className="text-gray-700 m-1 mt-1">
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
                  </span>
                  <span className="text-gray-500">
                    <span className="flex text-lg">{item}</span>
                  </span>
                </div>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap justify-center">
            <div className="bg-[#6abd45] rounded-xl flex flex-wrap flex-col w-full h-fit shadow-2xl mx-4">
            <h1 className="text-white text-2xl font-semibold p-4 pb-2">Bridge all gaps and supercharge your projects on the fly.</h1>
              <div className="flex flex-wrap flex-col justify-center mx-2 mb-2">
                {data.portal.map((item, index) => {
                  return (
                    <a
                      key={index}
                      href={item.url}
                      className="m-2 rounded-xl h-fit w-fit shadow-2xl"
                    >
                      <img
                        src={item.image}
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
