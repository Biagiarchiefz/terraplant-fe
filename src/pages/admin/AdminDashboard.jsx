import { HandCoins, Leaf, Package, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useOrderListAdminStore } from "../../store/useOrderListAdminStore";
import { useUserListAdminStore } from "../../store/useUserListAdminStore";
import { usePlantListStore } from "../../store/usePlantListStore";
import { plantTopSellAdmin } from "../../services/plant.services";

const AdminDashboard = () => {
  const [topSell, setTopSell] = useState([]);
  const orderListAdmin = useOrderListAdminStore(
    (state) => state.orderListAdmin
  );
  const fetchOrdersUser = useOrderListAdminStore(
    (state) => state.fetchOrdersUser
  );
  const loading = useOrderListAdminStore((state) => state.loading);

  const userListAdmin = useUserListAdminStore((state) => state.userListAdmin);
  const fetchUser = useUserListAdminStore((state) => state.fetchUser);
  const plants = usePlantListStore((state) => state.plants);
  const fetchPlants = usePlantListStore((state) => state.fetchPlants);

  const getPlantTopSelling = async () => {
    const response = await plantTopSellAdmin();
    console.log(response.data.data);
    setTopSell(response.data.data);
  };

  useEffect(() => {
    fetchOrdersUser();
    getPlantTopSelling();
    fetchUser();
    fetchPlants();
  }, [fetchOrdersUser]);

  // hitung revenue
  const totalPendapatan = orderListAdmin
    .filter((order) => order.status === "selesai")
    .reduce((sum, order) => sum + order.total, 0);

  // ambil cuma 1- data order
  const recentOrders = orderListAdmin.slice(0, 10);

  // Sample data - in real app, fetch from API
  const stats = [
    {
      title: "Total Users",
      value: userListAdmin.length,
      icon: <Users />,
      change: "+12.5%",
      color: "bg-blue-500/30",
    },
    {
      title: "Total Plants",
      value: plants.length,
      icon: <Leaf />,
      change: "+8.2%",
      color: "bg-green-500/30",
    },
    {
      title: "Total Orders",
      value: orderListAdmin.length,
      icon: <Package />,
      change: "+23.1%",
      color: "bg-purple-500/30",
    },
    {
      title: "Total Pendapatan",
      value: `Rp. ${totalPendapatan.toLocaleString()}`,
      icon: <HandCoins />,
      change: "+15.3%",
      color: "bg-yellow-500/30",
    },
  ];

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    const colors = {
      pembayaran: "bg-amber-100 text-amber-800",
      diproses: "bg-blue-100 text-blue-800",
      dikirim: "bg-purple-100 text-purple-800",
      selesai: "bg-green-100 text-green-800",
    };
    return colors[statusLower] || "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status) => {
    const statusLower = status?.toLowerCase();
    const labels = {
      pembayaran: "Menunggu Pembayaran",
      diproses: "Diproses",
      dikirim: "Dikirim",
      selesai: "Selesai",
    };
    return labels[statusLower] || status;
  };

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Additional Stats - Original Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-sm shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-gray-600 mb-1 truncate">
                  {stat.title}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 truncate">
                  {stat.value}
                </h3>
                <p className="text-xs md:text-sm text-green-600 mt-2 font-medium">
                  {stat.change}
                </p>
              </div>
              <div
                className={`${stat.color} w-12 h-12 md:w-14 md:h-14 rounded-[15px] flex items-center justify-center text-xl md:text-2xl shadow-lg flex-shrink-0 ml-2`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
            Pesanan Terbaru
          </h2>
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap">
                        No Order
                      </th>
                      <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap">
                        Nama
                      </th>
                      <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap">
                        Item
                      </th>
                      <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap">
                        Total
                      </th>
                      <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-8 text-gray-500 text-sm"
                        >
                          Loading...
                        </td>
                      </tr>
                    ) : recentOrders.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-8 text-gray-500 text-sm"
                        >
                          Tidak ada data pesanan
                        </td>
                      </tr>
                    ) : (
                      recentOrders.map((order) => (
                        <tr
                          key={order.orderId}
                          className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-800 whitespace-nowrap">
                            {order.orderId}
                          </td>
                          <td className="py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 whitespace-nowrap">
                            {order.customer}
                          </td>
                          <td className="py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 whitespace-nowrap">
                            {order.itemCount} item
                          </td>
                          <td className="py-3 px-2 md:px-4 text-xs md:text-sm text-gray-800 font-medium whitespace-nowrap">
                            Rp. {order.total.toLocaleString()}
                          </td>
                          <td className="py-3 px-2 md:px-4">
                            <span
                              className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusLabel(order.status)}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Top Selling Plants */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
            Tanaman Terlaris
          </h2>
          <div className="space-y-3 md:space-y-4">
            {topSell?.map((plant, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#047158] rounded-[10px] flex items-center justify-center text-white font-bold text-sm md:text-base flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800 text-xs md:text-sm truncate">
                      {plant.nama}
                    </p>
                    <p className="text-xs text-gray-600">
                      {plant.totalTerjual} terjual
                    </p>
                  </div>
                </div>
                <p className="font-bold text-[#047158] text-xs md:text-sm ml-2 whitespace-nowrap">
                  Rp. {plant.totalPendapatan.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
