import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "In Progress", "completed"],
        default: "pending",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
    },

}, { timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
