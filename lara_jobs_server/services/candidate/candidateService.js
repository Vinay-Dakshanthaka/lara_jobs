const CustomError = require('../../errors/CustomErrors');
const { EMAIL_ALREADY_EXISTS } = require('../../errors/errorCodes');
const Candidate = require('../../models/candidate');
const OTPVerification = require('../../models/otpVerfication')
const { sendEmailOTP } = require('../../utils/email/emailUtils');

// Create a new candidate
// const createCandidate = async (candidateData) => {
//     try {
//         const candidate = await Candidate.create(candidateData);
//         return candidate;
//     } catch (error) {
//         throw new Error('Error creating candidate: ' + error.message);
//     }
// };


const createCandidate = async (email) => {
    try {
        // Check if candidate already exists with the given email
        const existingCandidate = await Candidate.findOne({ where: { email } });
        if (existingCandidate) {
            throw new CustomError('A candidate with this email already exists.', 'EMAIL_ALREADY_EXISTS');
        }

        // Create new candidate
        const candidate = await Candidate.create({ email });

        // Generate and send email OTP
        const otp = await sendEmailOTP(candidate.email); 
        await OTPVerification.create({
            candidate_id: candidate.id,
            otp_email: otp,
            otp_email_sent_at: new Date(),
        });

        return candidate;
    } catch (error) {
        console.log("Error in createCandidate service method: ", error);

        // Handle known errors (e.g., email already exists)
        if (error.code === 'EMAIL_ALREADY_EXISTS') {
            throw new CustomError(error.message, error.code);
        }

        // Handle email sending failure
        if (error.code === 'EMAIL_SENDING_FAILED') {
            throw new CustomError('We were unable to send an OTP email. Please try again later.', 'EMAIL_SENDING_FAILED');
        }

        // For other unexpected errors, log and throw a generic error
        throw new CustomError('Error creating candidate: ' + error.message, 'INTERNAL_SERVER_ERROR');
    }
};

const updatePhoneNumber = async (candidateId, phoneNumber) => {
    try {
        const candidate = await Candidate.findByPk(candidateId);
        if (!candidate) {
            throw new Error('Candidate not found');
        }

        await Candidate.update(
            { phone_number: phoneNumber },
            { where: { id: candidateId } }
        );

        // Send phone OTP
        const otp = await sendPhoneOTP(phoneNumber); // Implement OTP generation and sending.
        await OTPVerification.create({
            candidate_id: candidateId,
            otp_phone: otp,
            otp_phone_sent_at: new Date(),
        });

        return candidate;
    } catch (error) {
        throw new Error('Error updating phone number: ' + error.message);
    }
};


const storePinCode = async (candidateId, pinCode) => {
    try {
        await Candidate.update(
            { pin_code: pinCode },
            { where: { id: candidateId } }
        );
        return true;
    } catch (error) {
        throw new Error('Error storing pin code: ' + error.message);
    }
};


// Get a candidate by ID
const getCandidateById = async (id) => {
    try {
        const candidate = await Candidate.findByPk(id);
        if (!candidate) {
            throw new Error('Candidate not found');
        }
        return candidate;
    } catch (error) {
        throw new Error('Error fetching candidate: ' + error.message);
    }
};

// Get all candidates
const getAllCandidates = async (page = 1, pageSize = 10) => {
    try {
        const { count, rows } = await Candidate.findAndCountAll({
            offset: (page - 1) * pageSize,
            limit: pageSize,
        });

        return {
            total: count,
            candidates: rows,
        };
    } catch (error) {
        throw new Error('Error fetching candidates: ' + error.message);
    }
};

//search candidates by search query 
const searchCandidates = async (searchQuery, page = 1, pageSize = 10) => {
    try {
      const { name, email, phone_number } = searchQuery;
  
      // Build the search filter object
      const whereConditions = {};
  
      if (name) {
        whereConditions.name = { [Op.like]: `%${name}%` }; // Search by name
      }
  
      if (email) {
        whereConditions.email = { [Op.like]: `%${email}%` }; // Search by email
      }
  
      if (phone_number) {
        whereConditions.phone_number = { [Op.like]: `%${phone_number}%` }; // Search by phone number
      }
  
      // Use Sequelize to find candidates with the search query and pagination
      const candidates = await Candidate.findAll({
        where: whereConditions,
        offset: (page - 1) * pageSize, // Calculate offset for pagination
        limit: pageSize, // Limit results per page
      });
  
      // Return the results
      return candidates;
    } catch (error) {
      throw new Error('Error searching candidates: ' + error.message);
    }
  };
  

// Update a candidate by ID
const updateCandidate = async (id, updateData) => {
    try {
        const candidate = await Candidate.findByPk(id);
        if (!candidate) {
            throw new Error('Candidate not found');
        }
        await candidate.update(updateData);
        return candidate;
    } catch (error) {
        throw new Error('Error updating candidate: ' + error.message);
    }
};

// Delete a candidate by ID
const deleteCandidate = async (id) => {
    try {
        const candidate = await Candidate.findByPk(id);
        if (!candidate) {
            throw new Error('Candidate not found');
        }
        await candidate.destroy();
        return { message: 'Candidate deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting candidate: ' + error.message);
    }
};




module.exports = {
    // createCandidate,
    createCandidate,
    updatePhoneNumber,
    storePinCode,
    getCandidateById,
    searchCandidates,
    getAllCandidates,
    updateCandidate,
    deleteCandidate,
};
