const Candidate = require('../../models/candidate');
const OTPVerification = require('../../models/otpVerfication')

const verifyEmailOTP = async (candidateId, otp) => {
    try {
        const verification = await OTPVerification.findOne({
            where: { candidate_id: candidateId, otp_email: otp },
        });
        if (!verification) {
            throw new Error('Invalid OTP');
        }

        await Candidate.update(
            { email_verified: true },
            { where: { id: candidateId } }
        );
        return true;
    } catch (error) {
        throw new Error('Error verifying email OTP: ' + error.message);
    }
};


const verifyPhoneOTP = async (candidateId, otp) => {
    try {
        const verification = await OTPVerification.findOne({
            where: { candidate_id: candidateId, otp_phone: otp },
        });
        if (!verification) {
            throw new Error('Invalid OTP');
        }

        await Candidate.update(
            { phone_verified: true },
            { where: { id: candidateId } }
        );
        return true;
    } catch (error) {
        throw new Error('Error verifying phone OTP: ' + error.message);
    }
};


module.exports = {
    verifyEmailOTP,
    verifyPhoneOTP,     
}