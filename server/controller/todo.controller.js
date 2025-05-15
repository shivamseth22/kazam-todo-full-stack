import Todo from "../model/todo.model.js";
export const createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // console.log(req.user)

    // Create a new Todo instance
    const todo = new Todo({
      title,
      description,
      status,
      user: req.user._id,
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
   const todos = await Todo.find({ user: req.user._id });
    res.status(200).json({ message: "Fetched todos", todos });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error: error.message });
  }
};


// controller/todo.controller.js

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const todo = await Todo.findOne({ _id: id, user: req.user._id }); // Only update your own todo

    if (!todo) {
      return res.status(404).json({ message: "Todo not found or not authorized" });
    }

    // Update fields
    if (title) todo.title = title;
    if (description) todo.description = description;
    if (status) todo.status = status;

    const updatedTodo = await todo.save();

    res.status(200).json({ message: "Todo updated", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error: error.message });
  }
};



// controller/todo.controller.js

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Todo.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found or not authorized" });
    }

    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error: error.message });
  }
};


