import axios from "./axios";

export const getTasksRequest = () => axios.get('tasks'); // Consistente con las demás solicitudes
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`); // Cambiado a "tasks" para mantener consistencia
export const createTasksRequest = (task) => axios.post('/tasks', task);
export const updateTasksRequest = (id, task) => axios.put(`/tasks/${id}`, task); // Agregado el segundo argumento
export const deleteTasksRequest = (id) => axios.delete(`/tasks/${id}`);
