// src/interface/todo.type.ts

// For creating a new todo (before it's saved in DB)
export type NewTodo = {
  title: string;
  description?: string;
  status: "pending" | "completed";
  dueDate?: string;
};

// For fetched or saved todos (after DB assigns _id and possibly id)
export type Todo = NewTodo & {
  _id: string;
  id?: number | undefined ;
};
