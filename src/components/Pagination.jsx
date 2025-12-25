import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  getPageNumbers,
}) {
  return (
    <div className="flex justify-between items-center gap-2 mt-8 mb-4">
      {/* Previous tombol */}
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm ${currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-[#034032] hover:text-white"
          }`}
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page angka */}
      <div className="flex gap-2">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`min-w-[40px] h-[40px] rounded-lg font-semibold transition-all duration-200 ${page === currentPage
                ? "bg-[#034032] text-white shadow-md scale-105"
                : page === "..."
                  ? "bg-transparent text-gray-400 cursor-default"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-[#034032]/20 hover:border-[#034032]/10 hover:text-[#034032] shadow-sm"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next tombol */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm ${currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-[#034032] hover:text-white"
          }`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}