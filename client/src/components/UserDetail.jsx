import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUsers } from "../context/UserContext";
import dayjs from "dayjs";
import UserImage from "../../public/User.png"

function UserDetail() {
  const { id } = useParams(); // Obtén el ID del usuario desde la URL
  const { getUser } = useUsers(); // Usa la función del contexto para obtener un usuario
  const [user, setUser] = useState(null); // Estado para almacenar el usuario actual
  const [loading, setLoading] = useState(true); // Estado para manejar el spinner de carga

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true); // Marca como cargando
        const userData = await getUser(id); // Llama a `getUser` con el ID
        setUser(userData); // Actualiza el estado con los datos recibidos
      } catch (error) {
        console.error("Error al obtener el usuario:", error); // Manejo de errores
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchUser(); // Ejecuta la función al montar el componente
  }, [id, getUser]);

  // Mientras los datos se cargan
  if (loading) return <p>Cargando usuario...</p>;

  // Si no se encuentra el usuario
  if (!user) return <p>No se encontró el usuario.</p>;

  // Renderiza el detalle del usuario
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-zinc-800 max-w-md w-full h-3/4 py-10 px-10 rounded-md flex flex-col gap-10">
        <div className="w-full flex justify-center ">
          <div className=" object-contain w-40 h-40 flex">
            <img src={UserImage} alt="" />
          </div>
        </div>
        <div>
          <h1 className="text-white text-2xl">
            <strong className="text-red-600">Nombre: </strong>
            {user.username}
          </h1>
          <p className="text-white text-2xl">
            <strong className="text-red-600">Correo: </strong>
            {user.email}
          </p>
          <p className="text-white text-2xl">
            <strong className="text-red-600">Fecha de creación: </strong>
            {dayjs(user.createdAt).format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="w-full">
          <Link to="/usuarios">Regresar</Link>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
