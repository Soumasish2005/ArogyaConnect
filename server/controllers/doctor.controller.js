import doctorModel from '../models/doctor.model.js';
import doctorServices from '../services/doctor.service.js';
import { validationResult } from 'express-validator';
import blackListTokenModel from '../models/blackListToken.model.js';

const registerDoctor = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }
    const { name, email, password, specialization, hospitals, feesPerConsultation, phone, experience, rating, reviews, appointments } = req.body;
    const alreadyExists = await doctorModel.findOne({ email });
    if (alreadyExists) {
        return res.status(400).json({ message: "Doctor already exists" });
    }
    const hashedPassword = await doctorModel.hashPassword(password);

    const createdDoctor = await doctorServices.createDoctor({
        name,
        email,
        password: hashedPassword,
        specialization,
        hospitals,
        feesPerConsultation,
        phone,
        experience,
        rating,
        reviews,
        appointments
    });
    const token = createdDoctor.generateAuthToken();
    res.cookie("token", token);
    res.status(201).json({ token, createdDoctor });
};

const loginDoctor = async (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
    }
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email }).select("+password");
    if (!doctor) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await doctor.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = doctor.generateAuthToken();

    res.cookie("token", token);

    res.status(201).json({ token, doctor });

}

const getDoctorProfile = async (req, res, next) => {
    res.status(200).json({ doctor: req.doctor });
}

const logoutDoctor = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    await blackListTokenModel.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}

export default {
    registerDoctor,
    loginDoctor,
    getDoctorProfile,
    logoutDoctor
}