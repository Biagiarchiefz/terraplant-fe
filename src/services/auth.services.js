import api from "./api";

export const register = async (payload) => {
  try {
    const response = await api.post("/auth/register", payload);
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const login = async (payload) => {
  try {
    const response = await api.post("/auth/login", payload);
    return response;
  } catch (error) {
    //  toast.error("Semothing went wrong");
    console.log(error.message);
    throw error;
  }
};

export const me = async () => {
  try {
    const response = await api.get("/auth/me");
    return response;
  } catch (error) {
    //  toast.error("Semothing went wrong");
    console.log(error.message);
    throw error;
  }
};

export const googleLogin = async (token) => {
  return await api.post("/auth/google-login", { token });
};
