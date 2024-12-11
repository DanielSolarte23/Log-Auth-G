import axios from "./axios";

export const getUsersRequest = () => axios.get('/usuarios')
export const getUserRequest = (id) => axios.get(`/usuarios/${id}`)
export const updateUserRequest = (id, user) => axios.get(`/usuarios/${id}`, user)
export const deleteUserRequest = (id) => axios.get(`/usuarios/${id}`)