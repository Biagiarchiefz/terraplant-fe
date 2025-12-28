import React, { useEffect, useState } from "react"

import plant1 from "../assets/images/plants1.webp";
import useAuthStore from "../store/useAuthStore";
import { Minus, Plus, X } from "lucide-react";
import { Link } from "react-router";
import { deleteItemCart, getCartById, updateCart } from "../services/cart.services";


const Cart = () => {
  const [carts, setCart] = useState({
    items: [],
    grandTotal: 0,
  });

  const user = useAuthStore((state) => state.user);
  // const [item, setItem] = useState([])

  const handleIncrement = async (item) => {
    const newQty = item.qty + 1;

    setCart((prev) => {
      const updatedItems = prev.items.map((i) =>
        i.id === item.id ? { ...i, qty: newQty } : i
      );

      return {
        ...prev,
        items: updatedItems,
        grandTotal: updatedItems.reduce((sum, i) => sum + i.qty * i.harga, 0),
      };
    });

    try {
      await updateCart(item.id, newQty);
    } catch (err) {
      alert("Gagal update cart");
    }
  };

  const handleDecrement = async (item) => {
    console.log(item);
    console.log(item.id);

    if (item.qty <= 1) return;

    const newQty = item.qty - 1;

    // 1️. Update UI
    setCart((prev) => {
      const updatedItems = prev.items.map((i) =>
        i.id === item.id ? { ...i, qty: newQty } : i
      );

      return {
        ...prev,
        items: updatedItems,
        grandTotal: updatedItems.reduce((sum, i) => sum + i.qty * i.harga, 0),
      };
    });

    // 2️. Update backend
    try {
      await updateCart(item.id, newQty);
    } catch (err) {
      alert("Gagal update cart");
    }
  };

  const fetchCart = async () => {
    const response = await getCartById(user.id);
    console.log(response.data.data);
    setCart(response.data.data);
  };

  const handleDeleteItem = async (item) => {
    const isConfirmed = window.confirm(
      "Apakah anda yakin ingin menghapus item ini?"
    );

    if (isConfirmed) {
      await deleteItemCart(item.id);
      fetchCart(); // Memanggil ulang data cart
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 px-50 py-6 mt-15">
      <div className="grid grid-cols-[3fr_1.5fr] gap-12">
        {/* ===== TABLE AREA ===== */}
        <div className="overflow-hidden">
          {/* ===== HEADER ===== */}
          <div className="grid grid-cols-[4fr_1fr_1fr] px-4 py-3 font-semibold">
            <h1>Product</h1>
            <h1 className="text-center">Number</h1>
            <h1 className="text-right">Amount</h1>
          </div>

          {/* ===== ROW ===== */}
          {carts.items.map((cart) => (
            <div
              key={cart.id}
              className="grid grid-cols-[4fr_1fr_1fr] items-center px-4 py-4 border-t border-black/30 relative"
            >
              <button
                onClick={() => handleDeleteItem(cart)}
                className="absolute top-1.5 right-0"
              >
                <X size={18} />
              </button>

              {/* PRODUCT */}
              <div className="grid grid-cols-3 items-center gap-3">
                <img
                  src={plant1}
                  alt=""
                  className="w-16 h-16 bg-gray-200 rounded"
                />
                <h1>{cart.nama}</h1>
                <h1 className="text-sm text-gray-500">
                  Rp.{cart.harga.toLocaleString()}
                </h1>
              </div>

              {/* NUMBER */}
              <div className="flex justify-center">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => handleDecrement(cart)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    value={cart.qty}
                    readOnly
                    className="w-12 text-center border-x"
                  />

                  <button
                    onClick={() => handleIncrement(cart)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* AMOUNT */}
              <div className="text-right font-semibold">
                {/* <p> Rp.{cart.total.toLocaleString()}</p> */}
                <p> Rp.{(cart.qty * cart.harga).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== SIDEBAR TOTAL ===== */}
        <div className="bg-gray-100 mt-13">
          <div className="border border-black/30  flex">
            <input type="text" placeholder="Kode Diskon" className="p-2" />
            <button className="border-l w-full px-6 border-black/30 cursor-pointer">
              Use
            </button>
          </div>
          <h1 className="w-full border border-black/30  mt-3 p-2">Total</h1>
          <div className="border border-black/30  flex justify-between p-2">
            <h1>Amount</h1>
            <p>Rp.{carts.grandTotal.toLocaleString()}</p>
          </div>
          <div className="border border-black/30  flex justify-between p-2">
            <h1 className="font-bold">Total cost</h1>
            <p className="font-bold">Rp.{carts.grandTotal.toLocaleString()}</p>
          </div>
          <div className="border border-black/30  flex justify-center items-center p-3">
            <Link to={"/checkout"} className="bg-[#1B1B1B] w-full text-white py-2 px-9 cursor-pointer text-center">
              Checkout
            </Link>
          </div>
        </div>

        <div className="flex gap-10 border-t border-black/30 w-full pt-5 items-center">
          <Link to="/catalog" className="border cursor-pointer px-20 py-2">
            To the catalog
          </Link>

          <button className="border px-20 py-2 bg-[#1B1B1B] text-white">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;