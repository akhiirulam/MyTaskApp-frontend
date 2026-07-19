import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get("/todo/showTask");
      console.log(response);
      setTodos(response.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTask = async () => {
    if (!inputValue.trim()) return;

    try {
      if (isEditing) {
        await api.put(`/todo/editTask/${editId}`, {
          text: inputValue,
        });

        setIsEditing(false);
        setEditId(null);
      } else {
        await api.post("/todo/addTask", {
          text: inputValue,
        });
      }

      setInputValue("");

      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todo/deleteTask/${id}`);

      fetchTodos();

      if (editId === id) {
        setInputValue("");
        setEditId(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (todo) => {
    setInputValue(todo.text);
    setEditId(todo._id);
    setIsEditing(true);
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-green-200 flex justify-center py-10">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-xl">
        <header className="relative mb-8">
          <button
            onClick={handleLogout}
            className="absolute right-0 top-0 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            Logout
          </button>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-600">My Tasks</h1>
            <p className="mt-2 text-gray-500">
              Organize your daily tasks efficiently
            </p>
          </div>
        </header>

        <div className="mb-8 flex gap-3">
          <input
            type="text"
            placeholder="Enter your task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 rounded-md border border-gray-300 p-3 outline-none focus:border-green-600"
          />

          <button
            onClick={handleAddTask}
            className="rounded-md bg-green-600 px-6 text-white transition hover:bg-green-700"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>

        <div className="space-y-4">
          {todos?.length > 0 ? (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex items-center justify-between rounded-md border border-gray-200 p-4 shadow-sm"
              >
                <p className="text-lg text-gray-700">{todo.text}</p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-md border border-dashed border-gray-300 p-8 text-center text-gray-500">
              No tasks available. Add your first task.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
