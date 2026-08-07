import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const ChevronDown = () => (
  <svg className="w-4 h-4 ml-auto transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUp = () => (
  <svg className="w-4 h-4 ml-auto transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
    <div className="flex flex-col h-full text-white bg-gray-900 font-sans">
      <div>
        <NavLink to="/">
          <div className="flex items-center justify-center py-4 h-fit">
            <img
              src="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685727/logos/whiteboardtec-logo_oztrhh.png"
              alt="logo"
              className="w-8 h-8 mx-1"
            />
            <h1 className="text-xl font-bold tracking-tight">Whiteboard</h1>
          </div>
        </NavLink>
      </div>

      <div className="flex-1 py-4 overflow-y-auto space-y-1 select-none">
        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150 ${
              isActive ? "bg-[#6abd45] text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <span>Dashboard</span>
        </NavLink>

        {/* Our Firm */}
        <div>
          <button
            onClick={() => toggleMenu("ourFirm")}
            className={`w-full flex items-center px-6 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-150 ${
              path.includes("/admin/edit-our-firm") || path.includes("/admin/edit-business-model") || path.includes("/admin/leadership") || path.includes("/admin/gallery") ? "bg-gray-800/50 text-white border-l-4 border-[#6abd45]" : ""
            }`}
          >
            <span>Our Firm</span>
            {openMenus.ourFirm ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {openMenus.ourFirm && (
            <div className="bg-gray-950/50 py-1 pl-4 space-y-1">
              <NavLink
                to="/admin/edit-our-firm"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold" : "text-gray-400 hover:text-white"
                  }`
                }
              >
                Our Firm Details
              </NavLink>
              <NavLink
                to="/admin/edit-business-model"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold" : "text-gray-400 hover:text-white"
                  }`
                }
              >
                Business Model
              </NavLink>
              <NavLink
                to="/admin/leadership"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold" : "text-gray-400 hover:text-white"
                  }`
                }
              >
                Leadership Team
              </NavLink>
              <NavLink
                to="/admin/gallery"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold" : "text-gray-400 hover:text-white"
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
            className={`w-full flex items-center px-6 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-150 ${
              path.includes("/admin/services/") ? "bg-gray-800/50 text-white border-l-4 border-[#6abd45]" : ""
            }`}
          >
            <span>Services</span>
            {openMenus.services ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {openMenus.services && (
            <div className="bg-gray-950/50 py-1 pl-4 space-y-1">
              <NavLink
                to="/admin/services/structural-detailing"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold" : "text-gray-400 hover:text-white"
                  }`
                }
              >
                Structural Detailing
              </NavLink>
              <NavLink
                to="/admin/services/miscellaneous-detailing"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold" : "text-gray-400 hover:text-white"
                  }`
                }
              >
                Miscellaneous Detailing
              </NavLink>
              <NavLink
                to="/admin/services/connection-design"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold" : "text-gray-400 hover:text-white"
                  }`
                }
              >
                Connection Design
              </NavLink>
              <NavLink
                to="/admin/services/architectural-bim"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold" : "text-gray-400 hover:text-white"
                  }`
                }
              >
                Architectural BIM
              </NavLink>
              <NavLink
                to="/admin/services/pemb-detailing"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold" : "text-gray-400 hover:text-white"
                  }`
                }
              >
                PEMB Detailing
              </NavLink>
              <NavLink
                to="/admin/services/rebar-estimation"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold" : "text-gray-400 hover:text-white"
                  }`
                }
              >
                Rebar Estimation
              </NavLink>
              <NavLink
                to="/admin/services/steel-estimation"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold" : "text-gray-400 hover:text-white"
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
            className={`w-full flex items-center px-6 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-150 ${
              path.includes("/admin/portfolio") ? "bg-gray-800/50 text-white border-l-4 border-[#6abd45]" : ""
            }`}
          >
            <span>Our Work</span>
            {openMenus.ourWork ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {openMenus.ourWork && (
            <div className="bg-gray-950/50 py-1 pl-4 space-y-1">
              <NavLink
                to="/admin/portfolio"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold" : "text-gray-400 hover:text-white"
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
            className={`w-full flex items-center px-6 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-150 ${
              path.includes("/admin/blog") ? "bg-gray-800/50 text-white border-l-4 border-[#6abd45]" : ""
            }`}
          >
            <span>Resources</span>
            {openMenus.resources ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {openMenus.resources && (
            <div className="bg-gray-950/50 py-1 pl-4 space-y-1">
              <NavLink
                to="/admin/blog"
                className={({ isActive }) =>
                  `flex items-center px-6 py-2 text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-[#6abd45] font-bold" : "text-gray-400 hover:text-white"
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
              isActive ? "bg-[#6abd45] text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
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
              isConnectActive ? "bg-[#6abd45] text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
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
              isCareerActive ? "bg-[#6abd45] text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
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
