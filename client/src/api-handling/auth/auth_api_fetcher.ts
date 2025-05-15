
export interface User {
  name: string;
  email: string;
}

// lib/api/auth.ts
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API

export const getProfile = async (): Promise<User> => {
  const res = await fetch(`${BASE_URL}/users/profile`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  const data = await res.json();
  return data.data as User;
};

export const logoutUser = async (): Promise<void> => {
  await fetch(`${BASE_URL}/users/logout`, {
    method: "POST",
    credentials: "include",
  });
};



export const loginUser = async (data: LoginPayload) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message || "Login failed");
  return result;
};

export const registerUser = async (data: RegisterPayload) => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message || "Registration failed");
  return result;
};