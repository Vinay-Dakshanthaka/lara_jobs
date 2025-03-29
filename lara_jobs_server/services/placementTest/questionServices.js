const CustomError = require("../../errors/CustomErrors");
const { CumulativeQuestion, Topic, CQPlacementTest, PlacementTest } = require("../../models");

const createCumulativeQuestion = async (questionData) => {
    try {

        const topic = await Topic.findByPk(questionData.topic_id);
        if (!topic) {
            throw new CustomError('Topic Not Found ', 'TOPIC_NOT_FOUND');
        }

        const cumulativeQuestion = CumulativeQuestion.create(questionData);
        return cumulativeQuestion;

    } catch (error) {
        console.error("error ", error);

        if (error.name === 'SequelizeDatabaseError') {
            throw new CustomError('Database error occurred', 'DATABASE_ERROR');
        }

        if (error.code === 'TOPIC_NOT_FOUND') {
            throw new CustomError(error.message, error.code);
        }

        throw new CustomError('Error creating subject: ' + error.message, 'INTERNAL_SERVER_ERROR');
    }
};

const updateCumulativeQuestion = async (questoin_id, questionData) => {
    try {

        const question = await CumulativeQuestion.findByPk(questoin_id);
        if (!question) {
            throw new CustomError('Question Not Found ', 'NOT_FOUND');
        }

        const cumulativeQuestion = CumulativeQuestion.update(questionData);
        return cumulativeQuestion;

    } catch (error) {
        console.error("error while updating question", error);

        if (error.name === 'SequelizeDatabaseError') {
            throw new CustomError('Database error occurred', 'DATABASE_ERROR');
        }

        if (error.code === 'NOT_FOUND') {
            throw new CustomError(error.message, error.code);
        }

        throw new CustomError('Error creating subject: ' + error.message, 'INTERNAL_SERVER_ERROR');
    }
};

const deleteQuestion = async (questoin_id) => {
    try {
        const question = await CumulativeQuestion.findByPk(questoin_id);
        if (!question) {
            throw new CustomError('Question Not Found ', 'NOT_FOUND');
        }

        await question.destroy();

        return {
            message: 'Question deleted Successfully'
        }

    } catch (error) {
        console.error("error ", error);

        if (error.name === 'SequelizeDatabaseError') {
            throw new CustomError('Database error occurred', 'DATABASE_ERROR');
        }

        if (error.code === 'NOT_FOUND') {
            throw new CustomError(error.message, error.code);
        }

        throw new CustomError('Error creating subject: ' + error.message, 'INTERNAL_SERVER_ERROR');
    }

}

const assignQuestionsToPlacementTestService = async (placement_test_id, question_ids) => {
    try {
        // Validate if placement_test_id and question_ids are provided
        if (!placement_test_id || !question_ids || question_ids.length === 0) {
            throw new CustomError('Placement test ID and question IDs are required.', 'INVALID_INPUT');
        }

        // Check if placement_test_id exists in PlacementTest table
        const test = await PlacementTest.findByPk(placement_test_id);
        if (!test) {
            throw new CustomError(`Placement test with ID ${placement_test_id} not found.`, 'NOT_FOUND');
        }

        // Check which question_ids are already assigned to the placement test
        const existingAssignments = await CQPlacementTest.findAll({
            where: { placement_test_id: placement_test_id },
            attributes: ['cumulative_question_id']
        });

        const assignedQuestionIds = existingAssignments.map(a => a.cumulative_question_id);

        // Filter out already assigned question_ids
        const newQuestionIds = question_ids.filter(id => !assignedQuestionIds.includes(id));

        if (newQuestionIds.length === 0) {
            return { message: 'The selected questions already exist in the placement test.' };
        }

        // Create an array of objects to bulk create entries in CQPlacementTest
        const assignments = newQuestionIds.map(question_id => ({
            cumulative_question_id: question_id,
            placement_test_id: placement_test_id
        }));

        // Bulk create entries in the CQPlacementTest 
        const createdAssignments = await CQPlacementTest.bulkCreate(assignments);

        return {
            message: 'Questions assigned to placement test successfully.',
            assignments: createdAssignments
        };
    } catch (error) {
        console.error('Error assigning question to test link ', error)
        if (error.name === 'SequelizeDatabaseError') {
            throw new CustomError('Database error occurred', 'DATABASE_ERROR');
        }

        if (error.code === 'NOT_FOUND' || error.code === 'INVALID_INPUT') {
            throw new CustomError(error.message, error.code);
        }

        throw new CustomError('Error creating subject: ' + error.message, 'INTERNAL_SERVER_ERROR');
    }
};

const saveQuestionAndAddToLinkService = async (data) => {
    try {
        const { topic_id, question_description, no_of_marks_allocated, difficulty_level, options, correct_options, placement_test_id } = data;

        const newQuestion = await CumulativeQuestion.create({
            topic_id,
            question_description,
            no_of_marks_allocated,
            difficulty_level,
        });

        const questionId = newQuestion.cumulative_question_id;

        const optionList = options.map((optionDescription) => ({
            cumulative_question_id: questionId,
            option_description: optionDescription.trim()
        }));

        await OptionsTable.bulkCreate(optionList);

        // Create the correct answers
        const correctOptionList = correct_options.map((correctOption) => ({
            cumulative_question_id: questionId,
            answer_description: correctOption.trim()
        }));

        await CorrectAnswer.bulkCreate(correctOptionList);

        // Create the association with placement test if provided
        if (placement_test_id) {
            await CQPlacementTest.create({
                cumulative_question_id: questionId,
                placement_test_id
            });
        }

        return {
            message: 'Question created and added to placement test successfully',
            question: newQuestion
        };
    } catch (error) {
        console.error('Error saving question and adding to link:', error);
        if (error.name === 'SequelizeDatabaseError') {
            throw new CustomError('Database error occurred', 'DATABASE_ERROR');
        }

        if (error.code === 'NOT_FOUND' || error.code === 'INVALID_INPUT') {
            throw new CustomError(error.message, error.code);
        }

        throw new CustomError('Error creating subject: ' + error.message, 'INTERNAL_SERVER_ERROR');
    }
};

const uploadAndAssignQuestionsToLinkService = async (filePath, topic_id, placement_test_id = null) => {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet);

        const preserveStringFormat = (value) => (value != null ? String(value).trim() : '');

        const skippedQuestions = [];
        let successfullyUploaded = 0;
        let successfullyAssigned = 0;

        // Loop through each row in the spreadsheet
        for (const row of rows) {
            try {
                const [
                    questionText,
                    difficulty,
                    marks,
                    option1,
                    option2,
                    option3,
                    option4,
                    correctOptionValue
                ] = [
                        preserveStringFormat(row["Question Text"]),
                        preserveStringFormat(row.Difficulty) || "1", // Default difficulty = 1
                        preserveStringFormat(row.Marks) || "1", // Default marks = 1
                        preserveStringFormat(row["Option 1"]),
                        preserveStringFormat(row["Option 2"]),
                        preserveStringFormat(row["Option 3"]),
                        preserveStringFormat(row["Option 4"]),
                        preserveStringFormat(row["Correct Option"])
                    ];

                // Define options and correct answers
                const options = [option1, option2, option3, option4].filter(opt => opt); // Remove null or empty options
                const correctOptions = correctOptionValue.split(',').map(opt => opt.trim());

                // Check if correct options are valid
                const invalidOptions = correctOptions.filter(opt => !options.includes(opt));
                if (invalidOptions.length > 0) {
                    skippedQuestions.push({
                        questionText,
                        reason: `Invalid correct options: ${invalidOptions.join(', ')}`
                    });
                    continue;
                }

                // Save question and associate with test link
                const response = await saveQuestionAndAddToLinkService({
                    topic_id,
                    question_description: questionText,
                    no_of_marks_allocated: marks,
                    difficulty_level: difficulty,
                    options,
                    correct_options: correctOptions,
                    placement_test_id
                });

                successfullyUploaded++;
                if (placement_test_id) successfullyAssigned++;
            } catch (error) {
                console.error('Error processing question:', error);
                skippedQuestions.push({
                    questionText: row["Question Text"],
                    reason: error.message || 'Unknown error occurred'
                });
            }
        }

        return {
            message: 'Upload process completed',
            summary: {
                totalQuestions: rows.length,
                successfullyUploaded,
                successfullyAssigned,
                skippedQuestionsCount: skippedQuestions.length
            },
            skippedQuestions
        };
    } catch (error) {
        console.error('Error in the upload process:', error);
        throw new Error('Error in uploading and assigning questions');
    }
};



module.exports = {
    createCumulativeQuestion,
    updateCumulativeQuestion,
    deleteQuestion,
    assignQuestionsToPlacementTestService,
    saveQuestionAndAddToLinkService,
    uploadAndAssignQuestionsToLinkService
}