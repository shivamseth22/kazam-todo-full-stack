// components/AddTodomodel.tsx
"use client";



import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { Todo } from "@/interface/todo.type";




const AddTodomodel = ({ onAdd }: { onAdd: (todo: Todo) => void }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<{
    title: string;
    description: string;
    dueDate: string;
  }>({ title: "", description: "", dueDate: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement  | HTMLTextAreaElement >) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



const handleAdd = () => {
  if (!form.title.trim()) return;

  const newTodo: Todo = {
    ...form,
    id: Date.now(),
    status: "pending",
    _id: ""
  };

  onAdd(newTodo);
  setForm({ title: "", description: "", dueDate: "" });
  setOpen(false);
};


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white">+ Add Todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add a New Todo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input name="title" value={form.title} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Input
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
            />
          </div>
          <Button className="w-full bg-blue-600 text-white" onClick={handleAdd}>
            Save Todo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodomodel;
