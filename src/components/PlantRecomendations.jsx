import React from "react";
import PlantCard from "./PlantCard";
import { usePlants } from "../hooks/usePlants";

const PlantRecomendations = () => {
    const plants = usePlants();
    // const limitPlant = plants.slice(0, 4)

    const shuffled = [...plants].sort(() => 0.5 - Math.random());
    const recommendedPlants = shuffled.slice(0, 4);

    return (
        <div className="px-20">
            <h1 className="text-4xl font-bold">Explore our recomendations</h1>
            <PlantCard classname="mt-10 flex" plants={recommendedPlants} />
        </div>
    );
};

export default PlantRecomendations;