import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Link, useParams } from "react-router";
import { plantDetail } from "../services/plant.services";
import { addCart } from "../services/cart.services";
import { alertError, alertSucces } from "../lib/alert";
import useCartStore from "../store/useCartStore";
import useAuthStore from "../store/useAuthStore";

const PlantDetail = () => {
  const [plant, setPlant] = useState({});
  const [quantity, setQuantity] = useState(1);
  const price = plant.harga;
  const totalPrice = quantity * price;

  const fetchCart = useCartStore((state) => state.fetchCart);
  const user = useAuthStore((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await plantDetail(id);

      // console.log(response.data)
      setPlant(response.data);
    };
    getData();
  }, [id]);

  const handleAddCart = async () => {
    try {
      await addCart({
        plantId: plant.id,
        qty: quantity,
      });

      await fetchCart(user.id); // Refresh cart setelah add item
      await alertSucces("Tanaman ditambahkan ke keranjang");
    } catch (err) {
      await alertError("Gagal menambahkan tanaman ke keranjang");
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-8 lg:px-12 mt-12 md:mt-15">
      {/* Product Section */}
      <div className="container mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-8 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={plant.gambar}
              alt={plant.nama || "Plant"}
              className="w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px] object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-8">
              {plant.nama}
            </h1>

            <div className="mb-6 md:mb-8">
              <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                Description
              </h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {plant.deskripsi}
              </p>
            </div>

            <div className="mt-auto">
              <div className="flex flex-col sm:flex-col gap-3 md:gap-4">
               
                <div className="flex items-center justify-between gap-3">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {totalPrice ? (
                      <p>Rp.{totalPrice.toLocaleString()}</p>
                    ) : (
                      <p>Rp.0</p>
                    )}
                  </div>

                  {/* qty */}
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={handleDecrement}
                      className="p-2 md:p-3 hover:bg-gray-100 transition-colors flex-shrink-0"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.max(0, Number.parseInt(e.target.value) || 0)
                        )
                      }
                      className="w-12 md:w-16 text-center border-x border-gray-300 py-2 md:py-3 text-sm md:text-base focus:outline-none"
                      min="0"
                    />
                    <button
                      onClick={handleIncrement}
                      className="p-2 md:p-3 hover:bg-gray-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>

                {/* tombol tambah ke keranjang */}
                <button
                  onClick={handleAddCart}
                  className="bg-black text-white px-6 py-2.5 md:py-3 text-sm md:text-base hover:bg-gray-800 transition-colors w-full"
                >
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
