import { useEffect } from "react";
import { useUsers } from "../context/UserContext";

import UserCard from "../components/UserCard";

export default function UsersPage() {
    const { getUsers, users } = useUsers();

    console.log(users);

    useEffect(() => {
        getUsers();
    }, []);

    if (users.length === 0) return (<h1>No hay usuarios para mostrar</h1>)

    return <div className="grid md:grid-cols-3 gap-2 sm:grid-cols-2 p-5">
        {
            users.map(user => (
                <UserCard user={user} key={user._id} />
            ))
        }
    </div>;
}
