"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";


interface User {
  name: string;
  email: string;
 }


const Profile = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User | null >(null);

  useEffect(() => {
    fetch("http://localhost:3001/users/profile", {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          router.push("/");
          return;
        }
        const data = await res.json();
        setUserData(data.data);
        setLoading(false);
      })
      .catch(() => {
        router.push("/");
      });
  }, [router]);



  const handleLogout = () => {
    fetch("http://localhost:3001/users/logout", {
      method: "POST",
      credentials: "include",
    }).finally(() => {

      router.push("/");
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <svg
          className="animate-spin h-10 w-10 text-green-600 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <p className="text-gray-600 text-lg font-medium">Loading profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-4">

        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          {/* Profile Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">{userData?.name}</h2>
                <p className="text-gray-500">{userData?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* Profile Details */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
            <div className="mt-4 space-y-4">
              <div className="flex flex-col space-y-1">
                <label className="text-gray-600">Name</label>
                <input
                readOnly
                  type="text"
                  name="name"
                  value={userData?.email.split("@")[0]}
                  className="px-3 py-2 border rounded-md text-gray-700"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-gray-600">Email</label>
                <input
                readOnly
                  type="email"
                  name="email"
                  value={userData?.email}
                  className="px-3 py-2 border rounded-md text-gray-700"

                />
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
