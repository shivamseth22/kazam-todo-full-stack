"use client";
import Link from "next/link";
import { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add login logic here (API call)
    console.log("Login data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
          className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account? <Link href="/auth/signUp" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
