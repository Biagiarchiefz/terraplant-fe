import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <div className="">
        <Navbar />
        {/* <Outlet /> itu fungsinya jadi tempat khusus di mana halaman anak (child page) akan ditampilkan. diisi otomatis berdasarkan route.*/}
        <Outlet />
      </div>
      <Footer/>
    </>
  );
};

export default Layout;