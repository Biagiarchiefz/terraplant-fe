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

export const createPlant = async (payload) => {
  try {
    const response = await api.post(`/plants/`, payload);
    return response;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const updatePlant = async (id, payload) => {
  try {
    const response = await api.put(`/plants/${id}`, payload);
    return response;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const deletePlant = async (id) => {
  try {
    const response = await api.delete(`/plants/${id}`);
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};



export const plantTopSellAdmin = async () => {
  try {
    const response = await api.get(`/admin/dashboard/top-selling-plant`);
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};