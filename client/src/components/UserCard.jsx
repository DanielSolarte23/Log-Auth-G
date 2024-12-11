import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import UserImage from "../../public/User.png";

function UserCard({ user }) {
    const navigate = useNavigate();

    const formattedDate = dayjs(user.createdAt).format("DD/MM/YYYY");

    const handleCardClick = () => {
        navigate(`/usuarios/${user._id}`);
    };

    return (
        <div
            className="bg-zinc-800 w-full py-10 px-5 rounded-md cursor-pointer"
            onClick={handleCardClick}
        >
            <main className="flex gap-5">
                <section>
                    <div className="object-contain w-20 h-20">
                        <img src={UserImage} alt="User" />
                    </div>
                </section>
                <section>
                    <h1 className="text-white">
                        <strong className="text-red-600">Nombre: </strong>
                        {user.username}
                    </h1>
                    <p className="text-white">
                        <strong className="text-red-600">Correo: </strong>
                        {user.email}
                    </p>
                    <p className="text-white">
                        <strong className="text-red-600">Fecha de creación: </strong>
                        {formattedDate}
                    </p>
                </section>
            </main>
        </div>
    );
}

export default UserCard;
