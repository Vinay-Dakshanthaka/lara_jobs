const { EMAIL_ALREADY_EXISTS, INTERNAL_SERVER_ERROR } = require('../../errors/errorCodes');
const candidateService = require('../../services/candidate/candidateService');

// Create a new candidate
// const createCandidateController = async (req, res) => {
//     try {
//         const candidateData = req.body;
//         const newCandidate = await candidateService.createCandidate(candidateData);
//         res.status(201).json(newCandidate);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const createCandidate = async (req, res) => {
    try {
        const { email } = req.body;

        // Call the service method to create the candidate
        const newCandidate = await candidateService.createCandidate(email);

        // If everything is successful, send a success response
        res.status(201).json({
            message: 'Candidate created successfully and OTP sent to email.',
            candidate: newCandidate,
        });
    } catch (error) {
        console.log("Error while saving candidate email:", error);

        // Handle specific error types (custom error codes)
        if (error.code === 'EMAIL_ALREADY_EXISTS') {
            res.status(409).json({
                message: error.message,
                code: error.code,
            });
        } else if (error.code === 'EMAIL_SENDING_FAILED') {
            res.status(500).json({
                message: 'There was an issue sending the OTP. Please try again later.',
                code: error.code,
            });
        } else {
            // For other internal server errors
            res.status(500).json({
                message: 'Internal server error. Please try again later.',
                code: 'INTERNAL_SERVER_ERROR',
            });
        }
    }
};


const updatePhoneNumber = async (req, res) => {
    try {
        const { candidateId, phoneNumber } = req.body;
        const updatedCandidate = await candidateService.updatePhoneNumber(candidateId, phoneNumber);
        res.status(200).json({
            message: 'Phone number updated and OTP sent to phone',
            candidate: updatedCandidate,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const storePinCode = async (req, res) => {
    try {
        const { candidateId, pinCode } = req.body;
        await candidateService.storePinCode(candidateId, pinCode);
        res.status(200).json({ message: 'Pin code stored successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a candidate by ID
const getCandidateByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const candidate = await candidateService.getCandidateById(id);
        res.status(200).json(candidate);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get all candidates
const getAllCandidatesController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const { total, candidates } = await candidateService.getAllCandidates(page, pageSize);

        res.status(200).json({
            success: true,
            data: candidates,
            total,  // Total record count for pagination
            page,
            pageSize,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching candidates: ' + error.message,
        });
    }
};


const searchCandidatesController = async (req, res) => {
    try {
      const { name, email, phone_number } = req.body; // search parameters 
      const { page = 1, pageSize = 10 } = req.query; // Get pagination params from query string (default to page 1 and 10 results per page)
  
      // Construct the search query object
      const searchQuery = { name, email, phone_number };
  
      // Call the service to search for candidates
      const candidates = await searchCandidates(searchQuery, page, pageSize);
  
      // Send back the response with search results
      res.status(200).json({
        page,
        pageSize,
        results: candidates,
        total: candidates.length, // to get how many matching results are found
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to search candidates: ' + error.message,
      });
    }
  };

// Update a candidate by ID
const updateCandidateController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedCandidate = await candidateService.updateCandidate(id, updateData);
        res.status(200).json(updatedCandidate);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Delete a candidate by ID
const deleteCandidateController = async (req, res) => {
    try {
        const { id } = req.params;
        await candidateService.deleteCandidate(id);
        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    // createCandidateController,
    createCandidate,
    updatePhoneNumber,
    storePinCode, 
    getCandidateByIdController,
    getAllCandidatesController,
    searchCandidatesController,
    updateCandidateController,
    deleteCandidateController,
};
