import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import PlantDetail from "./pages/PlantDetail";
import Checkout from "./pages/Checkout";
import OrderList from "./pages/OrderList";
import OrderDetail from "./pages/OrderDetail";
import AdminUserList from "./pages/admin/AdminUserList";
import AdminPlantList from "./pages/admin/AdminPlantList";
import AdminOrderList from "./pages/admin/AdminOrderList";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import ProtectedRoute from "./routes/ProtectedRoute";
import useCartStore from "./store/useCartStore";

function App() {
  const initAuth = useAuthStore((state) => state.initAuth);
  const user = useAuthStore((state) => state.user);
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (user?.id) {
      fetchCart(user.id);
    }
  }, [user?.id, fetchCart]);

  return (
    <div className="">
      <div className="min-h-[70hvh]">
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Layout />}>
            {/* Landing Page */}
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/plant/:id" element={<PlantDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-list" element={<OrderList />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
            </Route>
          </Route>

          {/* ADMIN ROUTE */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUserList />} />
              <Route path="plants" element={<AdminPlantList />} />
              <Route path="orders" element={<AdminOrderList />} />
              <Route path="orders/:id" element={<AdminOrderDetail />} />
            </Route>
          </Route>
        </Routes>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
