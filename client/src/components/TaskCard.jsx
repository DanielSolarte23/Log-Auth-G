import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";
import days from "dayjs";
import { utc } from "dayjs";
days.extend(utc)

export default function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            className="py-1 px-2 rounded-md bg-red-600 "
            onClick={() => {
              deleteTask(task._id)
            }}
          >
            Borrar
          </button>
          <Link className="py-1 px-2 rounded-md bg-lime-500" to={`/tasks/${task._id}`}>Editar</Link>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p>{days(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  );
}
