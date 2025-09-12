import express from "express";
const router = express.Router();
import { body } from "express-validator";
import userController from '../controllers/user.controller.js';
import { authUser } from "../middlewares/auth.middleware.js";


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First Name must be atleast 3 characters long'),
    body('password').isLength({min : 6}).withMessage('Password must be 6 characters long')
    ] , userController.registerUser)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 characters long')
], userController.loginUser);

router.get('/profile', authUser , userController.getUserProfile);;

router.get('/logout', authUser, userController.logoutUser);


export default router;