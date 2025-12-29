import { create } from "zustand";
import { me } from "../services/auth.services";

// set digunakan untuk mengubah atau memperbarui data yang ada di dalam store
const useAuthStore = create((set) => ({
  // initial statenya
  user: null,
  token: null,
  isLoading: true,

  // cara update statenya
  login: (userData, token) => {
    localStorage.setItem("token", token);
    // init state user diisi oleh data user yang dikirim saat pemanggilan dihalaman login
    set({ user: userData, token });
  },

  // logout
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  // cek auth saat app pertama kali load
  initAuth: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({ isLoading: false });
      return;
    }

    try {
      const response = await me();
      const userData = response.data.data;
      set({ token: token, user: userData, isLoading: false });
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      set({ user: null, token: null, isLoading: false });
    }
  },
}));

export default useAuthStore;