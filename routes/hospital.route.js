import express from 'express';
import { body } from 'express-validator';
const router = express.Router();
import { authHospital } from '../middlewares/auth.middleware.js';
import hospitalController from '../controllers/hospital.controller.js';


router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('address.location').isString().withMessage('Address is required'),
    body('address.city').isString().withMessage('city is required'),
    body('address.state').isString().withMessage('state is required'),
    body('address.zipCode').isString().withMessage('zipcode is required'),
    body('address.country').isString().withMessage('country is required'),
    body('phoneNumber').isLength({ min: 10, max: 10 }).withMessage('Invalid Phone Number'),
    body('beds.availableBeds').notEmpty().withMessage('Available beds is required'),
    body('beds.totalBeds').notEmpty().withMessage('Total beds is required'),
], hospitalController.registerHospital
);
    

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], hospitalController.loginHospital
);



router.get('/profile', authHospital, hospitalController.getHospitalProfile);

router.get('/logout', authHospital, hospitalController.logoutHospital);



export default router;