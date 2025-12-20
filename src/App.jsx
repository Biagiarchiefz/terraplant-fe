import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Plant from "./pages/Plant";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="">
      <div className="min-h-[70hvh">
        <Routes>
         <Route element={<Layout />}>
            {/* Landing Page */}
            <Route path="/" element={<Home />} />
            <Route path="/plant/:id" element={<Plant />} />
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
