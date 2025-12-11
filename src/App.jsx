import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DetailsTumbuhan from "./pages/DetailsTumbuhan";

function App() {
  return (
    <div className="">
      <div className="min-h-[70hvh">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Detail Tanaman */}
          <Route path="/detail-tumbuhan" element={<DetailsTumbuhan />} />
        </Routes>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
