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
    image:
      "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685614/banner-image/portal-banner_fg0eae.jpg",
  },
  context: {
    title:
      "Structural Detailing Project Management with Whiteboard is now seamless. A tool designed to help you stay responsive and manage all your projects on the go.",
    description: [
      "Upload all your relevant project and bid documents (RFIs, RFQs), and associated drawings and photos in a jiffy.",
      "Collaborate with our team literally from anywhere, at any time, on any device.",
      "Comment, control versions, and respond directly with our team.",
      "Follow your submittals and provide instant feedback.",
      "No upload limit. Supports all file types. PNG, JPEG, & PDF.",
    ],
  },
  portal: [
    {
      url: "https://projectstation.whiteboardtec.com/",
      device: "web",
      image:
        "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1757499575/loginwith_gplziw.png",
    },
  ],
};

function Portal() {
  useEffect(() => {
    document.title = "Portal - Whiteboard";
  });

  return (
    <>
      <PageBanner {...data.banner} />
      {data.context && (
        <section className="rounded-3xl m-28 border-2 p-2 grid grid-cols-[75%_25%] max-md:grid-cols-1 gap-3 shadow-md mx-auto my-10 lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="order-1 pr-10 m-4 max-md:order-2">
            <div className="text-2xl text-justify m-1 text-[#6abd45] font-semibold">
              {data.context.title}
            </div>
            <ul>
              {data.context.description.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-start my-2 mr-2"
                >
                  <span className="m-1 mt-1 text-gray-700">
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

          <div className="flex flex-wrap justify-center order-2 max-md:order-1">
            <div className="bg-[#6abd45] rounded-xl flex flex-wrap flex-col w-full h-full shadow-2xl mx-4 ">
              <h1 className="p-4 pb-2 text-2xl text-white">
                Click here to visit Project Station !
              </h1>
              <div className="flex flex-col flex-wrap justify-center mx-2 mb-2">
                {data.portal.map((item, index) => {
                  return (
                    <a
                      key={index}
                      href={item.url}
                      className="m-2 shadow-2xl rounded-xl h-fit w-fit"
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
