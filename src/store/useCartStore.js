import { create } from "zustand";
import {
  deleteItemCart,
  getCartById,
  updateCart,
} from "../services/cart.services";
import { alertConfirm, alertError } from "../lib/alert";

const useCartStore = create((set, get) => ({
  // state
  carts: {
    items: [],
    grandTotal: 0,
  },
  loading: false,
  error: null,

  // helper
  calculateTotal: (items) => items.reduce((sum, i) => sum + i.qty * i.harga, 0),

  // action ubah state
  fetchCart: async (userId) => {
    set({ loading: true });

    try {
      const res = await getCartById(userId);

      set({
        carts: res.data.data,
        loading: false,
      });
    } catch (err) {
      set({
        error: "Gagal mengambil cart",
        loading: false,
      });
    }
  },

  incrementItem: async (item) => {
    const newQty = item.qty + 1;
    const { carts, calculateTotal } = get();

    // 1️. Optimistic UI update
    const updatedItems = carts.items.map((i) =>
      i.id === item.id ? { ...i, qty: newQty } : i
    );

    set({
      carts: {
        items: updatedItems,
        grandTotal: calculateTotal(updatedItems),
      },
    });

    // 2️. Backend update
    try {
      await updateCart(item.id, newQty);
    } catch (err) {
      await alertError("Gagal update cart");
    }
  },

  decrementItem: async (item) => {
    if (item.qty <= 1) return;

    const newQty = item.qty - 1;
    const { carts, calculateTotal } = get();

    const updatedItems = carts.items.map((i) =>
      i.id === item.id ? { ...i, qty: newQty } : i
    );

    set({
      carts: {
        items: updatedItems,
        grandTotal: calculateTotal(updatedItems),
      },
    });

    try {
      await updateCart(item.id, newQty);
    } catch (err) {
      await alertError("Gagal update cart");
    }
  },

  deleteItem: async (itemId, userId) => {
    const isConfirmed = await alertConfirm(
      "apakah anda yakin menghapus item ini?"
    );

    if (!isConfirmed) return;

    try {
      await deleteItemCart(itemId);
      await get().fetchCart(userId); // refresh cart
    } catch (err) {
      await alertError("Gagal menghapus item");
    }
  },
}));

export default useCartStore;