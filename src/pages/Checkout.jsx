import { Building2, ChevronDown, CreditCard, Wallet, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { checkout } from "../services/checkout.services";
import { getCartById } from "../services/cart.services";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router";
import { alertError, alertSucces } from "../lib/alert";

const Checkout = () => {
  const [carts, setCart] = useState({
    items: [],
    grandTotal: 0,
  });

  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "credit-card",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await checkout(formData);
      if (response.status == 200) {
        await alertSucces("Pembayaran Berhasil");
        navigate("/order-list");
      }
    } catch (error) {
      // Ambil pesan error dari response backend
      const errorMessage =
        error.response?.data?.error || "Barang gagal di checkout";
      await alertError(errorMessage);
    }
  };

  const fetchCart = async () => {
    const response = await getCartById(user.id);
    // console.log(response.data);
    setCart(response.data.data);
  };

  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto my-15">
        {/* <h1 className="text-2xl font-bold py-5">Checkout</h1> */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section - Form Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Details Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Detail Pengiriman
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama lengkap Anda"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006850] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor Telepon <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Masukkan nomor telepon Anda"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006850] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Alamat lengkap, Jalan, RT/RW"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006850] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kota <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Kota"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006850] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Provinsi <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Provinsi"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006850] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kode Pos <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="Kode Pos"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006850] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Metode Pembayaran
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 group">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === "credit-card"}
                      onChange={handleInputChange}
                      className="w-4 h-4 "
                    />
                    <CreditCard className="w-6 h-6 text-gray-400 group-hover:text-[#006850] transition-colors" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        Kartu Kredit
                      </p>
                      <p className="text-xs text-gray-500">
                        Bayar dengan Visa, Mastercard, atau Amex
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 group">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="e-wallet"
                      checked={formData.paymentMethod === "e-wallet"}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <Wallet className="w-6 h-6 text-gray-400 group-hover:text-[#006850] transition-colors" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        E-Wallet
                      </p>
                      <p className="text-xs text-gray-500">
                        Pembayaran cepat dan aman
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 group">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={formData.paymentMethod === "bank-transfer"}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <Building2 className="w-6 h-6 text-gray-400 group-hover:text-[#006850] transition-colors" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        Transfer Bank
                      </p>
                      <p className="text-xs text-gray-500">
                        Pembayaran langsung via bank
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Section - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Pesanan Anda
                </h2>

                <div className="space-y-3 mb-6">
                  {carts.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors group relative"
                    >
                      <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                        <X className="w-4 h-4" />
                      </button>

                      <img
                        src={item.gambar}
                        alt={item.nama}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                          {item.nama}
                        </h4>
                        <p className="text-xs text-gray-500">{item.qty} x</p>
                      </div>

                      <div className="text-sm font-bold text-gray-900">
                        Rp {item.harga.toLocaleString("id-ID")}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 py-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      {/* Rp {subtotal.toLocaleString("id-ID")} */}
                      Rp {carts.grandTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Diskon</span>
                    <span className="font-semibold text-gray-900">0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pengiriman</span>
                    <span className="font-semibold">Gratis</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4 border-t-2 border-gray-300">
                  <span className="text-lg font-bold text-gray-900">TOTAL</span>
                  <span className="text-2xl font-bold">
                    Rp {carts.grandTotal.toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 px-6 py-4 text-black text-base font-semibold rounded-lg bg-[#006850] text-white hover:bg-[#006850] transition-colors shadow-lg hover:shadow-xl"
                >
                  Lanjutkan Pembayaran
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
