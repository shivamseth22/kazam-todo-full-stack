"use client"
import { usePathname } from 'next/navigation';
import React, { useState } from "react";
import {
  LayoutDashboard,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname(); // Get current path using usePathname

  const toggleSidebar = () => setCollapsed(!collapsed);

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Settings", icon: Settings, path: "/settings" },
    { label: "Profile", icon: User, path: "/auth/profile" },
  ];



  return (
    <aside
      className={`h-screen bg-white border-r shadow-sm transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex space-x-2 justify-center items-center">
            LOGO
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-black transition ml-3"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu */}
      <ul className="mt-4 space-y-1">
        {menuItems.map(({ label, icon: Icon, path }) => {
          return (
            <li
              key={label}
              onClick={() => window.location.href = path} // Navigate to the route
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md mx-3 transition-colors duration-200 ${
                pathname === path
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon size={18} />
              {!collapsed && <span>{label}</span>}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
