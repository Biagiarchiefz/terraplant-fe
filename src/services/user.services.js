import api from "./api";

export const getAllUserForAdmin = async () => {
  try {
    const response = await api.get(`/admin/users`);
    return response;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}


export const updateUserByAdmin = async ( id, role) => {
  try {
    const response = await api.patch(`/admin/users/${id}/role`, role);
    return response;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}


export const deleteUserByAdmin = async ( id ) => {
  try {
    const response = await api.delete(`/admin/users/${id}`);
    return response;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}