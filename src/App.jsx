import useAuthStore from "./store/useAuthStore";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlantDetail from "./pages/PlantDetail";
import Layout from "./components/Layout";
import Catalog from "./pages/Catalog";
import { useEffect } from "react";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderList from "./pages/OrderList";
import OrderDetail from "./pages/OrderDetail";



function App() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, []);
  return (
    <div className="">
      <div className="min-h-[70hvh">
        <Routes>
          <Route element={<Layout />}>
            {/* Landing Page */}
            <Route path="/" element={<Home />} />
            <Route path="/plant/:id" element={<PlantDetail />} />
            <Route path="/Catalog" element={< Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-list" element={<OrderList />} />
            <Route path="/orders/:id" element={<OrderDetail />} />

          </Route>

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
