import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();


const DB_URI = process.env.MONGO_URI

console.log(DB_URI)

export const DbConnection = () => {
    try {
        mongoose.connect(DB_URI)
            .then(() => console.log('MongoDB connected successfully'))
            .catch(err => console.log('MongoDB connection failed', err));
    } catch (error) {
        console.log("Error while connecting to MongoDB:", error);
    }
}