import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const ChevronDown = () => (
  <svg className="w-4 h-4 ml-auto transition-transform duration-200 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUp = () => (
  <svg className="w-4 h-4 ml-auto transition-transform duration-200 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    ourFirm: path.includes("/admin/edit-our-firm") || path.includes("/admin/edit-business-model") || path.includes("/admin/leadership") || path.includes("/admin/gallery"),
    services: path.includes("/admin/services/"),
    ourWork: path.includes("/admin/portfolio"),
    resources: path.includes("/admin/blog"),
  });

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  useEffect(() => {
    setOpenMenus((prev) => ({
      ...prev,
      ourFirm: prev.ourFirm || path.includes("/admin/edit-our-firm") || path.includes("/admin/edit-business-model") || path.includes("/admin/leadership") || path.includes("/admin/gallery"),
      services: prev.services || path.includes("/admin/services/"),
      ourWork: prev.ourWork || path.includes("/admin/portfolio"),
      resources: prev.resources || path.includes("/admin/blog"),
    }));
  }, [path]);

  return (
    <div className="flex flex-col h-full bg-white text-gray-800 font-sans border-r border-gray-200">
      <div className="p-4 border-b border-gray-100 flex items-center justify-center">
        <NavLink to="/">
          <div className="flex items-center justify-center py-2 h-fit">
            <img
              src="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685727/logos/whiteboardtec-logo_oztrhh.png"
              alt="logo"
              className="h-16 w-auto object-contain"
            />
          </div>
        </NavLink>
      </div>

      <div className="flex-1 py-4 overflow-y-auto space-y-1 select-none">
        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150 ${
              isActive
                ? "bg-green-50/50 text-[#6abd45] border-l-4 border-[#6abd45] font-semibold"
                : "text-gray-700 hover:bg-gray-50 hover:text-black"
            }`
          }
        >
          <span>Dashboard</span>
        </NavLink>

        {/* Our Firm */}
        <div>
          <button
            onClick={() => toggleMenu("ourFirm")}
            className={`w-full flex items-center px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-150 ${
              path.includes("/admin/edit-our-firm") || path.includes("/admin/edit-business-model") || path.includes("/admin/leadership") || path.includes("/admin/gallery")
                ? "bg-green-50/20 text-[#6abd45] border-l-4 border-[#6abd45]"
                : ""
            }`}
          >
            <span>Our Firm</span>
            {openMenus.ourFirm ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {openMenus.ourFirm && (
            <div className="bg-gray-50/30 py-1 pl-4 space-y-1">
              <NavLink
                to="/admin/edit-our-firm"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold border-l-2 border-[#6abd45] pl-2" : "text-gray-600 hover:text-black hover:bg-gray-100/50 pl-2"
                  }`
                }
              >
                Our Firm Details
              </NavLink>
              <NavLink
                to="/admin/edit-business-model"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold border-l-2 border-[#6abd45] pl-2" : "text-gray-600 hover:text-black hover:bg-gray-100/50 pl-2"
                  }`
                }
              >
                Business Model
              </NavLink>
              <NavLink
                to="/admin/leadership"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold border-l-2 border-[#6abd45] pl-2" : "text-gray-600 hover:text-black hover:bg-gray-100/50 pl-2"
                  }`
                }
              >
                Leadership Team
              </NavLink>
              <NavLink
                to="/admin/gallery"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold border-l-2 border-[#6abd45] pl-2" : "text-gray-600 hover:text-black hover:bg-gray-100/50 pl-2"
                  }`
                }
              >
                Gallery
              </NavLink>
            </div>
          )}
        </div>

        {/* Services */}
        <div>
          <button
            onClick={() => toggleMenu("services")}
            className={`w-full flex items-center px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-150 ${
              path.includes("/admin/services/") ? "bg-green-50/20 text-[#6abd45] border-l-4 border-[#6abd45]" : ""
            }`}
          >
            <span>Services</span>
            {openMenus.services ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {openMenus.services && (
            <div className="bg-gray-50/30 py-1 pl-4 space-y-1">
              <NavLink
                to="/admin/services/structural-detailing"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold border-l-2 border-[#6abd45] pl-2" : "text-gray-600 hover:text-black hover:bg-gray-100/50 pl-2"
                  }`
                }
              >
                Structural Detailing
              </NavLink>
              <NavLink
                to="/admin/services/miscellaneous-detailing"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold border-l-2 border-[#6abd45] pl-2" : "text-gray-600 hover:text-black hover:bg-gray-100/50 pl-2"
                  }`
                }
              >
                Miscellaneous Detailing
              </NavLink>
              <NavLink
                to="/admin/services/connection-design"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold border-l-2 border-[#6abd45] pl-2" : "text-gray-600 hover:text-black hover:bg-gray-100/50 pl-2"
                  }`
                }
              >
                Connection Design
              </NavLink>
              <NavLink
                to="/admin/services/architectural-bim"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold border-l-2 border-[#6abd45] pl-2" : "text-gray-600 hover:text-black hover:bg-gray-100/50 pl-2"
                  }`
                }
              >
                Architectural BIM
              </NavLink>
              <NavLink
                to="/admin/services/pemb-detailing"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold border-l-2 border-[#6abd45] pl-2" : "text-gray-600 hover:text-black hover:bg-gray-100/50 pl-2"
                  }`
                }
              >
                PEMB Detailing
              </NavLink>
              <NavLink
                to="/admin/services/rebar-estimation"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold border-l-2 border-[#6abd45] pl-2" : "text-gray-600 hover:text-black hover:bg-gray-100/50 pl-2"
                  }`
                }
              >
                Rebar Estimation
              </NavLink>
              <NavLink
                to="/admin/services/steel-estimation"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold border-l-2 border-[#6abd45] pl-2" : "text-gray-600 hover:text-black hover:bg-gray-100/50 pl-2"
                  }`
                }
              >
                Steel Estimation
              </NavLink>
            </div>
          )}
        </div>

        {/* Our Work */}
        <div>
          <button
            onClick={() => toggleMenu("ourWork")}
            className={`w-full flex items-center px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-150 ${
              path.includes("/admin/portfolio") ? "bg-green-50/20 text-[#6abd45] border-l-4 border-[#6abd45]" : ""
            }`}
          >
            <span>Our Work</span>
            {openMenus.ourWork ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {openMenus.ourWork && (
            <div className="bg-gray-50/30 py-1 pl-4 space-y-1">
              <NavLink
                to="/admin/portfolio"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold border-l-2 border-[#6abd45] pl-2" : "text-gray-600 hover:text-black hover:bg-gray-100/50 pl-2"
                  }`
                }
              >
                Portfolio
              </NavLink>
            </div>
          )}
        </div>

        {/* Resources */}
        <div>
          <button
            onClick={() => toggleMenu("resources")}
            className={`w-full flex items-center px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-150 ${
              path.includes("/admin/blog") ? "bg-green-50/20 text-[#6abd45] border-l-4 border-[#6abd45]" : ""
            }`}
          >
            <span>Resources</span>
            {openMenus.resources ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {openMenus.resources && (
            <div className="bg-gray-50/30 py-1 pl-4 space-y-1">
              <NavLink
                to="/admin/blog"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold border-l-2 border-[#6abd45] pl-2" : "text-gray-600 hover:text-black hover:bg-gray-100/50 pl-2"
                  }`
                }
              >
                Blog
              </NavLink>
            </div>
          )}
        </div>

        {/* Project Station */}
        <NavLink
          to="/admin/project-station"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150 ${
              isActive
                ? "bg-green-50/50 text-[#6abd45] border-l-4 border-[#6abd45] font-semibold"
                : "text-gray-700 hover:bg-gray-50 hover:text-black"
            }`
          }
        >
          <span>Project Station</span>
        </NavLink>

        {/* Connect */}
        <NavLink
          to="/admin/connect-info"
          className={({ isActive }) => {
            const isConnectActive = isActive || path.includes("/admin/connect");
            return `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150 ${
              isConnectActive
                ? "bg-green-50/50 text-[#6abd45] border-l-4 border-[#6abd45] font-semibold"
                : "text-gray-700 hover:bg-gray-50 hover:text-black"
            }`;
          }}
        >
          <span>Connect</span>
        </NavLink>

        {/* Careers */}
        <NavLink
          to="/admin/career"
          className={({ isActive }) => {
            const isCareerActive = isActive || path.includes("/admin/career");
            return `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150 ${
              isCareerActive
                ? "bg-green-50/50 text-[#6abd45] border-l-4 border-[#6abd45] font-semibold"
                : "text-gray-700 hover:bg-gray-50 hover:text-black"
            }`;
          }}
        >
          <span>Careers</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
