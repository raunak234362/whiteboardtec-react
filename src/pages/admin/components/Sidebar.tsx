import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="flex flex-col bg-gray-900 h-full text-white">
        <div>
        <NavLink
          to="/">
          <div className="flex items-center justify-center h-fit my-2.5">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Ficon%2FFavicon.png?alt=media&token=47ae9ad9-98f3-46b1-a7a0-95f5f64515f8"
              alt="logo"
              className="h-8 w-8 mx-1"
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
            }`}>
          <div>
            <h1 className="text-md font-semibold">Dashboard</h1>
          </div>
        </NavLink>
        <NavLink
          to="/admin/gallery"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-2.5 h-fit  ${
              isActive ? "bg-[#6abd45]" : "bg-gray-800 hover:bg-gray-500"
            }`}>
          <div>
            <h1 className="text-md font-semibold">Gallery</h1>
          </div>
        </NavLink>
        <NavLink
          to="/admin/portfolio"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-2.5 h-fit  ${
              isActive ? "bg-[#6abd45]" : "bg-gray-800 hover:bg-gray-500"
            }`}>
          <div>
            <h1 className="text-md font-semibold">Portfolio</h1>
          </div>
        </NavLink>
        <NavLink
          to="/admin/career"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-2.5 h-fit  ${
              isActive ? "bg-[#6abd45]" : "bg-gray-800 hover:bg-gray-500"
            }`}>
          <div>
            <h1 className="text-md font-semibold">Careers</h1>
          </div>
        </NavLink>
      </div>
    </>
  );
}

export default Sidebar;
