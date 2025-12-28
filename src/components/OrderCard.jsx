import {
  Badge,
  CheckCircle,
  ChevronRight,
  Clock,
  Package,
  Truck,
} from "lucide-react";
import plane1 from "../assets/images/plants1.webp";
import { Link } from "react-router";


const statusConfig = {
  pembayaran: {
    label: "Menunggu Pembayaran",
    icon: Clock,
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  diproses: {
    label: "Diproses",
    icon: Package,
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  dikirim: {
    label: "Dikirim",
    icon: Truck,
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
  selesai: {
    label: "Selesai",
    icon: CheckCircle,
    className: "bg-green-100 text-green-700 border-green-200",
  },
};

const OrderCard = ({ order }) => {
  // Validasi data order
  if (!order) return null;


  const status = statusConfig[order.status] || statusConfig.pembayaran;
  const StatusIcon = status.icon;

  // Format tanggal dari ISO string
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

  return (
    <Link to={`/orders/${order.id || ""}`}>
      <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-[#008969] hover:shadow-lg transition-all duration-300 group cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">
              Order #{order.id ? order.id.slice(-8) : "N/A"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {order.created_at ? formatDate(order.created_at) : "N/A"}
            </p>
          </div>
          <div
            className={`${status.className} flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium`}
          >
            <StatusIcon className="w-3.5 h-3.5" />
            {status.label}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-xl bg-green-50 border-2 border-white overflow-hidden">
            <img
              src={plane1}
              alt={order.preview?.nama}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {order.preview?.nama}
            </p>
            <p className="text-xs text-gray-600">{order.totalItem || 0} item</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-600">Total Pembayaran</p>
            <p className="text-lg font-semibold text-[#008969]">
              Rp {(order.totalHarga || 0).toLocaleString("id-ID")}
            </p>
          </div>
          <div className="flex items-center gap-1 text-[#008969] group-hover:translate-x-1 transition-transform">
            <span className="text-sm font-medium">Lihat Detail</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;