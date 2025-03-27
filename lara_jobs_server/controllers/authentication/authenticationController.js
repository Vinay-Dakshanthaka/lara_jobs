const handleError = require('../../errors/errorHandler');
const authService = require('../../services/authentication/authService');
const candidateService = require('../../services/candidate/candidateService');

const verifyEmailOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        await authService.verifyEmailOTP(email, otp);
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        handleError(res, error)
    }
};

const verifyPhoneOTP = async (req, res) => {
    try {
        const { candidateId, otp } = req.body;
        await authService.verifyPhoneOTP(candidateId, otp);
        res.status(200).json({ message: 'Phone number verified successfully' });
    } catch (error) {
        handleError(res, error)
    }
};

const resendOtpHandler = async (req, res) => {
    try {
        const { email } = req.body;

        const result = await candidateService.resendOtp(email);
        return res.status(200).json(result);
    } catch (error) {
        console.log("Error while resending OTP:", error);
        return handleError(res, error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(`Email : ${email}, : password : ${password}`)

       const {unique_id, token, role} = await authService.loginCandidate(email, password);
        return res.status(200).json({
            message : 'Login Success', 
            unique_id,
            token,
            role
        });
    } catch (error) {
        console.log("Error while resending OTP:", error);
        return handleError(res, error);
    }
};

module.exports = {
    verifyEmailOTP,
    verifyPhoneOTP,
    resendOtpHandler,
    login,
}