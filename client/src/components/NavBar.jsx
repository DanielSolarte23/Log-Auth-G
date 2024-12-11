import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css"
import Logo from "./Logo";
import "@fortawesome/fontawesome-free"

export default function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(user);

  return (
    <nav className="flex justify-between py-5 px-10 h-[12%] w-full  shadow-xl contain fixed">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <div className=" flex justify-center items-center w-20 h-full">
          <Logo className={`w-full`} />
        </div>
      </Link>
      <ul className="flex gap-x-5 items-center ">
        {isAuthenticated ? (
          <>
            <li className="text-red-700 text-xl font-semibold flex items-center gap-2">Bienvenido {user.username}
              <Link to={`/mi-perfil/${user.id}`}  className="w-10 h-10 border-2 border-red-700 rounded-full">
                  <i className="fa-solid fa-user"></i>
              </Link>
            </li>

            <li className="bg-red-700 w-36 text-center font-bold text-xl p-2 rounded-md">
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="bg-red-700 w-36 text-center font-bold text-xl p-2 rounded-md">
              <Link to="/login">Inicio Sesión</Link>
            </li>
            <li className="p-2 border-2 border-red-700 w-36 text-center font-bold text-red-700 rounded-md">
              <Link to="/register">Registro</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
