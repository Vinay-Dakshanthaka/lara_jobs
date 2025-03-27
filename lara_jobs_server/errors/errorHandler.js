const errorCodes = {
    'EMAIL_ALREADY_EXISTS': { status: 409, message: 'A candidate with this email already exists.' },
    'DUPLICATE_PHONE_NUMBER': { status: 409, message: 'Phone nubmber is alredy registered' },
    'EMAIL_SENDING_FAILED': { status: 500, message: 'We were unable to send an OTP email. Please try again later.' },
    'DATABASE_ERROR': { status: 500, message: 'Database error occurred.' },
    'NOT_FOUND': { status: 404, message: 'Candidate not found.' },
    'INTERNAL_SERVER_ERROR': { status: 500, message: 'An unexpected error occurred. Please try again later.' },
    'USER_NOT_AUTHORIZED': { status: 403, message: 'User is not authorized to perform this action.' },
    'OTP_EXPIRED': { status: 408, message: 'The OTP has expired. Please request a new one.' },
    'INVALID_OTP': { status: 400, message: 'The OTP you entered is invalid. Please try again.' },
    'EMAIL_NOT_VERIFIED': { status: 400, message: 'Email exists, but OTP verification is pending.' },
    'INVALID_CREDENTIALS': { status: 401, message: 'Invalid Credentials.' },
};

const handleError = (res, error) => {
    const errorDetails = errorCodes[error.code] || errorCodes['INTERNAL_SERVER_ERROR']; // Default to internal server error
    return res.status(errorDetails.status).json({
        message: errorDetails.message,
        code: error.code,
    });
};

module.exports = handleError;