"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react"; // Optional: You can use icons for visual feedback

const Settings = () => {
  const [isDark, setIsDark] = useState(false);

  // Load saved theme preference from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Settings
        </h1>

        {/* Theme Toggle Section */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-gray-800 dark:text-white font-semibold">
              Dark Mode
            </span>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center  w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"
            >
              <div
                className={`w-6 h-6 rounded-full transition-all duration-300 transform ${
                  isDark ? "translate-x-4 bg-yellow-400" : "-translate-x-4 bg-gray-700"
                }`}
              ></div>
            </button>
          </div>

          {/* Optional Icon for Theme */}
          {isDark ? (
            <Moon size={24} className="text-gray-500 dark:text-white" />
          ) : (
            <Sun size={24} className="text-gray-500 dark:text-white" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;