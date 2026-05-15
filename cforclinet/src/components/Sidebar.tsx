import { NavLink } from "react-router-dom";

interface SidebarProps {
  items: { label: string; path: string }[];
}

const Sidebar = ({ items }: SidebarProps) => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6">💎 DBS</h1>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive ? "bg-blue-600" : "hover:text-blue-400"
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
