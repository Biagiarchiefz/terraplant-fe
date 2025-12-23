import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlantDetail from "./pages/PlantDetail";
import Layout from "./components/Layout";
import Catalog from "./pages/Catalog";

function App() {
  return (
    <div className="">
      <div className="min-h-[70hvh">
        <Routes>
         <Route element={<Layout />}>
            {/* Landing Page */}
            <Route path="/" element={<Home />} />
            <Route path="/plant/:id" element={<PlantDetail />} />
            <Route path="/Catalog" element={< Catalog/>} />
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
