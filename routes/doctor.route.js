import express from 'express';
const router = express.Router();
import { body } from 'express-validator';

import doctorController from '../controllers/doctor.controller.js';
import connectionController from '../controllers/connection.controller.js';

import { authDoctor } from '../middlewares/auth.middleware.js';

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('name').isLength({ min: 3 }).withMessage('Name must be atleast 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 characters long'),
    body('specialization').isArray({ min: 1 }).withMessage('Atleast one specialization is required'),
    body('phone').isLength({ min: 10, max: 10 }).withMessage('Invalid Phone Number'),
    body('feesPerConsultation').isFloat({ min: 0 }).withMessage('Fees per consultation must be a positive number'),
], doctorController.registerDoctor);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 characters long')
], doctorController.loginDoctor);

router.get('/profile', authDoctor, doctorController.getDoctorProfile);

router.get('/logout', authDoctor, doctorController.logoutDoctor);

router.get('/request/pending/:doctorId' , authDoctor, connectionController.getPendingRequests);

router.patch('/request/respond/:reqId' , authDoctor, connectionController.respondToRequest);

export default router;      