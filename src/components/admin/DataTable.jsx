import React, { useState } from "react";
import { Eye, Pencil, Trash2, RefreshCw, Plus, Search } from "lucide-react";
import Pagination from "../Pagination";
import { alertConfirm } from "../../lib/alert";

const DataTable = ({
  title,
  columns,
  data,
  searchPlaceholder,
  addButtonText,
  onAdd,
  onView,
  onEdit,
  onDelete,
  onRefresh,
  renderRow,
  searchKeys = [],
  showActions = true,
  itemsPerPage = 10,
  showPagination = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleRefresh = async () => {
    setIsLoading(true);
    if (onRefresh) {
      await onRefresh();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleDelete = async (item) => {
    try {
      const confirmed = await alertConfirm(
        "Apakah anda yakin ingin menghapus data ini?"
      );
      if (confirmed) {
        await onDelete(item);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Filter data berdasarkan search term
  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;

    return searchKeys.some((key) => {
      const value = key.split(".").reduce((obj, k) => obj?.[k], item);
      return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-4 md:mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#047158] focus:border-transparent"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 md:gap-3 w-full md:w-auto">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 flex-1 md:flex-initial text-sm md:text-base"
          >
            <RefreshCw
              className={`w-4 h-4 md:w-5 md:h-5 ${
                isLoading ? "animate-spin" : ""
              }`}
            />
            <span className="font-medium">Perbarui</span>
          </button>
          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center justify-center gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-[#047158] text-white rounded-lg hover:bg-green-700 transition-colors flex-1 md:flex-initial text-sm md:text-base"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-medium whitespace-nowrap">
                {addButtonText}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold text-[#047158] uppercase tracking-wider whitespace-nowrap">
                  NO.
                </th>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold text-[#047158] uppercase tracking-wider whitespace-nowrap"
                  >
                    {column.header}
                  </th>
                ))}
                {showActions && (
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold text-[#047158] uppercase tracking-wider whitespace-nowrap">
                    AKSI
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                      {startIndex + index + 1}
                    </td>
                    {renderRow(item, startIndex + index)}
                    {showActions && (
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 md:gap-2">
                          {onView && (
                            <button
                              onClick={() => onView(item)}
                              className="p-1.5 md:p-2 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors"
                              title="Lihat detail"
                            >
                              <Eye className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                          )}
                          {onEdit && (
                            <button
                              onClick={() => onEdit(item)}
                              className="p-1.5 md:p-2 text-orange-600 hover:bg-orange-200 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => handleDelete(item)}
                              className="p-1.5 md:p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (showActions ? 2 : 1)}
                    className="px-3 md:px-6 py-6 md:py-8 text-center text-gray-500 text-sm"
                  >
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {showPagination && filteredData.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
          getPageNumbers={getPageNumbers}
        />
      )}
    </div>
  );
};

export default DataTable;
