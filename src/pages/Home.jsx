// import React from "react";
import CatalogPlants from "../components/CatalogPlant";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Features from "../components/Features";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />

      <CatalogPlants />
    </>
  );
};

export default Home;
