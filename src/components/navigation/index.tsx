import Home from "./Home";
import { NavBar } from "./NavBar";

type NavRouteType = {
    name: string;
    path: string;
    image?: string;
    child?: NavRouteType[];
}

const NavRoute: NavRouteType[] = [
    {
        name: "Our Firm",
        path: "/our-firm",
        image: "/src/assets/image/route-image/our-firm.jpg",
        child: [
            {
                name: "Business Model",
                path: "/business-model"
            },
            {
                name: "Leadership Teams",
                path: "/leadership-teams"
            },
            {
                name: "Gallery",
                path: "/gallery"
            }
        ]
    },
    {
        name: "Services",
        path: "/services",
        image: "/src/assets/image/route-image/services.jpg",
        child: [
            {
                name: "Structural Steel Detailing",
                path: "/structural-steel-detailing"
            },
            {
                name: "Miscellaneous Steel Detailing",
                path: "/miscellaneous-steel-detailing"
            },
            {
                name: "Connection Design And PE/SE Stamping",
                path: "/connection-design-and-pe-se-stamping"
            },
            {
                name: "Architectural BIM Services",
                path: "/architectural-bim-services"
            },
            {
                name: "PEMB Detailing",
                path: "/pemb-detailing"
            },
            {
                name: "Rebar Estimation and Detailing",
                path: "/rebar-estimation-and-detailing"
            }
        ]
    },
    {
        name: "Our Work",
        path: "/our-work",
        image: "/src/assets/image/route-image/our-work.jpg",
        child: [
            {
                name: "Project Portfolio",
                path: "/project-portfolio"
            }
        ]
    },
    {
        name: "Resources",
        path: "/resources",
        image: "/src/assets/image/route-image/resources.jpg",
        child: [
            {
                name: "Blog",
                path: "/blog"
            },
            {
                name: "Case Studies",
                path: "/case-studies"
            },
        ]
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
    }
]


const NavigationBar = () : JSX.Element => {
    return (
        <>
            <nav className="flex flex-wrap justify-end mr-40">
                <ul className="flex flex-row mx-5 flex-wrap text-sm">
                    {
                        NavRoute.map((route) => (
                            <NavBar key={route.name} {...route} />
                        ))
                    }
                </ul>
            </nav>
            </>
    )
}


const HomeNav = () : JSX.Element => {

    return (
        <>
            <div className="relative flex item-center">
                <div className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth no-scrollbar overflow-y-hidden">
                    {
                        NavRoute.map((route) => (
                            <Home key={route.name} {...route} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export type {
    NavRouteType,
};

export {
    NavigationBar,
    HomeNav
}