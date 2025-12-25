import api from "./api";

export const addCart = async (payload) => {
  try {
    const response = await api.post("/cart/add", payload);
    return response;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const updateCart = async (id, qty) => {
  try {
    const response = await api.put(`/cart/${id}`, { qty: qty });
    return response;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const getCartById = async (id) => {
  try {
    const response = await api.get(`/cart/${id}`);
    return response;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const deleteItemCart = async (id) => {
  console.log(id)
  try {
    await api.delete(`/cart/${id}`);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};