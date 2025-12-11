import React, { useState } from "react";

const PlantDetail = ({ name, image, description, height, price }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="w-full px-6 md:px-20 py-10">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-6">
        Homepage / Catalog / Indoor plants /{" "}
        <span className="text-black">{name}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div>
          <img src={image} alt={name} className="w-full rounded-lg shadow" />
        </div>

        {/* Right content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-semibold mb-4">{name}</h1>

          <div className="mb-4">
            <h2 className="font-semibold mb-1">Description</h2>
            <p className="text-gray-600 leading-relaxed">{description}</p>
            <p className="text-gray-600 mt-2">Height: {height} cm</p>
          </div>

          <p className="text-2xl font-semibold mb-6">{price}</p>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border px-4 py-2 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 text-xl"
              >
                -
              </button>

              <span className="px-3">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 text-xl"
              >
                +
              </button>
            </div>

            <button className="bg-black text-white px-6 py-3 rounded-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
