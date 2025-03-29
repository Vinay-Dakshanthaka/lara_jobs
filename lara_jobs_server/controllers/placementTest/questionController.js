const handleError = require("../../errors/errorHandler");
const questionService = require("../../services/placementTest/questionServices")


const saveCumulatvieQuestion = async (req, res) => {
    try {
        const questionData = req.body;

        const cumulatvieQuestion = await questionService.createCumulativeQuestion(questionData);
        return res.status(201).json({
            message: 'Question Saved Successfully',
            cumulatvieQuestion
        })
    } catch (error) {
        console.log('Error while saving question : ', error);
        handleError(res, error);
    }
}

const updateCumulativeQuestion = async (req, res) => {
    try {
        const question_id = req.params;
        const { questionData } = req.body;

        const question = await questionService.updateCumulativeQuestion(question_id, questionData);
        return res.status(200).json({
            message: 'Question updated successfully ',
            question,
        })
    } catch (error) {
        console.log("Error while updating Question : ", error);
        handleError(res, error);
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const question_id = req.params;

        await questionService.deleteQuestion(question_id);
        return res.status(200).json({
            message: 'Question deleted successfully ',
        })
    } catch (error) {
        console.log("Error while updating Question : ", error);
        handleError(res, error);
    }
}


const assignQuestionsToPlacementTestController = async (req, res) => {
    try {
        const { placement_test_id, question_ids } = req.body;

        const result = await placementTestService.assignQuestionsToPlacementTestService(placement_test_id, question_ids);

        return res.status(200).json({
            message: result.message,
            assignments: result.assignments || [],
        });
    } catch (error) {
        // Handle errors
        console.log("Error while assigning questions to the placement test:", error);
        handleError(res, error);
    }
};

const saveQuestionAndAddToLinkController = async (req, res) => {
    try {
        const data = req.body;

        const result = await questionService.saveQuestionAndAddToLinkService(data);

        return res.status(201).json({
            message: result.message,
            question: result.question,
        });
    } catch (error) {
        console.log("Error while saving question and adding to placement test:", error);
        handleError(res, error);
    }
};

const uploadAndAssignQuestionsToLinkController = async (req, res) => {
    try {
        const { filePath, topic_id, placement_test_id } = req.body;

        if (!filePath || !topic_id) {
            return res.status(400).send({
                message: 'File path and topic ID are required.'
            });
        }

        const result = await questionService.uploadAndAssignQuestionsToLinkService(filePath, topic_id, placement_test_id);

        // Respond with the result summary and skipped questions (if any)
        return res.status(200).json({
            message: result.message,
            summary: result.summary,
            skippedQuestions: result.skippedQuestions
        });
    } catch (error) {
        console.error("Error while uploading and assigning questions:", error);
        handleError(res, error);
    }
};



module.exports = {
    saveCumulatvieQuestion,
    updateCumulativeQuestion,
    deleteQuestion,
    assignQuestionsToPlacementTestController,
    saveQuestionAndAddToLinkController,
    uploadAndAssignQuestionsToLinkController,

}