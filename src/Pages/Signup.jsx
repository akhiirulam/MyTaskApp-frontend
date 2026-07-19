import React from "react";
import SignupForm from "../components/SignupForm.jsx";

export function Signup() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-green-600 to-green-200">
      <SignupForm />
    </div>
  );
}
