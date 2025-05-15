// components/TodoCard.tsx
"use client";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { format } from "date-fns";

const TodoCard = ({
  todo,
  onDelete,
  toggleStatus,
}: {
  todo: any;
  onDelete: (id: number) => void;
  toggleStatus: (id: number , status:string) => void;
}) => {
  return (
    <Card
      key={todo.id}
      className={`p-4 flex justify-between items-start shadow-md ${
        todo.status === "completed" ? "bg-green-50 border border-green-200" : "bg-white"
      }`}
    >
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{todo.title}</h2>
        <p className="text-sm text-gray-600">{todo.description}</p>
        <div className="text-xs text-gray-500 mt-2">
          <span>Status: {todo.status}</span> |{" "}
          <span>
            Due: {todo.dueDate ? format(new Date(todo.dueDate), "dd MMM yyyy") : "N/A"}
          </span>
        </div>
        {todo.status === "completed" && (
          <div className="mt-2">
            <label className="text-sm text-gray-600">Change Status:</label>
            <select
              className="ml-2 text-sm border rounded p-1"
              value={todo.status}
              onChange={(e) => toggleStatus(todo.id , e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        )}
      </div>

      <div className="space-x-2">
        {todo.status === "pending" && (
          <Button size="sm" className="bg-green-600 text-white" onClick={() => toggleStatus(todo.id, todo.status)}>
            Mark Completed
          </Button>
        )}
        <Button
          size="sm"
          variant="outline"
          className="text-red-600 border-red-300"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default TodoCard;
