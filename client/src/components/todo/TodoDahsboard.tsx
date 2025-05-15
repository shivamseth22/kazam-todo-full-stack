"use client";

import React, { useState } from "react";
import AddTodomodel from "../todo/AddTodoModal";
import TodoCard from "../todo/TodoCard";
import { ClipboardList } from "lucide-react";
import { Todo } from "@/interface/todo.type";

const TodoDashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [draggedTodo, setDraggedTodo] = useState<Todo | null>(null);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleDelete = (_id: string) => {
    setTodos((prev) => prev.filter((t) => t._id !== _id));
  };

  const handleToggleStatus = (_id: string, status: "pending" | "completed") => {
    setTodos((prev) =>
      prev.map((t) => (t._id === _id ? { ...t, status } : t))
    );
  };

  const handleDragStart = (todo: Todo) => {
    setDraggedTodo(todo);
  };

  const handleDrop = (targetId: string) => {
    if (draggedTodo) {
      const newTodos = [...todos];
      const draggedIndex = newTodos.findIndex((t) => t._id === draggedTodo._id);
      const targetIndex = newTodos.findIndex((t) => t._id === targetId);

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const temp = newTodos[draggedIndex];
        newTodos[draggedIndex] = newTodos[targetIndex];
        newTodos[targetIndex] = temp;

        setTodos(newTodos);
      }
      setDraggedTodo(null);
    }
  };

  const filteredTodos = todos.filter((todo) =>
    filter === "all" ? true : todo.status === filter
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">Todo List</h1>
          <AddTodomodel onAdd={handleAddTodo} />
        </div>

        {/* Filter Section */}
        <div className="flex space-x-4 my-4">
          {["all", "pending", "completed"].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 ${
                filter === type ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setFilter(type as typeof filter)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo Cards */}
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
                  toggleStatus={(id, status) =>
                    handleToggleStatus(id.toString(), status as "pending" | "completed")
                  }
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col my-40 items-center justify-center py-16 text-gray-500">
              <ClipboardList className="w-12 h-12 mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold">You are all caught up!</h3>
              <p className="text-sm mt-1">
                No todos yet. Click <strong>Add Todo</strong> to create one.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TodoDashboard;
