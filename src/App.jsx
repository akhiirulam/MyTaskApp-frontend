import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from "./Pages/Login.jsx";
import { Signup } from "./Pages/Signup.jsx";
// import { TodoPage } from "./Pages/TodoPage.jsx";
import Dashboard from "./Pages/Dashboard.jsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/todos" element={<TodoPage />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
