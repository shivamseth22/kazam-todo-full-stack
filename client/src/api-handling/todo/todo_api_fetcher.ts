// lib/api/todo_api.ts

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  // add other fields if needed
}

interface ApiResponse<T> {
  success: boolean;
  todos?: T[];
  todo?: T;
  message?: string;
}

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${BASE_URL}/todo/all`, {
    method: "GET",
    credentials: "include",
  });
  console.log("res" ,res)
  if (!res.ok) throw new Error("Failed to fetch todos");
  const data: ApiResponse<Todo> = await res.json();
  return data.todos ?? [];
};

export const createTodo = async (todoData: Partial<Todo>): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/todo/create`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoData),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  const data: ApiResponse<Todo> = await res.json();
  if (!data.todo) throw new Error("No todo returned");
  return data.todo;
};

export const updateTodo = async (
  id: string,
  updateData: Partial<Todo>
): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/todo/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  const data: ApiResponse<Todo> = await res.json();
  if (!data.todo) throw new Error("No todo returned");
  return data.todo;
};

export const deleteTodo = async (id: string): Promise<{ success: boolean }> => {
  const res = await fetch(`${BASE_URL}/todo/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  const data: { success: boolean } = await res.json();
  return data;
};
