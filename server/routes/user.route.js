import express from 'express';
import { body } from 'express-validator';
import {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
} from '../controller/user.controller.js';

import { authUser } from '../middleware/auth.middleware.js';

const userRouter = express.Router();


// route to register a user
userRouter
    .post('/register', [
        body('email').isEmail().withMessage("Invalid email"),
        body('password').isLength({ min: 6 }).withMessage("password must be atleast 6 character long")
    ], registerUser)


// route to login a user
userRouter
    .post('/login', [
        body('email').isEmail().withMessage("Invalid email"),
        body('password').isLength({ min: 6 }).withMessage("password must be atleast 6 character long")
    ], loginUser) // login user



//route to open profile route
userRouter
    .get('/profile', authUser, getUserProfile)


//route to logout a user
userRouter
    .get('/logout', authUser, logoutUser)



export default userRouter
