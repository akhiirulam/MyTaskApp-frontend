import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    try {
      const response = await api.post("/auth/signup", formData);

      alert(response.data.message);

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="w-96 rounded-md border bg-white p-8 shadow-lg">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-green-600">Create Account</h1>
        <p className="text-gray-500">Sign up to start managing your tasks</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border p-2 focus:border-green-600 focus:outline-none"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border p-2 focus:border-green-600 focus:outline-none"
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
            className="mt-1 w-full rounded-md border p-2 focus:border-green-600 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSignup}
          className="mt-2 rounded-md bg-green-600 py-2 text-white transition hover:bg-green-700"
        >
          Sign Up
        </button>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="font-medium text-green-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
