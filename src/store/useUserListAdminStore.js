import { create } from "zustand";
import {
  deleteUserByAdmin,
  getAllUserForAdmin,
  updateUserByAdmin,
} from "../services/user.services";

export const useUserListAdminStore = create((set) => ({
  userListAdmin: [],
  loading: false,

  fetchUser: async () => {
    set({ loading: true });

    try {
      const response = await getAllUserForAdmin();
      // console.log(response.data)
      set({ userListAdmin: response.data.data || [] });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  updateRoleUser: async (id, role) => {
    set({ loading: true });

    try {
      const response = await updateUserByAdmin(id, { role });

      // Update local state after successful update
      set((state) => ({
        userListAdmin: state.userListAdmin.map((user) =>
          user.id === id ? { ...user, role } : user
        ),
      }));

      return response;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (id) => {
    set({ loading: true });

    try {
      await deleteUserByAdmin(id);

      set((state) => ({
        userListAdmin: state.userListAdmin.filter((user) => user.id !== id),
      }));
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));