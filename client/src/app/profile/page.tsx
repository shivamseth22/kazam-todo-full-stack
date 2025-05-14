"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const Profile = () => {
  // Simulate auth state (initially false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userData, setUserData] = useState({
    name: "Shivam Seth",
    email: "shivam@example.com",
    phone: "+1234567890",
    bio: "Web Developer passionate about building user-friendly applications.",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  const handleEdit = () => {
    if (isEditing) {
      setUserData(editedData); // Save changes
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    // Simulated login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Simulated logout
    setIsLoggedIn(false);
    setIsEditing(false); // Reset editing mode if active
  };

  // If not logged in, show login button
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to access your profile and manage your information.
          </p>
          <Link href={"auth/signIn"}>
            {" "}
            <button
              onClick={handleLogin}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-medium shadow-md hover:bg-green-700 transition duration-200"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{userData.name}</h2>
              <p className="text-gray-500">{userData.email}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Profile Details */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700">
            Personal Information
          </h3>

          <div className="mt-4 space-y-4">
            {/* Name */}
            <div className="flex justify-between items-center space-x-4">
              <label className="text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md text-gray-700 w-full"
                disabled={!isEditing}
              />
            </div>

            {/* Email */}
            <div className="flex justify-between items-center space-x-4">
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md text-gray-700 w-full"
                disabled={!isEditing}
              />
            </div>

            {/* Phone */}
            {/* <div className="flex justify-between items-center space-x-4">
              <label className="text-gray-600">Phone</label>
              <input
                type="text"
                name="phone"
                value={editedData.phone}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md text-gray-700 w-full"
                disabled={!isEditing}
              />
            </div> */}

            {/* Bio */}
            {/* <div className="flex justify-between items-center space-x-4">
              <label className="text-gray-600">Bio</label>
              <textarea
                name="bio"
                value={editedData.bio}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md text-gray-700 w-full"
                disabled={!isEditing}
              />
             </div>*/}
           </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6 items-center space-x-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
            {isEditing && (
              <button
                onClick={() => setEditedData(userData)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
