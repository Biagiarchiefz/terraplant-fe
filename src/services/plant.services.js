import api from "./api";

export const plantList = async () => {
  try {
    const response = await api.get("/plants/");
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const plantDetail = async (id) => {
  try {
    const response = await api.get(`/plants/${id}`);
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};