import Todo from "../model/todo.model.js";
export const createTodo = async (req, res) => {
  try {
    const { title, description, completed, status } = req.body;

    // Create a new Todo instance
    const todo = new Todo({
      title,
      description,
      completed,
      status,
    });

    // Save the new Todo to the database
    const newTodo = await todo.save();

    res.status(201).json({
      message: "Todo created successfully",
      todo: newTodo,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error occurred while creating todo",
      error: error.message,
    });
  }
};

// Get all todos
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ message: "Fetched todos", todos });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error: error.message });
  }
};


// controller/todo.controller.js

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error: error.message });
  }
};


// controller/todo.controller.js

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted", todo: deletedTodo });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error: error.message });
  }
};

