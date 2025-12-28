import { matchPath, Outlet, useLocation } from "react-router";
import Sidebar from "./Sidebar";
import { adminRoutes } from "../../config/routes.config";

const AdminLayout = () => {
  const location = useLocation();

  const currentRoute = adminRoutes.find((route) =>
    matchPath(route.path, location.pathname)
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-gray-100">
        <div className="p-4 bg-white shadow-2xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            {currentRoute.label}
          </h1>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;