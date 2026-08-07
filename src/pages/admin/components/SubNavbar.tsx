import { NavLink } from "react-router-dom";

export interface Tab {
  name: string;
  to: string;
}

interface SubNavbarProps {
  tabs: Tab[];
}

export default function SubNavbar({ tabs }: SubNavbarProps) {
  return (
    <div className="bg-white border-b px-6 py-3 flex gap-3 items-center shadow-sm">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `px-4 py-1.5 text-sm font-bold border transition-all duration-200 uppercase tracking-wider rounded-sm ${
              isActive
                ? "border-[#6abd45] text-[#6abd45] bg-white"
                : "border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            }`
          }
        >
          {tab.name}
        </NavLink>
      ))}
    </div>
  );
}
