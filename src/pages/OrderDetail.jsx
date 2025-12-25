import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { orderDetail } from "../services/order.services";
import plant1 from "../assets/images/plants1.webp"
import {
  ArrowLeft,
  Copy,
  User,
  Phone,
  MapPin,
  Truck,
  MessageCircle,
  Package,
  Clock,
  CheckCircle,
  Leaf,
} from "lucide-react";


const statusConfig = {
  pembayaran: {
    label: "Menunggu Pembayaran",
    icon: Clock,
    className: "bg-amber-100 text-amber-700 border-amber-200",
    step: 0,
  },
  diproses: {
    label: "Diproses",
    icon: Package,
    className: "bg-blue-100 text-blue-700 border-blue-200",
    step: 1,
  },
  dikirim: {
    label: "Dikirim",
    icon: Truck,
    className: "bg-purple-100 text-purple-700 border-purple-200",
    step: 2,
  },
  selesai: {
    label: "Selesai",
    icon: CheckCircle,
    className: "bg-green-100 text-green-700 border-green-200",
    step: 3,
  },
};

const steps = [
  { label: "Pembayaran", icon: CheckCircle },
  { label: "Diproses", icon: Package },
  { label: "Dikirim", icon: Truck },
  { label: "Selesai", icon: CheckCircle },
];

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const fetchDetailOrder = async () => {
    try {
      setLoading(true);
      const response = await orderDetail(id);
      console.log(response.data.data);
      setOrder(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailOrder();
  }, [id]);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    alert(`${label} berhasil disalin!`);
  };

  // Format tanggal
  const formatDate = (isoDate) => {
    try {
      const date = new Date(isoDate);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Format payment method
  const formatPaymentMethod = (method) => {
    const methods = {
      "credit-card": "Kartu Kredit",
      "bank-transfer": "Transfer Bank",
      "e-wallet": "E-Wallet",
      cod: "COD (Bayar di Tempat)",
    };
    return methods[method] || method;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-200 border-t-[#006850] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">
            Pesanan tidak ditemukan
          </h2>
          <Link
            to="/order-list"
            className="text-[#006850] hover:text-green-[#006850] mt-4 inline-block"
          >
            Kembali ke Daftar Pesanan
          </Link>
        </div>
      </div>
    );
  }

  const status = statusConfig[order.status] || statusConfig.pembayaran;
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen mt-15">
      <main className="container mx-auto px-50 py-6">
        {/* Back Button */}
        <Link
          to="/order-list"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Pesanan</span>
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-gray-900">
                  Order #{order.id ? order.id.slice(-8) : "N/A"}
                </h1>
                <button
                  onClick={() => copyToClipboard(order.id, "Nomor pesanan")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600">
                {formatDate(order.created_at)}
              </p>
            </div>
            <div
              className={`${status.className} flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium`}
            >
              <StatusIcon className="w-4 h-4" />
              {status.label}
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
            <div
              className="absolute top-5 left-0 h-0.5 bg-[#006850] transition-all duration-500"
              style={{ width: `${(status.step / 3) * 100}%` }}
            />
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index <= status.step;
              return (
                <div
                  key={step.label}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-[#006850] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs mt-2 ${
                      isActive ? "text-[#006850] font-medium" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Items & Summary */}
          <div className="md:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Daftar Produk
              </h2>
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="w-20 h-20 rounded-xl bg-green-50 overflow-hidden flex-shrink-0">
                      <img
                        src={plant1}
                        alt={item.nama}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900">{item.nama}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">
                          {item.qty}x
                        </span>
                        <span className="font-semibold text-[#006850]">
                          Rp {item.harga.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Ringkasan Pembayaran
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    Rp {order.summary?.subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ongkos Kirim</span>
                  <span className="text-gray-900">
                    Rp {order.summary?.ongkir.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Diskon Ongkir</span>
                  <span className="text-[#006850]">
                    -Rp {order.summary?.diskonOngkir.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="border-t border-gray-200 my-3"></div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-[#006850]">
                    Rp {order.summary?.total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Metode Pembayaran</p>
                <p className="font-medium text-gray-900">
                  {formatPaymentMethod(order.paymentMethod)}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Shipping & Contact */}
          <div className="space-y-6">
            {/* Shipping Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Info Pengiriman
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-[#006850] mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Penerima</p>
                    <p className="font-medium text-gray-900">
                      {order.shipping?.fullName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#006850] mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Telepon</p>
                    <p className="font-medium text-gray-900">
                      {order.shipping?.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#006850] mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Alamat</p>
                    <p className="font-medium text-gray-900">
                      {order.shipping?.address}
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-200 my-3"></div>
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#006850] mt-0.5" />
                  <div className="w-full">
                    <p className="text-sm text-gray-600">Kurir</p>
                    <p className="font-medium text-gray-900">
                      {order.shipping?.courier?.name}
                    </p>
                    {order.shipping?.courier?.resi && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600">
                          {order.shipping.courier.resi}
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              order.shipping.courier.resi,
                              "Nomor resi"
                            )
                          }
                          className="text-[#006850] hover:text-green-700"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {order.shipping?.courier?.estimate && (
                  <p className="text-sm text-gray-600">
                    Estimasi tiba: {order.shipping.courier.estimate}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-[#006850] hover:bg-[#018f6e] text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                <MessageCircle className="w-4 h-4" />
                Hubungi Penjual
              </button>
              {order.status === "pembayaran" && (
                <button className="w-full border border-gray-300 text-gray-900 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Batalkan Pesanan
                </button>
              )}
              {order.status === "selesai" && (
                <button className="w-full border border-gray-300 text-gray-900 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Beli Lagi
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetail;