import { create } from "zustand";
import { plantList, updatePlant } from "../services/plant.services";

export const usePlantListStore = create((set) => ({
  plants: [],
  loading: false,

  fetchPlants: async () => {
    try {
      const response = await plantList();
      const plantsData = response.data.data.map((plant) => ({
        ...plant,
        image: plant.gambar?.[0] || plant.image, // Support both formats
      }));
      set({ plants: plantsData });
    } catch (error) {
      console.error("Error fetching data plants:", error);
    }
  },

  updatePlants: async (id, data) => {
    set({ loading: true });

    try {
      const response = await updatePlant(id, data);
      set({ plants: response.data.data || [] });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));