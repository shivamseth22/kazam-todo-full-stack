import jwt from 'jsonwebtoken';
import userModel from '../model/user.model.js';
import blackListedTokenModel from '../model/blackListedToken.model.js';

export const authUser = async (req, res, next) => {
  console.log("Inside the auth middleware");

  const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  console.log("Auth token:", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const blackListedToken = await blackListedTokenModel.findOne({ token });
    console.log("Blacklisted token:", blackListedToken);

    if (blackListedToken) {
      return res.status(401).json({ message: "Unauthorized: Token is blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);

    const user = await userModel.findById(decoded._id);
    console.log("User:", user);

    req.user = user;
    return next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

