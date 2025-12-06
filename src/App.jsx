import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


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


        </Routes>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
