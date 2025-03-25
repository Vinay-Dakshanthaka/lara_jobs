const express = require('express');
const candidateController = require('../controllers/candidate/candidateController');

const candidateRoutes = express.Router();

// Create a new candidate
// candidateRoutes.post('/candidates', candidateController.createCandidateController);

//create candidate by storing the email
candidateRoutes.post('/candidate/create', candidateController.createCandidate);

//save phone number
candidateRoutes.post('/candidate/updat-phone', candidateController.updatePhoneNumber);

//store the pin code 
candidateRoutes.post('/candidate/store-pin', candidateController.storePinCode);

// Get a candidate by ID
candidateRoutes.get('/candidates/:id', candidateController.getCandidateByIdController);

// Get all candidates
candidateRoutes.get('/candidates', candidateController.getAllCandidatesController);

// Update a candidate by ID
candidateRoutes.put('/candidates/:id', candidateController.updateCandidateController);

// Delete a candidate by ID
candidateRoutes.delete('/candidates/:id', candidateController.deleteCandidateController);

// Search candidate by query parameters (name, email, phone number )
candidateRoutes.post('/candidates/search', candidateController.searchCandidatesController);

module.exports = candidateRoutes;
