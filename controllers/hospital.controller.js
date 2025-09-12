import { validationResult } from "express-validator";
import hospitalModel from "../models/hospital.model.js";
import blackListTokenModel from "../models/blackListToken.model.js";
import hospitalServices from "../services/hospital.service.js";


export const registerHospital = async (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
    }
    const { name, email, password, address, phoneNumber, beds, reviews, ratings, description, website, imageUrl, doctors, specialities, establishedAt, servicesOffered, emergencyServices, ambulanceAvailable, pharmacyAvailable, labServicesAvailable, paymentMethods } = req.body;

    const existingHospital = await hospitalModel.findOne({ email });
    if (existingHospital) {
        return res.status(409).json({ message: "Hospital with this email already exists" });
    }

    const hashedPassword = await hospitalModel.hashPassword(password);

    const createdHospital = await hospitalServices.createHospital({
        name,
        email,
        password: hashedPassword,
        address,
        phoneNumber,
        beds,
        reviews,
        ratings,
        description,
        website,
        imageUrl,
        doctors,
        specialities,
        establishedAt,
        servicesOffered,
        emergencyServices,
        ambulanceAvailable,
        pharmacyAvailable,
        labServicesAvailable,
        paymentMethods
    });
    const token = createdHospital.generateAuthToken();
    res.cookie("token", token);
    res.status(201).json({ token, createdHospital });
};

export const loginHospital = async (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
    }
    const { email, password } = req.body;

    const hospital = await hospitalModel.findOne({ email }).select("+password");
    if (!hospital) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await hospital.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = hospital.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ token, hospital });
};
export const getHospitalProfile = async (req, res, next) => {
    res.status(200).json({ hospital: req.hospital });
}

export const logoutHospital = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    const blackListToken = new blackListTokenModel({ token });
    await blackListToken.save();
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};

export default {
    registerHospital,
    loginHospital,
    getHospitalProfile,
    logoutHospital
};