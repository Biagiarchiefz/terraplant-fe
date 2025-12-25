import { Search, Sprout } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import { usePlants } from "../hooks/usePlants";
import PlantCard from "../components/PlantCard";
import Pagination from "../components/Pagination";
import PlantRecomendations from "../components/PlantRecomendations";

const Catalog = () => {
  const plants = usePlants();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Update searchQuery ketika URL parameter berubah
  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Filter dan search plants
  const filteredPlants = useMemo(() => {
    if (!plants) return [];

    let filtered = [...plants];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (plant) =>
          plant.kategori?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((plant) =>
        plant.nama?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [plants, selectedCategory, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPlants.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPlants = filteredPlants.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search already handled by useMemo
  };

  return (
    <div className="pb-10">
      <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/images/catalog-hero.jpg")] bg-no-repeat bg-cover bg-center h-screen'>
        {/* Text Plant  */}
      </div>

      <div className="px-20 relative top-[-90px]">
        <div className="rounded-2xl shadow-sm p-4 mb-8 bg-white">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold text-gray-900 whitespace-nowrap">
              Give All You Need
            </h2>

            <div className="flex items-center gap-2 bg-gray-100 rounded-full pl-4 border border-gray-200">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search plants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-gray-900 placeholder:text-gray-500 outline-none py-2 w-64"
              />
              <button
                onClick={handleSearch}
                className="rounded-full px-6 py-2 text-white bg-gray-900 hover:bg-gray-800 transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          <div className="flex gap-5 mt-10">
            {/* sidebar filter */}
            <div className="md:w-[250px]">
              <h1 className="text-xl font-bold text-gray-900">Category</h1>
              <div className="mt-3 flex flex-col gap-1">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`flex items-center w-full p-3 rounded-lg gap-2 transition-colors ${selectedCategory === "all"
                    ? "bg-green-100 text-[#034032] font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <Sprout className="w-5 h-5" />
                  Semua Tanaman
                </button>

                <button
                  onClick={() => setSelectedCategory("indoor")}
                  className={`flex items-center w-full p-3 rounded-lg gap-2 transition-colors ${selectedCategory === "indoor"
                    ? "bg-green-100 text-[#034032] font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <Sprout className="w-5 h-5" />
                  Tanaman Indoor
                </button>

                <button
                  onClick={() => setSelectedCategory("outdoor")}
                  className={`flex items-center w-full p-3 rounded-lg gap-2 transition-colors ${selectedCategory === "outdoor"
                    ? "bg-green-100 text-[#034032] font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <Sprout className="w-5 h-5" />
                  Tanaman Outdoor
                </button>
              </div>
            </div>

            {/* plant list  */}
            <div className="md:w-full">
              {currentPlants.length > 0 ? (
                <>
                  <PlantCard
                    classname="grid grid-cols-1 md:grid-cols-3 gap-4"
                    plants={currentPlants}
                  />
                  {filteredPlants.length > ITEMS_PER_PAGE && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      onPrevious={handlePrevious}
                      onNext={handleNext}
                      getPageNumbers={getPageNumbers}
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <Sprout className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Tumbuhan belum tersedia
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Tanaman dengan kategori ini belum tersedia
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PlantRecomendations />
    </div>
  );
};

export default Catalog;