import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="flex flex-col h-full text-white bg-gray-900">
        <div>
          <NavLink to="/">
            <div className="flex items-center justify-center h-fit my-2.5">
              <img
                src="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685727/logos/whiteboardtec-logo_oztrhh.png"
                alt="logo"
                className="w-8 h-8 mx-1"
              />
              <h1 className="text-2xl font-bold">Whiteboard</h1>
            </div>
          </NavLink>
        </div>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-2.5 h-fit  ${
              isActive ? "bg-[#6abd45]" : "bg-gray-800 hover:bg-gray-500"
            }`
          }
        >
          <div>
            <h1 className="font-semibold text-md">Dashboard</h1>
          </div>
        </NavLink>
        <NavLink
          to="/admin/blog" // New route for admin blog management
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-2.5 h-fit  ${
              isActive ? "bg-[#6abd45]" : "bg-gray-800 hover:bg-gray-500"
            }`
          }
        >
          <div>
            <h1 className="font-semibold text-md">Blog</h1>
          </div>
        </NavLink>

        <NavLink
          to="/admin/gallery"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-2.5 h-fit  ${
              isActive ? "bg-[#6abd45]" : "bg-gray-800 hover:bg-gray-500"
            }`
          }
        >
          <div>
            <h1 className="font-semibold text-md">Gallery</h1>
          </div>
        </NavLink>
        <NavLink
          to="/admin/portfolio"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-2.5 h-fit  ${
              isActive ? "bg-[#6abd45]" : "bg-gray-800 hover:bg-gray-500"
            }`
          }
        >
          <div>
            <h1 className="font-semibold text-md">Portfolio</h1>
          </div>
        </NavLink>
        <NavLink
          to="/admin/career"
          className={({ isActive }) => {
            const isCareerActive = isActive || window.location.pathname.includes("/admin/career");
            return `flex flex-col items-center justify-center py-2.5 h-fit  ${
              isCareerActive ? "bg-[#6abd45]" : "bg-gray-800 hover:bg-gray-500"
            }`;
          }}
        >
          <div>
            <h1 className="font-semibold text-md">Careers</h1>
          </div>
        </NavLink>
        <NavLink
          to="/admin/connect-info"
          className={({ isActive }) => {
            const isConnectActive = isActive || window.location.pathname.includes("/admin/connect");
            return `flex flex-col items-center justify-center py-2.5 h-fit  ${
              isConnectActive ? "bg-[#6abd45]" : "bg-gray-800 hover:bg-gray-500"
            }`;
          }}
        >
          <div>
            <h1 className="font-semibold text-md">Connect</h1>
          </div>
        </NavLink>
        <NavLink
          to="/admin/project-station"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-2.5 h-fit  ${
              isActive ? "bg-[#6abd45]" : "bg-gray-800 hover:bg-gray-500"
            }`
          }
        >
          <div>
            <h1 className="font-semibold text-md">Project Station</h1>
          </div>
        </NavLink>
        <NavLink
          to="/admin/edit-our-firm"
          className={({ isActive }) => {
            const isOurFirmActive =
              isActive ||
              window.location.pathname.includes("/admin/edit-business-model") ||
              window.location.pathname.includes("/admin/leadership");
            return `flex flex-col items-center justify-center py-2.5 h-fit  ${
              isOurFirmActive ? "bg-[#6abd45]" : "bg-gray-800 hover:bg-gray-500"
            }`;
          }}
        >
          <div>
            <h1 className="font-semibold text-md">Our Firm Pages</h1>
          </div>
        </NavLink>
        <NavLink
          to="/admin/services/structural-detailing"
          className={({ isActive }) => {
            const isServicesActive =
              isActive ||
              window.location.pathname.includes("/admin/services/");
            return `flex flex-col items-center justify-center py-2.5 h-fit  ${
              isServicesActive ? "bg-[#6abd45]" : "bg-gray-800 hover:bg-gray-500"
            }`;
          }}
        >
          <div>
            <h1 className="font-semibold text-md">Service Pages</h1>
          </div>
        </NavLink>
      </div>
    </>
  );
}

export default Sidebar;
