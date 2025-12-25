import api from "./api";

export const orders = async () => {
  try {
    const response = await api.get(`/orders`);
    return response;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};


export const orderDetail = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};



export const getAllOrderForAdmin = async () => {
  try {
    const response = await api.get(`/admin/orders`);
    return response;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}