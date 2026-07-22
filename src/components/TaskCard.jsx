import api from "../services/api";

const fetchTasks = async () => {
  const { data } = await api.get("/todo/showTask");
  setTasks(data.tasks);
};

const TaskCard = ({ task, fetchTasks, onEdit }) => {
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    try {
      await api.put(`/todo/updateStatus/${task._id}`, {
        status: newStatus,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/todo/deleteTask/${task._id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-xl border bg-white p-5 shadow-md">
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            task.priority === "high"
              ? "bg-red-100 text-red-700"
              : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
          }`}
        >
          {task.priority.toUpperCase()}
        </span>

        <div className="flex gap-3">
          <button onClick={() => onEdit(task)}>✏️</button>
          <button onClick={handleDelete}>🗑️</button>
        </div>
      </div>

      <h3 className="text-2xl font-bold">{task.title}</h3>

      <p className="mt-2 text-gray-500">{task.description}</p>

      <hr className="my-5" />

      <div className="flex items-center justify-between">
        <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>

        <select
          value={task.status}
          onChange={handleStatusChange}
          className="mt-4 rounded-full border px-4 py-2"
        >
          <option value="todo">To Do</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;
