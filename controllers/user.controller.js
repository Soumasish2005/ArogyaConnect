import userModel  from "../models/user.models.js";
import userServices from "../services/user.service.js";
import { validationResult } from "express-validator";
import blackListTokenModel  from "../models/blackListToken.model.js";


const registerUser = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }
    const { fullName, email, password } = req.body;
    const alreadyExists = await userModel.findOne({ email });
    if (alreadyExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await userModel.hashPassword(password);

    const createdUser = await userServices.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
    });
    const token = createdUser.generateAuthToken();
    res.cookie("token", token);
    res.status(201).json({ token, createdUser });
};

const loginUser = async (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token);

    res.status(201).json({ token, user });

}

const getUserProfile = async (req, res, next) => {
    res.status(200).json({ user: req.user });
}

const logoutUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    res.clearCookie("token");
    const tokenBlacklisted = await blackListTokenModel.create({ token });

    res.status(200).json({ message: "Logged out successfully" });
}

export default {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
};