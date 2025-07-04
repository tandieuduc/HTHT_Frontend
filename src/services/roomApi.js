import axiosInstance from "./apiInstance";

export const getAllRooms = () => axiosInstance.get('/room/get-all-room');

export const createRoom = (data) => axiosInstance.post('/room/save-room', data)

export const updateRoom = (data) => axiosInstance.put('/room/update-room', data)

export const deleteRoom = (id) => axiosInstance.delete(`/room/delete-room/${id}`)