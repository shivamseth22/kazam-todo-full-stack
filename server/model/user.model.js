import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwt_secret = process.env.JWT_SECRET || "this is a secret";

// Schema of the user
const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false // so that password won't be included in find queries by default
  },
});

// Instance method: Generate auth token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, jwt_secret, { expiresIn: '24h' });
  return token;
};

// Instance method: Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static method: Hash password
userSchema.statics.hashedPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('userModel', userSchema);

export default userModel;
