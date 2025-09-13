import medicineShopModel from "../models/medicineShop.model.js";
import medicineShopServices from "../services/medicineShop.service.js";
import { validationResult } from "express-validator";
import blackListTokenModel from "../models/blackListToken.model.js";

const registerMedicineShop = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }
    const { name, ownerName, email, password, address, contactNumber, medicinesAvailable, licenseNumber, openingHours, websiteUrl, ratings, reviews } = req.body;
    const alreadyExists = await medicineShopModel.findOne({ email });
    if (alreadyExists) {
        return res.status(400).json({ message: "Medicine Shop already exists" });
    }
    const hashedPassword = await medicineShopModel.hashPassword(password);

    const createdMedicineShop = await medicineShopServices.createMedicineShop({
        name,
        email,
        password: hashedPassword,
        address,
        contactNumber,
        medicinesAvailable,
        ownerName,
        licenseNumber,
        openingHours,
        websiteUrl,
        ratings,
        reviews
    });
    const token = createdMedicineShop.generateAuthToken();
    res.cookie("token", token);
    res.status(201).json({ token, createdMedicineShop });
};

const loginMedicineShop = async (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
    }
    const { email, password } = req.body;

    const medicineShop = await medicineShopModel.findOne({ email }).select("+password");
    if (!medicineShop) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await medicineShop.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = medicineShop.generateAuthToken();

    res.cookie("token", token);

    res.status(201).json({ token, medicineShop });

}

const getMedicineShopProfile = async (req, res, next) => {
    res.status(200).json({ medicineShop: req.medicineShop });
}

const logoutMedicineShop = async (req, res, next) => {
    const token = req.token;
    const blackListToken = new blackListTokenModel({ token });
    await blackListToken.save();
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}

const addMedicine = async (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
    }
    const { name, manufacturer, price, stock, expiryDate, imageUrl } = req.body;
    const medicineShop = req.medicineShop;

    medicineShop.medicinesAvailable.push({
        name,
        manufacturer,
        price,
        stock,
        expiryDate,
        imgUrl: imageUrl || ""
    });

    await medicineShop.save();

    res.status(200).json({ message: "Medicine added successfully", medicinesAvailable: medicineShop.medicinesAvailable });
};


export default {
    registerMedicineShop,
    loginMedicineShop,
    getMedicineShopProfile,
    logoutMedicineShop,
    addMedicine,
}