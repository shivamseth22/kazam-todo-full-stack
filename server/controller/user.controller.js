import userModel from '../model/user.model.js';
import { validationResult } from 'express-validator';
import { createUser } from '../service/user.service.js';
import blackListedTokenModel from '../model/blackListedToken.model.js';



// Route to register a user
export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email,
      password
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Some field is missing required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await userModel.hashedPassword(password);
    const createdUser = await createUser({
      email,
      password: hashedPassword
    });

    res.status(200).json({
      data: createdUser,
      message: "The user is signed up successfully"
    });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// User login route
export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password not matched" });
    }

    const token = await user.generateAuthToken();
    res.cookie("token", token);

    res.status(200).json({
      data: user,
      token,
      message: "The user is logged in successfully"
    });
  } catch (error) {
    console.log("Error in logging in user:", error);
    res.status(401).json({ error });
  }
};

// Authenticated user profile route
export const getUserProfile = async (req, res) => {
  res.status(200).json({
    message: "This is the user profile",
    data: req.user
  });
};

// Logout route
export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (token) {
    await blackListedTokenModel.create({ token });
  }

  res.status(200).json({ message: "User logged out successfully" });
};
