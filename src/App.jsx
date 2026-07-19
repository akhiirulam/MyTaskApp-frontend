import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from "./Pages/Login.jsx";
import { Signup } from "./Pages/Signup.jsx";
import { Todo } from "./components/Todo.jsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todos" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};
