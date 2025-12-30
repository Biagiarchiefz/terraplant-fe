import Swal from "sweetalert2";

export const alertSucces = async (message) => {
  return Swal.fire({
    icon: "success",
    title: "succes",
    text: message,
    confirmButtonColor: "#034032",
    iconColor: "#034032",
  });
};

export const alertError = async (message) => {
  return Swal.fire({
    icon: "error",
    title: "Ups",
    text: message,
    confirmButtonColor: "#1B1B1B",
  });
};

export const alertConfirm = async (message) => {
  const result = await Swal.fire({
    icon: "question",
    title: "are you sure?",
    text: message,
    showCancelButton: true,
    confirmButtonColor: "#034032",
    cancelButtonColor: "#1B1B1B",
    confirmButtonText: "Yes",
    iconColor: "#034032",
  });
  // .isConfirmed bernilai true jika user menekan tombol "Yes" (biasanya tombol utama)
  return result.isConfirmed;
};
