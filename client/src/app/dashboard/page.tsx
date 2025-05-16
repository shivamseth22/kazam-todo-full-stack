"use client";

import React, { useState } from "react";
import AddTodomodel from "@/components/todo/AddTodoModal";
import TodoCard from "@/components/todo/TodoCard";
import { ClipboardList } from "lucide-react";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
  useGetAllTodos,
} from "@/api-handling/todo/todos_api";
import { Todo } from "@/interface/todo.type";

const TodoDashboard = () => {
  const [filter, setFilter] = useState("all");
  const [draggedTodo, setDraggedTodo] = useState<Todo | null>(null);

  const { data: fetchedTodos = [], isLoading } = useGetAllTodos();
  const [todos, setTodos] = useState<Todo[]>([]);

  // Sync local state when fetchedTodos changes
  React.useEffect(() => {
    setTodos(fetchedTodos);
  }, [fetchedTodos]);
  const createMutation = useCreateTodo();
  const deleteMutation = useDeleteTodo();
  const updateMutation = useUpdateTodo();

  const handleAddTodo = (newTodo: Todo) => {
    createMutation.mutate(newTodo);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const toggleStatus = (id: string, status: string) => {
    const newStatus = status === "completed" ? "pending" : "completed";
    updateMutation.mutate({ id, updateData: { status: newStatus } });
  };

const handleDragStart = (e: React.DragEvent<HTMLDivElement>, todo: Todo) => {
  e.dataTransfer.setData("text/plain", todo._id);
  setDraggedTodo(todo);
};

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    if (!draggedId) return;

    const draggedIndex = todos.findIndex((t) => t._id === draggedId);
    const targetIndex = todos.findIndex((t) => t._id === targetId);
    if (draggedIndex === -1 || targetIndex === -1) return;

    const newTodos = [...todos];
    [newTodos[draggedIndex], newTodos[targetIndex]] = [
      newTodos[targetIndex],
      newTodos[draggedIndex],
    ];

    setTodos(newTodos);
    setDraggedTodo(null);
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
          {["all", "pending", "completed"].map((f) => (
            <button
              key={f}
              className={`px-4 py-2 ${
                filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo Cards */}
        <div className="space-y-4">
          {isLoading ? (
            <div>Loading todos...</div>
          ) : filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <div
                key={todo._id}
                className="p-4 shadow-md bg-white rounded-md"
                draggable
                onDragStart={(e) => handleDragStart(e, todo)}

                onDrop={(e) => handleDrop(e, todo._id)} // Pass event and id here
                onDragOver={(e) => e.preventDefault()}
              >
                <TodoCard
                  todo={{
                    ...todo,
                    id: Number(todo._id),
                  }}
                  onDelete={() => handleDelete(todo._id)}
                  toggleStatus={() => toggleStatus(todo._id, todo.status)}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col my-40 items-center justify-center py-16 text-gray-500">
              <ClipboardList className="w-12 h-12 mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold">
                You&apos;re all caught up!
              </h3>
              <p className="text-sm mt-1">
                No todos yet. Click &quot;Add Todo&quot; to create one.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TodoDashboard;
