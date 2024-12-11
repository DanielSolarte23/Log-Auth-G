import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUsers } from "../context/UserContext";

const UserImage = "/User.png";

function PerfilPage() {
  const { id } = useParams();
  const { getUser } = useUsers();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await getUser(id);
        setUser(userData);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p>Cargando usuario...</p>;

  if (!user) return <p>Hubo un error al cargar los datos del usuario.</p>;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-zinc-800 max-w-xl w-full h-5/6  py-8 px-10 rounded-md flex flex-col gap-5">
        <div className="w-full flex justify-center">
          <div className="object-contain w-40 h-40 flex">
            <img src={UserImage} alt="Perfil del Usuario" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex h-[30%] gap-2 w-full">
            <label className="text-red-600 text-xl font-semibold w-2/4"><strong>Nombre: </strong></label>
            <input
              type="text"
              // {...register("email", { required: true })}
              className="w-full bg-transparent border outline-none text-xl text-white px-4 py-2 rounded-md h-[100%] placeholder:text-white shadow-xl"
              placeholder={user.username}
            />
          </div>
          <div className="flex h-[30%] gap-2 w-full">
            <label className="text-red-600 text-xl font-semibold w-2/4"><strong>Correo: </strong></label>
            <input
              type="text"
              // {...register("email", { required: true })}
              className="w-full bg-transparent border outline-none text-xl text-white px-4 py-2 rounded-md h-[100%] placeholder:text-white shadow-xl"
              placeholder={user.email}
            />
          </div>
          <div className="flex h-[30%] gap-2 w-full">
            <label className="text-red-600 text-xl font-semibold w-2/4"><strong>Contraseña: </strong></label>
            <input
              type="password"
              // {...register("email", { required: true })}
              className=" bg-transparent border outline-none text-xl text-white px-4 py-2 rounded-md h-[100%] placeholder:text-white shadow-xl w-full"
              placeholder={user.password}
            />
          </div>
          <hr className="h-1 border-red-600"/>
        </div>
        <div className="w-full flex justify-between">
          <Link to="/usuarios" className="text-red-600 border rounded-md px-4 py-2 font-semibold border-red-600 hover:text-red-400 ">
            Regresar
          </Link>
          <Link className=" rounded-md px-4 py-2 font-semibold bg-red-600 text-white hover:text-red-400 ">Eliminar Cuenta</Link>
        </div>
      </div>
    </div>
  );
}

export default PerfilPage;
