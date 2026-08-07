import { HeaderProp } from ".";
import { useSidebar } from "./useSidebar";

function Header(prop: HeaderProp) {
  const { isSidebarOpen, toggle } = useSidebar();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between w-full px-6 py-3 mt-0 bg-[#6abd45] shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="p-1.5 rounded hover:bg-black/10 text-white transition-colors focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isSidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="text-xl font-bold text-white uppercase tracking-wider">
            {prop.head}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
