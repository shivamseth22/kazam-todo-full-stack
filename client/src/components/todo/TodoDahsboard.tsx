"use client";

import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import AddTodomodel from "../todo/AddTodoModal";
import TodoCard from "../todo/TodoCard";
import { ClipboardList } from "lucide-react";

const TodoDashboard = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [filter, setFilter] = useState("all"); // "all", "pending", "completed"
  const [draggedTodo, setDraggedTodo] = useState<any | null>(null);

  const handleAddTodo = (newTodo: any) => setTodos((prev) => [...prev, newTodo]);

  const handleDelete = (id: number) => setTodos((prev) => prev.filter((t) => t.id !== id));

  const handleMarkComplete = (id: number) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "completed" } : t))
    );

  const handleStatusChange = (id: number, status: string) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));

  const handleDragStart = (todo: any) => {
    setDraggedTodo(todo);
  };

  const handleDrop = (targetId: number) => {
    if (draggedTodo) {
      // Rearrange todos by swapping dragged item with the target
      const newTodos = [...todos];
      const draggedIndex = newTodos.findIndex((t) => t.id === draggedTodo.id);
      const targetIndex = newTodos.findIndex((t) => t.id === targetId);

      // Swap the dragged item with the target item
      const temp = newTodos[draggedIndex];
      newTodos[draggedIndex] = newTodos[targetIndex];
      newTodos[targetIndex] = temp;

      setTodos(newTodos);
      setDraggedTodo(null); // Reset dragged item
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    return todo.status === filter;
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
            className={`px-4 py-2 ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 ${filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 ${filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
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
                key={todo.id}
                className="p-4 shadow-md bg-white rounded-md"
                draggable
                onDragStart={() => handleDragStart(todo)}
                onDrop={() => handleDrop(todo.id)}
                onDragOver={(e) => e.preventDefault()}
              >
                <TodoCard
                  todo={todo}
                  onDelete={handleDelete}
                  onComplete={handleMarkComplete}
                  onStatusChange={handleStatusChange}
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
