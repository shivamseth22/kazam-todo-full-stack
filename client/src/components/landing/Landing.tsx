'use client';

import { useLoginMutation, useRegisterMutation } from '@/api-handling/auth/auth_api';
import { Lock, Mail } from 'lucide-react';
import React, { useState } from 'react';

const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useLoginMutation(setError);
  const registerMutation = useRegisterMutation(setError, setIsLogin);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      loginMutation.mutate({
        email: formData.email,
        password: formData.password,
      });
    } else {
      registerMutation.mutate({
        email: formData.email,
        password: formData.password,
      });
    }
  };


  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-green-50 to-green-200 font-sans">
      {/* Left Side */}
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
      {/* Right Side - Auth */}
      <div className="flex w-full md:w-1/2 justify-center items-center px-8 py-20 bg-white shadow-lg rounded-l-3xl">
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-10 space-x-8 border-b border-gray-300">
            <button
              onClick={() => {
                setIsLogin(true);
                setError(null);
              }}
              className={`pb-3 font-semibold text-xl ${
                isLogin ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-400'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError(null);
              }}
              className={`pb-3 font-semibold text-xl ${
                !isLogin ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-400'
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500"
              />
            </div>

            {error && <p className="text-red-600 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loginMutation.isPending || registerMutation.isPending}
              className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
            >
              {loginMutation.isPending || registerMutation.isPending
                ? 'Please wait...'
                : isLogin
                ? 'Login'
                : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
