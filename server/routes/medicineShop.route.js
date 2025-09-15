import express from 'express';
import { body } from 'express-validator';
import medicineShopController from '../controllers/medicineShop.controller.js';
import { authMedicalShop } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('ownerName').isLength({ min: 3 }).withMessage('Owner name is required'),
    body('name').isLength({ min: 3 }).withMessage('Name must be atleast 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 characters long'),
    body('address.location').isString().withMessage('Address is required'),
    body('address.city').isString().withMessage('city is required'),
    body('address.state').isString().withMessage('state is required'),
    body('address.zipCode').isString().withMessage('zipcode is required'),
    body('address.country').isString().withMessage('country is required'),
    body('contactNumber').isLength({ min: 10, max: 10 }).withMessage('Invalid Contact Number'),
    body('openingHours.open').isString().withMessage('Opening hour is required'),
    body('openingHours.close').isString().withMessage('Closing hour is required'),  
], medicineShopController.registerMedicineShop);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 characters long')
], medicineShopController.loginMedicineShop);

router.get('/profile', authMedicalShop, medicineShopController.getMedicineShopProfile);

router.get('/logout', authMedicalShop, medicineShopController.logoutMedicineShop);

router.post('/addMedicine', authMedicalShop, [
    body('name').isLength({ min: 1 }).withMessage('Medicine name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('stock').isInt({ min: 1 }).withMessage('Stock must be a positive integer'),
    body('expiryDate').isISO8601().toDate().withMessage('Invalid expiry date'),
], medicineShopController.addMedicine);


export default router;
