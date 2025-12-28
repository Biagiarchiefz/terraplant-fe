import React, { useState, useEffect } from "react";
import { X, UserCog } from "lucide-react";

const UserRoleModal = ({ isOpen, onClose, onSubmit, userData = null }) => {
    const [selectedRole, setSelectedRole] = useState("");

    useEffect(() => {
        if (isOpen && userData) {
            setSelectedRole(userData.role || "");
        }
    }, [isOpen, userData]);

    const handleClose = () => {
        setSelectedRole("");
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(userData.id, selectedRole);
        handleClose();
    };

    if (!isOpen || !userData) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-black/20">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-[10px] flex items-center justify-center">
                            <UserCog className="text-purple-900" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Edit Role Pengguna
                        </h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors hover:bg-black/20 rounded-[10px] p-2"
                    >
                        <X />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        {/* User Info - Read Only */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Pengguna
                            </label>
                            <input
                                type="text"
                                value={userData.nama}
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-[5px] bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={userData.email}
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-[5px] bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Alamat
                            </label>
                            <input
                                type="text"
                                value={userData.alamat || "-"}
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-[5px] bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                No HP
                            </label>
                            <input
                                type="text"
                                value={userData.no_hp || "-"}
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-[5px] bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        {/* Role - Editable */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                                    required
                                >
                                    <option value="">Pilih role</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
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
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 p-6 border-t border-black/20">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Update Role
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserRoleModal;