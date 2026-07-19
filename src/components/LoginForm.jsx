import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", formData);

      alert(response.data.message);
      navigate("/todos");
    } catch (error) {
      console.log(error);
      console.log(error.response);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-96 rounded-md border bg-white p-8 shadow-lg">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-green-600">Welcome Back</h1>
        <p className="text-gray-500">Sign in to manage your tasks</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        <button
          onClick={handleLogin}
          className="rounded-md bg-green-600 py-2 text-white hover:bg-green-700"
        >
          Sign In
        </button>
      </div>
      <div className="mt-4 text-center text-sm text-gray-600">
        New Member?{" "}
        <Link
          to="/signup"
          className="font-medium text-green-600 hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
