import { Dialog } from "@headlessui/react";
import Home from "./Home";
import { NavBar } from "./NavBar";
import { useState } from "react";

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
    image: "/src/assets/image/route-image/our-firm.jpg",
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
    image: "/src/assets/image/route-image/services.jpg",
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
    image: "/src/assets/image/route-image/our-work.jpg",
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
    image: "/src/assets/image/route-image/resources.jpg",
    child: [
      {
        name: "Blog",
        path: "/blog",
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
    image: "/src/assets/image/route-image/portal.jpg",
  },
  {
    name: "Career",
    path: "/career",
    image: "/src/assets/image/route-image/careers.jpg",
  },
  {
    name: "Connect",
    path: "/connect",
    image: "/src/assets/image/route-image/connect.jpg",
  },
];

const Notification: NotificationType = {
    title: "NASCC - The Steel Conference 2024",
    description:
      "We are exhibiting at NASCC - The Steel Conference 2024, at booth number 1623. Click Here to see the floor plan to reach us at the show.",
    link: "https://nascc24.mapyourshow.com/8_0/floorplan/?hallID=A&selectedBooth=1623",
    image: "https://images.unsplash.com/photo-1617854818583-09e7f077a156?q=80"
  }

const NavigationBar = (): JSX.Element => {
  return (
    <>
      <nav className="flex flex-wrap justify-end mr-40">
        <ul className="flex flex-row mx-5 flex-wrap text-sm">
          {NavRoute.map((route) => (
            <NavBar key={route.name} {...route} />
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
          <div className="flex min-h-full items-center justify-center p-4">
                    <Dialog.Panel className="bg-white w-3/5 rounded-3xl p-5 bg-opacity-60 border-slate-800 border-[3px] drop-shadow-lg shadow-inner">
                    <Dialog.Title className="font-extrabold text-2xl">{Notification.title}</Dialog.Title>
                    <Dialog.Description className="text-justify my-3">{Notification.description}</Dialog.Description>
                    {
                        Notification.image && (
                            <div className="items-center flex flex-wrap justify-center">
                                <img src={Notification.image} alt={Notification.title} className="h-60 w-5/6 rounded-2xl"/>
                            </div>
                        )
                    }
                    <div className="items-center flex flex-wrap justify-center my-3">
                    {
                        Notification.link && (
                            <button onClick={() => window.open(Notification.link, '_blank')}
                            className="px-4 mx-5 border-2 border-green-600 bg-green-600 rounded-md font-semibold text-xl text-white hover:bg-slate-200 hover:border-green-600 hover:text-green-600">View</button>
                        )
                    }
                    <button onClick={() => setOpen(false)}
                    className="px-4 mx-5 border-red-600 bg-red-600 rounded-md font-semibold text-xl text-white hover:bg-slate-200 hover:border-red-600 border-2 hover:text-red-600">Close</button>
                    </div>
                </Dialog.Panel>
          </div>
        </div>
      </Dialog>

      <div className="relative flex item-center">
        <div
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth no-scrollbar overflow-y-hidden"
          onWheel={(e) => {
          e.preventDefault();
          const container = e.currentTarget;
          const scrollAmount = e.deltaY;
          container.scrollLeft += (scrollAmount*100);
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

export type {
    NavRouteType,
    NotificationType
};

export { NavigationBar, HomeNav };
