import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import {
  createTasksRequest,
  getTasksRequest,
  deleteTasksRequest,
  getTaskRequest,
  updateTasksRequest,
} from "../api/task";

const TaskContext = createContext();
export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("El useTask debe estar dentro de AuthProvider");
  }

  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTask] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTask(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    const res = await createTasksRequest(task);
    console.log(res);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTasksRequest(id);
      if (res.status === 204) setTask(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
       console.log(error);
       
    }
  };

  const updateTask = async(id, task) =>{
    try {
      await updateTasksRequest(id, task)  
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
