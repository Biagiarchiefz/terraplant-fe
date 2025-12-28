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

export const updateOrderStatusComplate = async (orderId, status) => {
  try {
    const response = await api.patch(`/orders/${orderId}/complete`, {
      status: status,
    });
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
};

export const getAllOrderDetailForAdmin = async (idOrder) => {
  try {
    const response = await api.get(`/admin/orders/${idOrder}`);
    return response;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const updateOrderStatusUserAdmin = async (orderId, status) => {
  try {
    const response = await api.patch(`/admin/orders/${orderId}/status`, {
      status: status,
    });
    return response;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};