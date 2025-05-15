"use client";

import { Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AuthLayout = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // For showing loading state or errors (optional)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = isLogin ? "/users/login" : "/users/register";
      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // if your backend uses cookies/session
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Success logic: redirect or show message
      if (isLogin) {
        router.replace("/dashboard"); // redirect after login
      } else {
        alert("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-green-50 to-green-200 font-sans">
      {/* Left Side - Info */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white flex-col justify-center px-20 py-24 space-y-8">
        <h1 className="text-6xl font-extrabold tracking-wide drop-shadow-lg">
          Organize Your Life
        </h1>
        <p className="text-lg max-w-xl leading-relaxed drop-shadow-sm">
          Boost your productivity with our clean, simple, and powerful ToDo app.
          Manage your tasks, set deadlines, and achieve your goals effortlessly.
        </p>

        <ul className="list-disc list-inside space-y-3 max-w-md text-green-200">
          <li>Intuitive & Modern UI</li>
          <li>Cross-device sync & real-time updates</li>
          <li>Smart reminders & notifications</li>
          <li>Organize tasks by category & priority</li>
        </ul>
      </div>

      {/* Right Side - Login / Signup */}
      <div className="flex w-full md:w-1/2 justify-center items-center px-8 py-20 bg-white shadow-lg rounded-l-3xl">
        <div className="max-w-md w-full">
          {/* Toggle Buttons */}
          <div className="flex justify-center mb-10 space-x-8 border-b border-gray-300">
            <button
              onClick={() => {
                setIsLogin(true);
                setError(null);
              }}
              className={`relative pb-3 font-semibold text-xl transition-colors ${
                isLogin
                  ? "text-green-700 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-green-700"
                  : "text-gray-400 hover:text-green-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError(null);
              }}
              className={`relative pb-3 font-semibold text-xl transition-colors ${
                !isLogin
                  ? "text-green-700 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-green-700"
                  : "text-gray-400 hover:text-green-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-green-600" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-green-600" />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {error && (
              <p className="text-red-600 text-center font-semibold">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg shadow-md transition disabled:opacity-50"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
