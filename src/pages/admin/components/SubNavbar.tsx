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
    <div className="bg-white border-b px-6 py-3 flex gap-2 items-center shadow-sm">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
              isActive
                ? "bg-[#6abd45] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          {tab.name}
        </NavLink>
      ))}
    </div>
  );
}
