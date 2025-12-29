import { matchPath, Outlet, useLocation } from "react-router";
import Sidebar from "./Sidebar";
import { adminRoutes } from "../../config/routes.config";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentRoute = adminRoutes.find((route) =>
    matchPath(route.path, location.pathname)
  );

  return (
    <div className="flex min-h-screen">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 bg-gray-100 w-full lg:w-auto">
        <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              {currentRoute?.label}
            </h1>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
