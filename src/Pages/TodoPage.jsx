import React from "react";
import Navbar from "../components/Navbar";
import { Todo } from "../components/Todo";

export function TodoPage() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-green-600 to-green-200 flex justify-center py-10">
        <Todo />
      </div>
    </div>
  );
}
