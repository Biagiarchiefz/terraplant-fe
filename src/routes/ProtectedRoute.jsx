import { Navigate, Outlet, useLocation } from "react-router";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuthStore();
  const location = useLocation();

  // tunggu auth dicek
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // belum login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // sudah login
  return <Outlet />;
};

export default ProtectedRoute;