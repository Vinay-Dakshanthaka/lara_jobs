const express = require('express')
const authRoutes = express.Router();

const authController = require('../controllers/authentication/authenticationController');

authRoutes.post('/verify-email-otp', authController.verifyEmailOTP);

authRoutes.post('/verify-phone-otp', authController.verifyPhoneOTP);

module.exports = authRoutes