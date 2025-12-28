import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import OrderCard from "../components/OrderCard";
import { Package, Filter } from "lucide-react";
import { useOrderListUserStore } from "../store/useOrderListStore";

const OrderList = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const orderList = useOrderListUserStore((state) => state.orderList);
  const fetchOrders = useOrderListUserStore((state) => state.fetchOrders);
  const loading = useOrderListUserStore((state) => state.loading);

  const filteredOrders =
    statusFilter === "all"
      ? orderList
      : orderList.filter((order) => order.status === statusFilter);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen px-30 mt-15">
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="w-8 h-8 text-[#008969]" />
              Pesanan Saya
            </h1>
            <p className="text-gray-600 mt-1">Lacak semua pesanan Anda</p>
          </div>

          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <div className="relative w-full md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900
               focus:outline-none focus:ring-2 focus:ring-[#034032]
               appearance-none"
              >
                <option value="all">Semua Status</option>
                <option value="pembayaran">Menunggu Pembayaran</option>
                <option value="diproses">Diproses</option>
                <option value="dikirim">Dikirim</option>
                <option value="selesai">Selesai</option>
              </select>

              {/* Custom Arrow */}
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-4 border-green-200 border-t-[#034032] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat pesanan...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="grid gap-4">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-[#034032]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tidak ada pesanan
            </h3>
            <p className="text-gray-600 mb-6">
              Belum ada pesanan dengan status ini
            </p>
            <Link
              to="/catalog"
              className="inline-block px-6 py-3 bg-[#034032] hover:bg-[#006850] text-white font-medium rounded-lg transition-colors"
            >
              Mulai Belanja
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderList;