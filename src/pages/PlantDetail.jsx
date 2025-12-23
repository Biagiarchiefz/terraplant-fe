import { useEffect, useState } from "react";
import plant1 from "../assets/images/plants1.webp";
import { Minus, Plus } from "lucide-react";
import { Link, useParams } from "react-router";
import { plantDetail } from "../services/plant.services";


const Plant = () => {
  const [plant, setPlant] = useState({});
  const [quantity, setQuantity] = useState(1);
  const price = plant.harga;
  const totalPrice = quantity * price;

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await plantDetail(id);
      setPlant(response.data);
    };

    getData();
  }, [id]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-6 mt-15">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-gray-900">
            Homepage
          </Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-gray-900">
            Catalog
          </Link>
          <span>/</span>
          <Link to="/indoor-plants" className="hover:text-gray-900">
            Indoor plants
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Ficus Lirata</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={plant1}
              alt="Ficus Lirata"
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              {plant.nama}
            </h1>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {plant.deskripsi}
              </p>
              <p className="text-gray-700">Height: 80 cm</p>
            </div>

            {/* Price and Add to Cart */}
            <div className="mt-auto">
              <div className="text-3xl font-bold text-gray-900 mb-6">
                {totalPrice ? (
                  <p>
                    Rp.{totalPrice.toLocaleString()}
                  </p>
                ) : (
                  <p>Rp.0</p>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={handleDecrement}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(0, Number.parseInt(e.target.value) || 0)
                      )
                    }
                    className="w-16 text-center border-x border-gray-300 py-3 focus:outline-none overflow-y-hidden"
                    min="0"
                  />
                  <button
                    onClick={handleIncrement}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button className="bg-black text-white px-6 py-3 text-base hover:bg-gray-800 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plant;