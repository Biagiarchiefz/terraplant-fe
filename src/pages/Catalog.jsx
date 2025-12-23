import { Search, Sprout } from "lucide-react";
import React from "react";
import { usePlants } from "../hooks/usePlants";
import PlantCard from "../components/PlantCard";
import Pagination from "../components/Pagination";

const Catalog = () => {
  const plants = usePlants();
  const dummyPages = () => [1, 2, 3, 4, 6, 7, 8];

  return (
    <div className="pb-10">
      <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/images/catalog-hero.webp")] bg-no-repeat bg-cover bg-center h-screen'>
        {/* Text Plant  */}
      </div>

      <div className="px-20 relative top-[-90px]">
        <div className="rounded-2xl shadow-sm p-4 mb-8 bg-white">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold text-foreground whitespace-nowrap">
              Give All You Need
            </h2>

            <div className="flex items-center gap-2 bg-muted rounded-full pl-4 border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search on Stuffsus"
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button className="rounded-full px-6 py-2 text-white bg-[#1B1B1B]">
                Search
              </button>
            </div>
          </div>

          <div className="flex gap-5 mt-10">
            {/* sidebar filter */}
            <div className="md:w-[250px]">
              <h1 className="text-xl font-bold">Category</h1>
              <div className="mt-3 flex flex-col">
                <button className="flex items-center hover:bg-black/15 w-full p-2 rounded-sm gap-2">
                  <Sprout />
                  Semua Tanaman
                </button>

                <button className="flex items-center hover:bg-black/15 w-full p-2 rounded-sm gap-2">
                  <Sprout />
                  Tanaman Indoor
                </button>

                <button className="flex items-center hover:bg-black/15 w-full p-2 rounded-sm gap-2">
                  <Sprout />
                  Tanaman Outdoor
                </button>
              </div>
            </div>

            {/* plant list  */}
            <div className="md:w-full">
              <PlantCard
                classname="grid grid-cols-1 md:grid-cols-3"
                plants={plants}
              />
              {plants && (
                <Pagination
                  currentPage={0}
                  totalPages={3}
                  onPageChange={(page) => console.log(page)}
                  onPrevious={() => console.log("prev")}
                  onNext={() => console.log("next")}
                  getPageNumbers={dummyPages}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-20">
        <h1 className="text-4xl font-bold">Explore our recomendations</h1>
        <PlantCard classname="mt-10 flex" plants={plants} />
      </div>
    </div>
  );
};

export default Catalog;