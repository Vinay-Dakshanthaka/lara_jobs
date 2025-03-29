const express = require('express')
const cumulativeQuestionRoutes = express.Router();

const cumulativeQuestionController = require('../../controllers/placementTest/questionController');


cumulativeQuestionRoutes.post('/save-question', cumulativeQuestionController.saveCumulatvieQuestion);

cumulativeQuestionRoutes.put('/update-question/:question_id', cumulativeQuestionController.updateCumulativeQuestion);

