import express from "express"
import { getAllTodos, updateTodo, deleteTodo, createTodo } from "../controller/todo.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/create",authUser, createTodo);
router.get("/all",authUser, getAllTodos);
router.put("/:id",authUser, updateTodo);
router.delete("/:id",authUser, deleteTodo);

export default router