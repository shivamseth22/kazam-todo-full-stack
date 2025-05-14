import mongoose from "mongoose";

const blackListedSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24 hours in seconds
  }
});

const BlackListedToken = mongoose.model("blackListedModel", blackListedSchema);

export default BlackListedToken;