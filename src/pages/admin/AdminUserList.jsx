import React, { useState, useEffect } from "react";
import DataTable from "../../components/admin/DataTable";
import UserRoleModal from "../../components/admin/UserRoleModal";
import { useUserListAdminStore } from "../../store/useUserListAdminStore";

const AdminUserList = () => {
  const userList = useUserListAdminStore((state) => state.userListAdmin);
  const fetchUser = useUserListAdminStore((state) => state.fetchUser);
  const deleteUser = useUserListAdminStore((state) => state.deleteUser);
  const updateRoleUser = useUserListAdminStore((state) => state.updateRoleUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const columns = [
    { header: "PENGGUNA" },
    { header: "EMAIL" },
    { header: "ALAMAT" },
    { header: "No HP" },
    { header: "ROLE" },
  ];

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleModalSubmit = async (userId, newRole) => {
    try {
      await updateRoleUser(userId, newRole);
      await fetchUser(); // Refresh data
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleDelete = (user) => {
    deleteUser(user.id);
  };

  const handleRefresh = async () => {
    await fetchUser();
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const renderRow = (user) => {
    return (
      <>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#047158] flex items-center justify-center text-white font-bold text-sm">
              {getInitials(user.nama)}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {user.nama}
              </div>
              <div className="text-sm text-gray-500">
                ID: {user.id.substring(0, 10)}...
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm text-gray-900">{user.email}</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm text-gray-500">{user.alamat || "-"}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm text-gray-500">{user.no_hp || "-"}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
              user.role === "admin"
                ? "bg-purple-100 text-purple-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {user.role}
          </span>
        </td>
      </>
    );
  };

  return (
    <>
      <DataTable
        title="Daftar Pengguna"
        columns={columns}
        data={userList}
        searchPlaceholder="Cari pengguna berdasarkan nama, email"
        addButtonText="Tambah Pengguna"
        searchKeys={["nama", "email"]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRefresh={handleRefresh}
        renderRow={renderRow}
        itemsPerPage={10}
      />

      <UserRoleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        userData={selectedUser}
      />
    </>
  );
};

export default AdminUserList;