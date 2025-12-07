// import React from "react";
import CatalogPlants from "../components/CatalogPlant";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import NewsLetter from "../components/NewsLetter";
import AboutCompany from "../components/AboutCompany";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />

      <CatalogPlants />
      <NewsLetter />
      <AboutCompany />
      <Footer />
    </>
  );
};

export default Home;
