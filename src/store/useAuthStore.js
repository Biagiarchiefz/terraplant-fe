import { create } from "zustand";
import { me } from "../services/auth.services";

// set digunakan untuk mengubah atau memperbarui data yang ada di dalam store
const useAuthStore = create((set) => ({
    // initial state
    user: null,
    token: null,

    // dipanggil setelah login sukses
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

        if (!token) return;

        try {
            const response = await me();
            const userData = response.data.data;
            set({ token: token, user: userData });

        } catch (err) {
            console.log(err)
        }
    },
}));

export default useAuthStore;