// import React from "react";
import CatalogPlants from "../components/CatalogPlant";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import NewsLetter from "../components/NewsLetter";
import AboutCompany from "../components/AboutCompany";


const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />

      <CatalogPlants />
      <NewsLetter />
      <AboutCompany />
    </>
  );
};

export default Home;
