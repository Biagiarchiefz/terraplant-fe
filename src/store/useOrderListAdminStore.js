import { create } from "zustand";
import {
  getAllOrderForAdmin,
  updateOrderStatusUserAdmin,
} from "../services/order.services";

export const useOrderListAdminStore = create((set, get) => ({
  orderListAdmin: [],
  loading: false,

  fetchOrdersUser: async () => {
    set({ loading: true });

    try {
      const response = await getAllOrderForAdmin();
      set({ orderListAdmin: response.data.data || [] });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await updateOrderStatusUserAdmin(orderId, status);

      // Update order di list lokal
      const currentList = get().orderListAdmin;
      const updatedList = currentList.map((order) =>
        order.id === orderId ? { ...order, status } : order
      );

      set({ orderListAdmin: updatedList });

      return response;
    } catch (err) {
      console.error("Error updating order status:", err);
      throw err;
    }
  },
}));