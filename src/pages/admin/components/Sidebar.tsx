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
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-2.5 h-fit  ${
              isActive ? "bg-[#6abd45]" : "bg-gray-800 hover:bg-gray-500"
            }`
          }
        >
          <div>
            <h1 className="font-semibold text-md">Careers</h1>
          </div>
        </NavLink>
        <NavLink
          to="/admin/connect-info"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-2.5 h-fit  ${
              isActive ? "bg-[#6abd45]" : "bg-gray-800 hover:bg-gray-500"
            }`
          }
        >
          <div>
            <h1 className="font-semibold text-md">Connect</h1>
          </div>
        </NavLink>
      </div>
    </>
  );
}

export default Sidebar;
