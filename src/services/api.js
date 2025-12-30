import axios from "axios";

const api = axios.create({
  // baseURL: "https://terraplant-be.vercel.app/api",
  baseURL: "http://localhost:8001/api",
});

// interceptoprs setiap request jadi semua request bakal bawa token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;