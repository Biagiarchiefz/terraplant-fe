import { create } from "zustand";
import { orders } from "../services/order.services";

export const useOrderListUserStore = create((set) => ({
  orderList: [],
  loading: false,

  fetchOrders: async () => {
    set({ loading: true });

    try {
      const response = await orders();
      // console.log(response.data)
      set({ orderList: response.data.data || [] });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));