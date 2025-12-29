import React, { useEffect } from "react";
import plant1 from "../assets/images/plants1.webp";
import useAuthStore from "../store/useAuthStore";
import { Minus, Plus, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import useCartStore from "../store/useCartStore";

const Cart = () => {
  const user = useAuthStore((state) => state.user);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const carts = useCartStore((state) => state.carts);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const deleteItem = useCartStore((state) => state.deleteItem);
  const loading = useCartStore((state) => state.loading);

  useEffect(() => {
    if (!user) return;
    fetchCart(user.id);
  }, [user]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-50 py-6 mt-15 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-200 border-t-[#006850] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat keranjang...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!carts.items || carts.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-50 py-6 flex flex-col justify-center items-center">
        <div className="container mx-auto">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-[#006850]" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Keranjang Belanja Kosong
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Sepertinya Anda belum menambahkan tanaman apapun ke keranjang.
              Yuk, mulai belanja sekarang!
            </p>
            <Link
              to="/catalog"
              className="inline-block px-8 py-3 bg-[#006850] hover:bg-[#018f6e] text-white font-medium rounded-lg transition-colors"
            >
              Mulai Belanja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-50 py-6 mt-15">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1.5fr] gap-6 lg:gap-12">
        {/* ===== TABLE AREA ===== */}
        <div className="overflow-hidden">
          {/* ===== HEADER ===== */}
          <div className="hidden lg:grid grid-cols-[4fr_1fr_1fr] px-4 py-3 font-semibold">
            <h1>Product</h1>
            <h1 className="text-center">Number</h1>
            <h1 className="text-right">Amount</h1>
          </div>

          {/* Baris */}
          {carts.items.map((cart) => (
            <div
              key={cart.id}
              className="grid grid-cols-1 lg:grid-cols-[4fr_1fr_1fr] items-center px-4 py-4 border-t border-black/30 relative gap-4 lg:gap-0"
            >
              <button
                onClick={() => deleteItem(cart.id, user.id)}
                className="absolute top-1.5 right-0 lg:right-0 z-10"
              >
                <X size={18} />
              </button>

              {/* PRODUCT */}
              <div className="grid grid-cols-[auto_1fr] lg:grid-cols-3 items-center gap-3 pr-6">
                <img
                  src={cart.gambar}
                  alt=""
                  className="w-16 h-16 bg-gray-200 rounded"
                />
                <div className="flex flex-col lg:contents">
                  <h1>{cart.nama}</h1>
                  <h1 className="text-sm text-gray-500">
                    Rp.{cart.harga.toLocaleString()}
                  </h1>
                </div>
              </div>

              {/* Nomor */}
              <div className="flex justify-start lg:justify-center">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => decrementItem(cart)}
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
                    onClick={() => incrementItem(cart)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="text-left lg:text-right font-semibold">
                <p className="text-sm lg:text-base">
                  <span className="lg:hidden">Total: </span>
                  Rp.{(cart.qty * cart.harga).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== SIDEBAR TOTAL ===== */}
        <div className="bg-gray-100 mt-0 lg:mt-13">
          <div className="border border-black/30 flex">
            <input
              type="text"
              placeholder="Kode Diskon"
              className="p-2 flex-1"
            />
            <button className="border-l px-4 lg:px-6 border-black/30 cursor-pointer">
              Use
            </button>
          </div>
          <h1 className="w-full border border-black/30 mt-3 p-2">Total</h1>
          <div className="border border-black/30 flex justify-between p-2">
            <h1>Amount</h1>
            <p>Rp.{carts.grandTotal.toLocaleString()}</p>
          </div>
          <div className="border border-black/30 flex justify-between p-2">
            <h1 className="font-bold">Total cost</h1>
            <p className="font-bold">Rp.{carts.grandTotal.toLocaleString()}</p>
          </div>
          <div className="border border-black/30 flex justify-center items-center p-3">
            <Link
              to={"/checkout"}
              className="bg-[#1B1B1B] w-full text-white py-2 px-9 cursor-pointer text-center"
            >
              Checkout
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 lg:gap-10 border-t border-black/30 w-full pt-5 items-center lg:col-span-2">
          <Link
            to="/catalog"
            className="border cursor-pointer px-8 sm:px-20 py-2 w-full sm:w-auto text-center"
          >
            To the catalog
          </Link>

          <button className="border px-8 sm:px-20 py-2 bg-[#1B1B1B] text-white w-full sm:w-auto">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
