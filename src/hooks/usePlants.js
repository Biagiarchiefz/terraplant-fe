import React, { useEffect, useState } from "react";
import { plantList } from "../services/plant.services";

export const usePlants = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await plantList();
      // console.log(response.data.data)
      setPlants(response.data.data);
    };

    getData();
  }, []);

  return plants;
};