const express = require('express')
const cumulativeQuestionRoutes = express.Router();

const cumulativeQuestionController = require('../../controllers/placementTest/questionController');


cumulativeQuestionRoutes.post('/save-question', cumulativeQuestionController.saveCumulatvieQuestion);

cumulativeQuestionRoutes.post('/update-question', cumulativeQuestionController.updateQuestionByIdController);

cumulativeQuestionRoutes.post('/getQuestionCountsByTopicIds', cumulativeQuestionController.getQuestionCountsByTopicIds);

cumulativeQuestionRoutes.post('/saveQuestionAndAddToLink', cumulativeQuestionController.saveQuestionAndAddToLinkController);

cumulativeQuestionRoutes.post('/fetchQuestionsByTestId', cumulativeQuestionController.fetchQuestionsByTestIdController);

cumulativeQuestionRoutes.delete('/delete-question/:question_id', cumulativeQuestionController.deleteQuestion);

module.exports = cumulativeQuestionRoutes;

