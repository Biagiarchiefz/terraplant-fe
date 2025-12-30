import React, { useState, useEffect } from "react";
import {
  CircleDollarSign,
  CopyPlus,
  Leaf,
  Package,
  X,
  PenSquare,
} from "lucide-react";

const PlantModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  mode = "create", // 'create' or 'edit'
}) => {
  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    deskripsi: "",
    kategori: "",
    stok: "",
    gambar: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  // Reset atau populate form ketika modal dibuka
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        // Populate form dengan data yang akan diedit
        setFormData({
          nama: initialData.nama || "",
          harga: initialData.harga || "",
          deskripsi: initialData.deskripsi || "",
          kategori: initialData.kategori || "",
          stok: initialData.stok || "",
          gambar: null,
        });
        // Set preview dari gambar array atau image URL
        const imageUrl = initialData.gambar?.[0] || initialData.image;
        if (imageUrl) {
          setPreviewImage(imageUrl);
        }
      } else {
        // Reset form untuk create mode
        resetForm();
      }
    }
  }, [isOpen, mode, initialData]);

  const resetForm = () => {
    setFormData({
      nama: "",
      harga: "",
      deskripsi: "",
      kategori: "",
      stok: "",
      gambar: null,
    });
    setPreviewImage(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        gambar: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kirim data ke parent component
    const submitData = {
      ...formData,
      id: initialData?.id, // Include ID jika edit mode
    };

    onSubmit(submitData, mode);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-black/20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-[10px] flex items-center justify-center">
              {mode === "edit" ? (
                <PenSquare className="text-green-900" />
              ) : (
                <CopyPlus className="text-green-900" />
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === "edit" ? "Edit Tanaman" : "Tambah Tanaman Baru"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors hover:bg-black/20 rounded-[10px] p-2"
          >
            <X />
          </button>
        </div>

        {/* Form - Scrollable */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Tanaman */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Tanaman <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Leaf
                  className="absolute inset-y-0 left-2 top-2 flex items-center pointer-events-none text-black/30"
                  size={23}
                />
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama tanaman"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Harga */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <CircleDollarSign
                  className="absolute inset-y-0 left-2 top-2 flex items-center pointer-events-none text-black/30"
                  size={23}
                />
                <input
                  type="number"
                  name="harga"
                  value={formData.harga}
                  onChange={handleInputChange}
                  placeholder="Masukkan harga"
                  className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                  style={{
                    backgroundImage: "none",
                  }}
                  required
                >
                  <option value="" className="py-2">
                    Pilih kategori
                  </option>
                  <option value="indoor" className="py-2 hover:bg-green-50">
                    Tanaman Indoor
                  </option>
                  <option value="outdoor" className="py-2 hover:bg-green-50">
                    Tanaman Outdoor
                  </option>
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

            {/* Stok */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stok <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Package
                  className="absolute inset-y-0 left-2 top-2 flex items-center pointer-events-none text-black/30"
                  size={23}
                />
                <input
                  type="number"
                  name="stok"
                  value={formData.stok}
                  onChange={handleInputChange}
                  placeholder="Masukkan jumlah stok"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Deskripsi (Full Width) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                placeholder="Masukkan deskripsi tanaman"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Gambar (Full Width) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar{" "}
                {mode === "create" && <span className="text-red-500">*</span>}
                {mode === "edit" && (
                  <span className="text-gray-500 text-xs ml-2">
                    (Opsional - biarkan kosong jika tidak ingin mengubah gambar)
                  </span>
                )}
              </label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    id="img"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border file:pr-2 file:border-r file:border-gray-400 border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required={mode === "create"}
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Format: JPG, PNG, atau JPEG. Max 2MB
                  </p>
                </div>
                {previewImage && (
                  <div className="w-24 h-24 border-2 border-gray-300 rounded-lg overflow-hidden">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-end gap-3 p-6 border-t border-black/20 flex-shrink-0">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#047158] text-white rounded-lg hover:bg-[#008c6b] transition-colors"
            >
              {mode === "edit" ? "Update Tanaman" : "Simpan Tanaman"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlantModal;