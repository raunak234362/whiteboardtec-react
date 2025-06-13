import { Dialog } from "@headlessui/react";
import Home from "./Home";
import { NavBar } from "./NavBar";
import { useState } from "react";
import ExtraHeader from "../header/ExtraHeader";
// import popupimage from "../../../public/popup.png"; // Adjust the path as necessary

type NavRouteType = {
  name: string;
  path: string;
  image?: string;
  child?: NavRouteType[];
};

type NotificationType = {
  title: string;
  description: string;
  link?: string;
  image?: string;
};

const NavRoute: NavRouteType[] = [
  {
    name: "Our Firm",
    path: "/our-firm",
    image:
      "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Froute-image%2Four-firm.jpg?alt=media&token=f4f4ff27-0291-4589-80a6-b709eae3ed4a",
    child: [
      {
        name: "Business Model",
        path: "/business-model",
      },
      {
        name: "Leadership Teams",
        path: "/leadership-teams",
      },
      {
        name: "Gallery",
        path: "/gallery",
      },
    ],
  },
  {
    name: "Services",
    path: "/services",
    image:
      "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Froute-image%2Fservices.jpg?alt=media&token=1235bf26-7bc6-4286-b3d0-2bb0e76c838b",
    child: [
      {
        name: "Structural Steel Detailing",
        path: "/structural-steel-detailing",
      },
      {
        name: "Miscellaneous Steel Detailing",
        path: "/miscellaneous-steel-detailing",
      },
      {
        name: "Connection Design And PE/SE Stamping",
        path: "/connection-design-and-pe-se-stamping",
      },
      {
        name: "Architectural BIM Services",
        path: "/architectural-bim-services",
      },
      {
        name: "PEMB Detailing",
        path: "/pemb-detailing",
      },
      {
        name: "Rebar Estimation and Detailing",
        path: "/rebar-estimation-and-detailing",
      },
    ],
  },
  {
    name: "Our Work",
    path: "/our-work",
    image:
      "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Froute-image%2Four-work.jpg?alt=media&token=62137c19-1c2a-41cf-b724-e6b4ff227835",
    child: [
      {
        name: "Project Portfolio",
        path: "/project-portfolio",
      },
    ],
  },
  {
    name: "Resources",
    path: "/resources",
    image:
      "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Froute-image%2Fresources.jpg?alt=media&token=0faa19f8-10a9-42fe-8396-717ae696dca7",
    child: [
      {
        name: "WBT Blog",
        path: "/wbt-blog",
      },
      {
        name: "Case Studies",
        path: "/case-studies",
      },
    ],
  },
  {
    name: "Portal",
    path: "/portal",
    image:
      "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Froute-image%2Fportal.jpg?alt=media&token=ffdd2739-0f5e-4195-96ab-91f5f23bc533",
  },
  {
    name: "Career",
    path: "/career",
    image:
      "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Froute-image%2Fcareers.jpg?alt=media&token=f6b3ff73-f527-4d81-a378-d9ad538bcd5c",
  },
  {
    name: "Connect",
    path: "/connect",
    image:
      "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Froute-image%2Fconnect.jpg?alt=media&token=91e42cd8-3d01-4cdb-97e8-a7d1a8bb4851",
  },
];

// const Notification: NotificationType = {
//   title: "NASCC - The Steel Conference 2026",
//   description:
//     "We are exhibiting at NASCC - The Steel Conference 2026. Click Here to see the floor plan to reach us at the show.",
//   link: "https://www.nascc.aisc.org/",
//   image: "https://i.pinimg.com/736x/6a/1b/c0/6a1bc0f2324eb0c143533419ad4c86f5.jpg",
// };

const NavigationBar = (): JSX.Element => {
  const [display] = useState<boolean>(window.innerWidth <= 768);
  const [navShow, setnavShow] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-wrap items-center mr-5" style={{ display: display ? "" : "none" }}
      onClick={() => {
        setnavShow(!navShow);
      }}>
        <svg
          width="8px"
          height="8px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
        >
          <path
            d="M4 18L20 18"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 12L20 12"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 6L20 6"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <nav
        className="flex flex-wrap md:justify-end mx-auto lg:max-w-screen-lg xl:max-w-screen-xl max-md:justify-start"
        style={{ display: display && !navShow ? "none" : "" }}
      >
        <ul className="flex md:flex-row mx-5 flex-wrap text-md flex-col max-md:w-full">
          {window.innerWidth <= 768 && <ExtraHeader />}
          {NavRoute.map((route) => (
            <NavBar key={route.name} {...route} navShow={setnavShow}/>
          ))}
        </ul>
      </nav>
    </>
  );
};

const HomeNav = (): JSX.Element => {
  const [isOpen, setOpen] = useState(true);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 w-screen overflow-y-auto">
          {/* <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="bg-white w-3/5 h-3/4 rounded-3xl p-5 bg-opacity-60 border-slate-800 border-[3px] drop-shadow-lg shadow-inner">
              <Dialog.Title className="font-extrabold text-2xl">
                {Notification.title}
              </Dialog.Title>
              <Dialog.Description className="text-justify my-3">
                {Notification.description}
              </Dialog.Description>
              {Notification.image && (
                <div className="items-center flex flex-wrap justify-center">
                  <img
                    src={Notification.image}
                    alt={Notification.title}
                    className="h-auto w-5/6 rounded-2xl"
                  />
                </div>
              )}
              <div className="items-center flex flex-wrap justify-center my-3">
                {Notification.link && (
                  <button
                    onClick={() => window.open(Notification.link, "_blank")}
                    className="px-4 mx-5 border-2 border-green-600 bg-green-600 rounded-md font-semibold text-xl text-white hover:bg-slate-200 hover:border-green-600 hover:text-green-600"
                  >
                    View
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 mx-5 border-red-600 bg-red-600 rounded-md font-semibold text-xl text-white hover:bg-slate-200 hover:border-red-600 border-2 hover:text-red-600"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div> */}
        </div>
      </Dialog>

      <div className="relative flex item-center md:h-[83vh]">
        <div
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth no-scrollbar overflow-y-hidden max-md:grid max-md:grid-col-1"
          onWheel={(e) => {
            e.preventDefault();
            const container = e.currentTarget;
            const scrollAmount = e.deltaY;
            container.scrollLeft += scrollAmount * 500;
          }}
        >
          {NavRoute.map((route) => (
            <Home key={route.name} {...route} />
          ))}
        </div>
      </div>
    </>
  );
};

export type { NavRouteType, NotificationType };

export { NavigationBar, HomeNav };
