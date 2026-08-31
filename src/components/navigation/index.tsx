import { Dialog } from "@headlessui/react";
import Home from "./Home";
import { NavBar } from "./NavBar";
import { useState, useEffect } from "react";
import ExtraHeader from "../header/ExtraHeader";
// import popupimage from "../../../public/popup.png"; // Adjust the path as necessary

import defaultNotificationData from "../../data/notification.json";

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
  enabled?: boolean;
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
    name: "Project Station",
    path: "/portal",
    image:"https://res.cloudinary.com/dp7yxzrgw/image/upload/v1776406740/download_x0mzka.jpg",
   
      
  },
  {
    name: "Careers",
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

const Notification: NotificationType = defaultNotificationData as NotificationType;

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
        <ul className="flex flex-col flex-wrap mx-5 md:flex-row text-md max-md:w-full list-none">
          {window.innerWidth <= 768 && <ExtraHeader />}
          {NavRoute.map((route) => (
            <NavBar key={route.name} {...route} navShow={setnavShow}/>
          ))}
        </ul>
      </nav>
    </>
  );
};

interface HomeNavProps {
  previewNotification?: NotificationType;
}

const HomeNav = ({ previewNotification }: HomeNavProps = {}): JSX.Element => {
  const activeNotification = previewNotification || Notification;
  const isEnabled = activeNotification.enabled !== false;
  const [isOpen, setOpen] = useState(isEnabled);

  useEffect(() => {
    setOpen(activeNotification.enabled == false);
  }, [activeNotification.enabled]);

  return (
    <>
      {isEnabled && (
        <Dialog
          open={isOpen}
          onClose={() => setOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
          <div className="fixed inset-0 w-screen overflow-y-auto p-4 flex items-center justify-center">
            <Dialog.Panel className="bg-white max-h-[85vh] w-11/12 md:w-3/4 lg:w-1/2 rounded-xl p-6 border-2 border-slate-800 drop-shadow-2xl shadow-2xl flex flex-col justify-between overflow-hidden relative">
              {/* Header Info */}
              <div className="shrink-0 mb-2 text-center md:text-left">
                {activeNotification.title && (
                  <Dialog.Title className="text-xl md:text-2xl font-extrabold text-gray-900">
                    {activeNotification.title}
                  </Dialog.Title>
                )}
                {activeNotification.description && (
                  <Dialog.Description className="mt-2 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                    {activeNotification.description}
                  </Dialog.Description>
                )}
              </div>

              {/* Image Container constrained to remaining height */}
              {activeNotification.image && (
                <div className="flex-1 min-h-0 my-3 flex items-center justify-center overflow-hidden">
                  <img
                    src={activeNotification.image}
                    alt={activeNotification.title || "Notification"}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="shrink-0 flex items-center justify-center gap-6 mt-3 pt-3 border-t border-gray-100">
                {activeNotification.link && (
                  <button
                    onClick={() => window.open(activeNotification.link, "_blank")}
                    className="px-6 py-2 text-lg font-semibold text-white bg-green-600 border-2 border-green-600 rounded-md hover:bg-slate-100 hover:border-green-600 hover:text-green-600 transition-colors shadow-sm cursor-pointer"
                  >
                    View
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="px-6 py-2 text-lg font-semibold text-white bg-red-600 border-2 border-red-600 rounded-md hover:bg-slate-100 hover:border-red-600 hover:text-red-600 transition-colors shadow-sm cursor-pointer"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}

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

