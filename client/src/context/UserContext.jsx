import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import {
  getUsersRequest,
  deleteUserRequest,
  getUserRequest,
  updateUserRequest,
} from "../api/user";

const UserContext = createContext();
export const useUsers = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("El useUsers debe estar dentro de UserProvider");
  }

  return context;
};

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await deleteUserRequest(id);
      if (res.status === 204) setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (id) => {
    try {
      const res = await getUserRequest(id);
      return res.data;
    } catch (error) {
       console.log(error);
       
    }
  };

  const updateUser = async(id, user) =>{
    try {
      await updateUserRequest(id, user)  
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        deleteUser,
        getUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
