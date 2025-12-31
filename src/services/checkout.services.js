import api from "./api";

export const checkout = async (payload) => {
  try {
    const response = await api.post("/checkout", payload);
    return response;
  } catch (err) {
    console.error("Checkout error:", err.message);
    throw err;
  }
};
