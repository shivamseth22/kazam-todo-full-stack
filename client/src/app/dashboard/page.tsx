"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/landing/Sidebar";
import AddTodomodel from "@/components/landing/AddTodoModal";
import TodoCard from "@/components/landing/TodoCard";
import { ClipboardList } from "lucide-react";

const TodoDashboard = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [filter, setFilter] = useState("all"); // "all", "pending", "completed"
  const [draggedTodo, setDraggedTodo] = useState<any | null>(null);

  // // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:3001/todo/all", {
        method: "GET",
        credentials: "include", // send cookies
      });
      const data = await res.json();
      if (res.ok) {
        setTodos(data.todos);
      } else {
        console.error("Failed to fetch todos:", data.message);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Create todo API
  const createTodo = async (newTodoData: any) => {
    try {
      const res = await fetch("http://localhost:3001/todo/create", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodoData),
      });
      const data = await res.json();
      if (res.ok) {
        setTodos((prev) => [...prev, data.todo]);
      } else {
        alert(data.message || "Failed to create todo");
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // Update todo API (status, completed)
  const updateTodo = async (id: string, updateData: any) => {
    try {
      const res = await fetch(`http://localhost:3001/todo/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("updated");
        setTodos((prev) => prev.map((t) => (t._id === id ? data.todo : t)));
      } else {
        alert(data.message || "Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete todo API
  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3001/todo/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setTodos((prev) => prev.filter((t) => t._id !== id));
      } else {
        alert(data.message || "Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Handler wrappers to integrate with your UI components
  const handleAddTodo = (newTodo: any) => createTodo(newTodo);

  const handleDelete = (id: string) => deleteTodo(id);

  const toggleStatus = (id: string, status: string) => {
    const newStatus = status === "completed" ? "pending" : "completed";
    updateTodo(id, { status: newStatus });
  };

  // Drag & drop handlers (optional: update order in backend if needed)
  const handleDragStart = (todo: any) => {
    setDraggedTodo(todo);
  };

  const handleDrop = (targetId: string) => {
    if (draggedTodo) {
      const newTodos = [...todos];
      const draggedIndex = newTodos.findIndex((t) => t._id === draggedTodo._id);
      const targetIndex = newTodos.findIndex((t) => t._id === targetId);

      // Swap the dragged item with the target item
      [newTodos[draggedIndex], newTodos[targetIndex]] = [
        newTodos[targetIndex],
        newTodos[draggedIndex],
      ];

      setTodos(newTodos);
      setDraggedTodo(null);
      // Optionally, send new order to backend here
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    return todo.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">Todo List</h1>
          <AddTodomodel onAdd={handleAddTodo} />
        </div>

        {/* Filter Section */}
        <div className="flex space-x-4 my-4">
          <button
            className={`px-4 py-2 ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 ${
              filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 ${
              filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {/* Todo Cards with Drag-and-Drop */}
        <div className="space-y-4">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <div
                key={todo._id}
                className="p-4 shadow-md bg-white rounded-md"
                draggable
                onDragStart={() => handleDragStart(todo)}
                onDrop={() => handleDrop(todo._id)}
                onDragOver={(e) => e.preventDefault()}
              >
                <TodoCard
                  todo={todo}
                  onDelete={() => handleDelete(todo._id)}
                   toggleStatus={() => toggleStatus(todo._id, todo.status)}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col my-40 items-center justify-center py-16 text-gray-500">
              <ClipboardList className="w-12 h-12 mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold">You're all caught up!</h3>
              <p className="text-sm mt-1">
                No todos yet. Click "Add Todo" to create one.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TodoDashboard;
