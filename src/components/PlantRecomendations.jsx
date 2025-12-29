import React from "react";
import PlantCard from "./PlantCard";
import { usePlants } from "../hooks/usePlants";

const PlantRecomendations = () => {
  const plants = usePlants();
  // const limitPlant = plants.slice(0, 4)

  const shuffled = [...plants].sort(() => 0.5 - Math.random());
  const recommendedPlants = shuffled.slice(0, 4);

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        Explore our recomendations
      </h1>
      <PlantCard
        classname="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        plants={recommendedPlants}
      />
    </div>
  );
};

export default PlantRecomendations;
