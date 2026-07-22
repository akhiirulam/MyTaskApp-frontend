import { useEffect, useState } from "react";
import api from "../services/api";
import TaskModal from "./TaskModal";
import TaskCard from "./TaskCard";

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await api.get("/todo/showTask");
    setTasks(data.tasks);

    console.log(data.tasks);
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-end">
        <button
          onClick={() => {
            (setSelectedTask(null), setOpenModal(true));
          }}
          className="rounded-full bg-orange-500 px-6 py-3 text-white"
        >
          + Add Task
        </button>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="rounded-2xl border bg-gray-50 p-6">
          <h2 className="text-xl font-bold uppercase">To Do</h2>
          <div className="mt-2 h-1 bg-orange-500 rounded-full"></div>
        </div>

        <div className="rounded-2xl border bg-gray-50 p-6">
          <h2 className="text-xl font-bold uppercase">In Progress</h2>
          <div className="mt-2 h-1 bg-orange-500 rounded-full"></div>
        </div>

        <div className="rounded-2xl border bg-gray-50 p-6">
          <h2 className="text-xl font-bold uppercase">Done</h2>
          <div className="mt-2 h-1 bg-orange-500 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-6">
        <div>
          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                fetchTasks={fetchTasks}
                onEdit={(task) => {
                  setSelectedTask(task);
                  setOpenModal(true);
                }}
              />
            ))}
        </div>

        <div>
          {tasks
            .filter((task) => task.status === "progress")
            .map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                fetchTasks={fetchTasks}
                onEdit={(task) => {
                  setSelectedTask(task);
                  setOpenModal(true);
                }}
              />
            ))}
        </div>

        <div>
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                fetchTasks={fetchTasks}
                onEdit={(task) => {
                  setSelectedTask(task);
                  setOpenModal(true);
                }}
              />
            ))}
        </div>
      </div>
      {openModal && (
        <TaskModal
          task={selectedTask}
          onClose={() => {
            setOpenModal(false);
            setSelectedTask(null);
          }}
          fetchTasks={fetchTasks}
        />
      )}
    </div>
  );
};

export default Board;
