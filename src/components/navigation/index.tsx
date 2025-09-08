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
      "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685708/route-image/our-firm_qbwtod.jpg",
    child: [
      {
        name: "Business Model",
        path: "/business-model",
      },
      {
        name: "Leadership Team",
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
      "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685704/route-image/services_cmbnnq.jpg",
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
        name: "Steel Estimation and Take-Off Services",
        path: "/steel-estimation-and-take-off",
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
      // {
      //   name: "Steel Estimation and Take-Off Services",
      //   path: "/steel-estimation-and-take-off",
      // }
    ],
  },
  {
    name: "Our Work",
    path: "/our-work",
    image:
      "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685705/route-image/our-work_vjdmss.jpg",
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
      "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685704/route-image/resources_twem7r.jpg",
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
      "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685704/route-image/portal_nn6wrw.jpg",
  },
  {
    name: "Career",
    path: "/career",
    image:
      "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685704/route-image/services_cmbnnq.jpg",
  },
  {
    name: "Connect",
    path: "/connect",
    image:
      "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685709/route-image/connect_rrusr9.jpg",
  },
];

const Notification: NotificationType = {
  title: "NASCC - The Steel Conference 2026",
  description:
    "We are exhibiting at NASCC - The Steel Conference 2026. Click Here to see the floor plan to reach us at the show.",
  // link: "https://www.nascc.aisc.org/",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685709/route-image/careers_jvwsl8.jpg",
};

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
          className="w-8 h-8"
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
        className="flex flex-wrap mx-auto md:justify-end lg:max-w-screen-lg xl:max-w-screen-xl max-md:justify-start"
        style={{ display: display && !navShow ? "none" : "" }}
      >
        <ul className="flex flex-col flex-wrap mx-5 md:flex-row text-md max-md:w-full">
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
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <Dialog.Panel className="bg-white w-3/5 h-3/4 rounded-3xl p-5 bg-opacity-60 border-slate-800 border-[3px] drop-shadow-lg shadow-inner">
              <Dialog.Title className="text-2xl font-extrabold">
                {Notification.title}
              </Dialog.Title>
              <Dialog.Description className="my-3 text-justify">
                {Notification.description}
              </Dialog.Description>
              {Notification.image && (
                <div className="flex flex-wrap items-center justify-center">
                  <img
                    src={Notification.image}
                    alt={Notification.title}
                    className="w-5/6 h-auto rounded-2xl"
                  />
                </div>
              )}
              <div className="flex flex-wrap items-center justify-center my-3">
                {Notification.link && (
                  <button
                    onClick={() => window.open(Notification.link, "_blank")}
                    className="px-4 mx-5 text-xl font-semibold text-white bg-green-600 border-2 border-green-600 rounded-md hover:bg-slate-200 hover:border-green-600 hover:text-green-600"
                  >
                    View
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 mx-5 text-xl font-semibold text-white bg-red-600 border-2 border-red-600 rounded-md hover:bg-slate-200 hover:border-red-600 hover:text-red-600"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>

      <div className="relative flex item-center md:h-[83vh]">
        <div
          className="w-full h-full overflow-x-scroll overflow-y-hidden scroll whitespace-nowrap scroll-smooth no-scrollbar max-md:grid max-md:grid-col-1"
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
