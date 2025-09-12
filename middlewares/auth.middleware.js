import userModel  from "../models/user.models.js";
import doctorModel  from "../models/doctor.model.js";
import jwt from "jsonwebtoken";
import blackListTokenModel  from "../models/blackListToken.model.js";
import medicineShopModel from "../models/medicineShop.model.js";


export const authUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlackedListed = await blackListTokenModel.findOne({ token });
    if (isBlackedListed) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ _id: decode._id });
        if (user.email) {
            req.user = user;
            return next();
        }
        return res.status(401).json({ message: "Unauthorized" });
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export const authDoctor = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlackedListed = await blackListTokenModel.findOne({ token });
    if (isBlackedListed) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const doctor = await doctorModel.findOne({ _id: decode._id });
        if (doctor.email) {
            req.doctor = doctor;
            return next();
        }
        return res.status(401).json({ message: "Unauthorized" });
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export const authMedicalShop = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlackedListed = await blackListTokenModel.findOne({ token });
    if (isBlackedListed) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const medicineShop = await medicineShopModel.findOne({ _id: decode._id });
        if (medicineShop.email) {
            req.medicineShop = medicineShop;
            req.token = token;
            return next();
        }
        return res.status(401).json({ message: "Unauthorized" });
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
