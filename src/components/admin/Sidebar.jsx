import { DoorOpen, Sprout } from "lucide-react";
import { Link, NavLink } from "react-router";
import { adminRoutes } from "../../config/routes.config";

const Sidebar = () => {
  const menuItems = adminRoutes.filter((route) => route.showInMenu);
  // console.log(menuItems)

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#047158] rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              {" "}
              <Sprout />
            </span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">TerraPlant</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#047158] text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="text-lg" />
              <span className="font-medium text-sm">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link
          to={"/login"}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
        >
          <DoorOpen />
          <span className="font-medium text-sm">Keluar Akun</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;