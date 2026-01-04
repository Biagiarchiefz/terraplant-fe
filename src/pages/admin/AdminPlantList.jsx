import React, { useState, useEffect } from "react";
import DataTable from "../../components/admin/DataTable";
import PlantModal from "../../components/admin/PlantModal";
import { usePlantListStore } from "../../store/usePlantListStore";
import {
  createPlant,
  deletePlant,
  updatePlant,
} from "../../services/plant.services";
import { formatPrice } from "../../utils/formatter";

const AdminPlantList = () => {
  const plants = usePlantListStore((state) => state.plants);
  const fetchPlants = usePlantListStore((state) => state.fetchPlants);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit'
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Data dummy untuk contoh
  useEffect(() => {
    fetchPlants();
  }, []);

  const columns = [
    { header: "TANAMAN" },
    { header: "KATEGORI" },
    { header: "HARGA" },
    { header: "STOK" },
    { header: "STATUS" },
  ];

  const handleEdit = (plant) => {
    setSelectedPlant(plant);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (plant) => {
    try {
      await deletePlant(plant.id);
      await fetchPlants(); // Refresh data setelah delete
    } catch (error) {
      console.error("hapus tanaman eror:", error);
    }
  };

  const handleAddPlant = () => {
    setSelectedPlant(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlant(null);
  };

  const handleModalSubmit = async (formData, mode) => {
    try {
      // Buat FormData untuk mengirim file
      const submitData = new FormData();
      submitData.append("nama", formData.nama);
      submitData.append("harga", formData.harga);
      submitData.append("deskripsi", formData.deskripsi);
      submitData.append("kategori", formData.kategori);
      submitData.append("stok", formData.stok);

      // Append gambar jika ada
      if (formData.gambar) {
        submitData.append("gambar", formData.gambar);
      }

      if (mode === "create") {
        await createPlant(submitData);
      } else if (mode === "edit") {
        await updatePlant(formData.id, submitData);
      }
      await fetchPlants(); // Refresh data setelah create/update
    } catch (error) {
      console.error(
        `Error ${mode === "create" ? "creating" : "updating"} plant:`,
        error
      );
    }
  };

  const handleRefresh = async () => {
    fetchPlants();
  };

  const renderRow = (plants) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <img
            src={plants.gambar?.[0] || plants.image}
            alt={plants.nama}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <div className="text-sm font-medium text-gray-900">
              {plants.nama}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900">{plants.kategori}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-900">
          {formatPrice(plants.harga)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900">{plants.stok} unit</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {plants.stok > 0 ? (
          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Tersedia
          </span>
        ) : (
          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            Habis
          </span>
        )}
      </td>
    </>
  );

  return (
    <>
      <DataTable
        title="Daftar Tanaman"
        columns={columns}
        data={plants}
        searchPlaceholder="Cari tanaman berdasarkan nama atau kategori"
        addButtonText="Tambah Tanaman"
        searchKeys={["nama", "kategori"]}
        onAdd={handleAddPlant}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRefresh={handleRefresh}
        renderRow={renderRow}
        itemsPerPage={10}
      />

      {/* Plant Modal */}
      <PlantModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        initialData={selectedPlant}
        mode={modalMode}
      />
    </>
  );
};

export default AdminPlantList;