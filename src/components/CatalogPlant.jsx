import React from "react";
import Title from "./Title";
import PlantCard from "./PlantCard";
import { usePlants } from "../hooks/usePlants";
// import { ChevronDown } from "lucide-react";
import { Link } from "react-router";

const CatalogPlants = () => {
  const plants = usePlants();
  const limitPlant = plants.slice(0, 6);
  return (
    <div className="px-6 md:px-16 lg:px-50 pt-10 md:pb-[80px]">
      <Title title="Catalog" />
      <PlantCard
        classname="mt-10 grid grid-cols-1 md:grid-cols-3 "
        plants={limitPlant}
      />
      <div className=" w-full flex justify-center items-center">
        {plants && (
          <Link
            to="/catalog"
            className="border-b-2 font-semibold flex items-center cursor-pointer text-black/50   transition-transform duration-300 hover:scale-95 "
          >
            More
          </Link>
        )}
      </div>
    </div>
  );
};

export default CatalogPlants;