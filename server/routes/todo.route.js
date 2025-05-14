import express from "express"
import { getAllTodos, updateTodo, deleteTodo, createTodo } from "../controller/todo.controller.js";

const router = express.Router()

router.post("/create", createTodo);
router.get("/", getAllTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router