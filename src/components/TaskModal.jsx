import { useEffect, useState } from "react";
import api from "../services/api";

const TaskModal = ({ task, onClose, fetchTasks }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "todo",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate.slice(0, 10),
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "low",
        status: "todo",
        dueDate: "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (task) {
        await api.put(`/todo/editTask/${task._id}`, formData);
      } else {
        await api.post("/todo/addTask", formData);
      }

      fetchTasks();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-xl bg-white p-6"
      >
        <h2 className="mb-6 text-2xl font-bold">
          {task ? "Edit Task" : "Add Task"}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3"
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3"
        >
          <option value="todo">To Do</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="mb-6 w-full rounded border p-3"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded bg-orange-500 px-4 py-2 text-white"
          >
            {task ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskModal;
