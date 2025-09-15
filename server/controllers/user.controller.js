import userModel  from "../models/user.models.js";
import userServices from "../services/user.service.js";
import { validationResult } from "express-validator";
import blackListTokenModel  from "../models/blackListToken.model.js";
import DoctorModel from "../models/doctor.model.js";
import HospitalModel from "../models/hospital.model.js";
import medicineShopModel from "../models/medicineShop.model.js";

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

const getDoctors = async (req, res, next) => {
    try {
        const doctors = await DoctorModel.find();
        if (!doctors || doctors.length === 0) {
            return res.status(200).json({ message: "No doctors found.", doctors: [] });
        }
        res.status(200).json({ doctors });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getHospitals = async (req, res, next) => {
    try {
        const hospitals = await HospitalModel.find();
        if (!hospitals || hospitals.length === 0) {
            return res.status(200).json({ message: "No hospitals found.", hospitals: [] });
        }
        res.status(200).json({ hospitals });
    } catch (error) {
        console.error("Error fetching hospitals:", error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getDoctorByCategory = async (req, res, next) => {
    const { category } = req.params;
    try {
        const doctors = await DoctorModel.find();
        const filteredDoctors = doctors.filter(doctor => doctor.specialization.indexOf(category) !== -1);
        if (!filteredDoctors || filteredDoctors.length === 0) {
            return res.status(200).json({ message: `No doctors found in the category: ${category}.`, doctors: [] });
        }
        res.status(200).json({ doctors: filteredDoctors });
    } catch (error) {
        console.error(`Error fetching doctors in category ${category}:`, error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getMedicineByName = async (req, res, next) => {
    const { name } = req.params;
    try {

        const allMedicineShops = await medicineShopModel.find();
        const medicineShopsWithMedicine = allMedicineShops.filter(shop =>
            shop.medicinesAvailable.some((medicine => medicine.name.toLowerCase() === name.toLowerCase()) && medicine.stock > 0)
        );

        if (medicineShopsWithMedicine.length === 0) {
            return res.status(200).json({ message: `No shops found with the medicine: ${name}.`, shops: [] });
        }

        res.status(200).json({ shops: medicineShopsWithMedicine });
    } catch (error) {
        console.error(`Error fetching medicine by name ${name}:`, error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
    getDoctors,
    getHospitals,
    getDoctorByCategory,
    getMedicineByName,
};