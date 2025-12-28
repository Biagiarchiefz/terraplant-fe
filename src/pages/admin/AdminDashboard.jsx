import { HandCoins, Leaf, Package, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useOrderListAdminStore } from "../../store/useOrderListAdminStore";
import { useUserListAdminStore } from "../../store/useUserListAdminStore";
import { usePlantListStore } from "../../store/usePlantListStore";
import { plantTopSellAdmin } from "../../services/plant.services";

const AdminDashboard = () => {
  const [topSell, setTopSell] = useState([])
  const orderListAdmin = useOrderListAdminStore(
    (state) => state.orderListAdmin
  );
  const fetchOrdersUser = useOrderListAdminStore(
    (state) => state.fetchOrdersUser
  );
  const loading = useOrderListAdminStore((state) => state.loading);

  const userListAdmin = useUserListAdminStore((state) => state.userListAdmin)
  const fetchUser = useUserListAdminStore((state) => state.fetchUser)
  const plants = usePlantListStore((state) => state.plants)
  const fetchPlants = usePlantListStore((state) => state.fetchPlants)


  const getPlantTopSelling = async () => {
    const response = await plantTopSellAdmin();
    console.log(response.data.data)
    setTopSell(response.data.data)
  }

  useEffect(() => {
    fetchOrdersUser();
    getPlantTopSelling()
    fetchUser()
    fetchPlants()
  }, [fetchOrdersUser]);

  // hitung revenue 
  const totalPendapatan = orderListAdmin.filter(order => order.status === "selesai").reduce((sum, order) => sum + order.total, 0)

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
    <div className="space-y-6 p-6">
      {/* Additional Stats - Original Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-sm shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </h3>
                <p className="text-sm text-green-600 mt-2 font-medium">
                  {stat.change}
                </p>
              </div>
              <div
                className={`${stat.color} w-14 h-14 rounded-[15px] flex items-center justify-center text-2xl shadow-lg`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Pesanan Terbaru
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    No Order
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Nama
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Item
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Total
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                      Tidak ada data pesanan
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr
                      key={order.orderId}
                      className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        {order.orderId}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {order.customer}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {order.itemCount} item
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                        Rp. {order.total.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
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

        {/* Top Selling Plants */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Tanaman Terlaris
          </h2>
          <div className="space-y-4">
            {topSell?.map((plant, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#047158] rounded-[10px] flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {plant.nama}
                    </p>
                    <p className="text-xs text-gray-600">{plant.totalTerjual} terjual</p>
                  </div>
                </div>
                <p className="font-bold text-[#047158] text-sm">
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