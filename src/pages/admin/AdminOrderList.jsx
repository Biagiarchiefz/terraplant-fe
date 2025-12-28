import React, { useEffect } from "react";
import DataTable from "../../components/admin/DataTable";
import { useNavigate } from "react-router";
import { useOrderListAdminStore } from "../../store/useOrderListAdminStore";

const AdminOrderList = () => {
    const orderList = useOrderListAdminStore((state) => state.orderListAdmin);
    const fetchOrdersUser = useOrderListAdminStore(
        (state) => state.fetchOrdersUser
    );

    const navigate = useNavigate();

    useEffect(() => {
        fetchOrdersUser();
    }, []);

    const columns = [
        { header: "NO. ORDER" },
        { header: "PELANGGAN" },
        { header: "TANGGAL" },
        { header: "TOTAL" },
        { header: "ITEM" },
        { header: "STATUS" },
    ];

    const handleView = (order) => {
        console.log("View order:", order);
        // Navigasi ke halaman detail order
        navigate(`/admin/orders/${order.orderId}`);
    };

    const handleRefresh = async () => {
        console.log("Refresh orders");
        // Di sini bisa fetch data dari API
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString("id-ID", options);
    };

    const getStatusConfig = (status) => {
        const statusLower = status?.toLowerCase();
        const configs = {
            pembayaran: {
                className: "bg-amber-100 text-amber-800",
                label: "Menunggu Pembayaran",
            },
            diproses: {
                className: "bg-blue-100 text-blue-800",
                label: "Diproses",
            },
            dikirim: {
                className: "bg-purple-100 text-purple-800",
                label: "Dikirim",
            },
            selesai: {
                className: "bg-green-100 text-green-800",
                label: "Selesai",
            },
        };
        return (
            configs[statusLower] || {
                className: "bg-gray-100 text-gray-800",
                label: status,
            }
        );
    };

    const renderRow = (order) => {
        const statusConfig = getStatusConfig(order.status);

        return (
            <>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                        {order.orderId}
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                        <div className="text-sm font-medium text-gray-900">
                            {order.customer}
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                        {formatDate(order.date)}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                        {formatPrice(order.total)}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{order.itemCount} item</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusConfig.className}`}
                    >
                        {statusConfig.label}
                    </span>
                </td>
            </>
        );
    };

    return (
        <DataTable
            title="Daftar Order"
            columns={columns}
            data={orderList}
            searchPlaceholder="Cari order berdasarkan nomor order atau nama pelanggan"
            searchKeys={["orderId", "customer"]}
            onView={handleView}
            onRefresh={handleRefresh}
            renderRow={renderRow}
            itemsPerPage={10}
        />
    );
};

export default AdminOrderList;