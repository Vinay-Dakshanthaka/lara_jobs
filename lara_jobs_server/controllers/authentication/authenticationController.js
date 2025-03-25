const authService = require('../../services/authentication/authService');


const verifyEmailOTP = async (req, res) => {
    try {
        const { candidateId, otp } = req.body;
        await authService.verifyEmailOTP(candidateId, otp);
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const verifyPhoneOTP = async (req, res) => {
    try {
        const { candidateId, otp } = req.body;
        await authService.verifyPhoneOTP(candidateId, otp);
        res.status(200).json({ message: 'Phone number verified successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    verifyEmailOTP,
    verifyPhoneOTP
}