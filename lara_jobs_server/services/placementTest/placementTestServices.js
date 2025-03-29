const { Topic, PlacementTest, PlacementTestTopic, CumulativeQuestion } = require("../../models");

const createPlacementTest = async ({
    number_of_questions,
    description,
    start_time,
    end_time,
    show_result,
    topic_ids,
    is_Monitored,
    test_title,
    certificate_name,
    issue_certificate,
}) => {
    try {
        // Validate that all provided topic_ids exist in the topics table
        const topics = await Topic.findAll({
            where: { topic_id: topic_ids },
        });

        if (topics.length !== topic_ids.length) {
            throw new CustomError('One or more topic IDs are invalid', 'TOPIC_NOT_FOUND');
        }

        // Create a new PlacementTest
        const newTest = await PlacementTest.create({
            test_link: '', // Initially empty, will be updated later
            number_of_questions,
            description,
            test_title,
            certificate_name,
            start_time, // Store as string
            end_time, // Store as string
            show_result: show_result !== undefined ? show_result : true, // Default to true if not provided
            is_Monitored: is_Monitored !== undefined ? is_Monitored : false, // Default to false if not provided
            issue_certificate: issue_certificate !== undefined ? issue_certificate : false, // Default to false if not provided
        });

        // Generate the test link with the placement_test_id
        const test_link = `${baseURL}/test/${newTest.placement_test_id}`;
        newTest.test_link = test_link;
        await newTest.save();

        // Save the topic IDs in the PlacementTestTopic table
        const topicPromises = topic_ids.map(topic_id =>
            PlacementTestTopic.create({
                placement_test_id: newTest.placement_test_id,
                topic_id,
            })
        );

        await Promise.all(topicPromises);

        // Distribute questions among the selected topics
        const questionsPerTopic = Math.floor(number_of_questions / topic_ids.length);
        const remainderQuestions = number_of_questions % topic_ids.length;

        for (let i = 0; i < topic_ids.length; i++) {
            const topicId = topic_ids[i];
            let questionsToFetch = questionsPerTopic;

            if (i < remainderQuestions) {
                questionsToFetch += 1;
            }

            // Fetch and associate questions with the test
            const questions = await CumulativeQuestion.findAll({
                where: {
                    topic_id: topicId,
                    test_id: null, // Only fetch questions not yet associated with any test
                },
                limit: questionsToFetch,
                order: db.sequelize.random(),
            });

            for (const question of questions) {
                await question.update({ test_id: newTest.placement_test_id });
            }
        }

        return newTest;
    } catch (error) {
        throw new CustomError('Error creating placement test: ' + error.message, 'INTERNAL_SERVER_ERROR');
    }
};

const updatePlacementTest = async ({
    test_id,
    number_of_questions,
    description,
    start_time,
    end_time,
    show_result,
    topic_ids,
    is_Monitored,
    test_title,
    certificate_name,
    issue_certificate,
}) => {
    try {
        // Find the placement test by ID
        const test = await PlacementTest.findByPk(test_id);
        if (!test) {
            throw new CustomError('Placement test not found', 'PLACEMENT_TEST_NOT_FOUND');
        }

        // Validate that all provided topic_ids exist in the topics table
        const topics = await Topic.findAll({
            where: { topic_id: topic_ids },
        });

        if (topics.length !== topic_ids.length) {
            throw new CustomError('One or more topic IDs are invalid', 'TOPIC_NOT_FOUND');
        }

        // Update placement test details
        await test.update({
            number_of_questions,
            description,
            test_title,
            certificate_name,
            start_time, // Store as string
            end_time, // Store as string
            show_result: show_result !== undefined ? show_result : test.show_result, // Use previous value if not provided
            is_Monitored: is_Monitored !== undefined ? is_Monitored : test.is_Monitored, // Use previous value if not provided
            issue_certificate: issue_certificate !== undefined ? issue_certificate : test.issue_certificate, // Use previous value if not provided
        });

        // Clear existing topics associated with this test
        await PlacementTestTopic.destroy({
            where: { placement_test_id: test_id },
        });

        // Save new topic IDs in the PlacementTestTopic table
        const topicPromises = topic_ids.map(topic_id =>
            PlacementTestTopic.create({
                placement_test_id: test_id,
                topic_id,
            })
        );
        await Promise.all(topicPromises);

        // Distribute questions among the selected topics
        const questionsPerTopic = Math.floor(number_of_questions / topic_ids.length);
        const remainderQuestions = number_of_questions % topic_ids.length;

        for (let i = 0; i < topic_ids.length; i++) {
            const topicId = topic_ids[i];
            let questionsToFetch = questionsPerTopic;

            if (i < remainderQuestions) {
                questionsToFetch += 1;
            }

            // Fetch and associate questions with the test
            const questions = await CumulativeQuestion.findAll({
                where: {
                    topic_id: topicId,
                    test_id: null, // Only fetch questions not yet associated with any test
                },
                limit: questionsToFetch,
                order: db.sequelize.random(),
            });

            for (const question of questions) {
                await question.update({ test_id: test_id });
            }
        }

        return test; // Return the updated placement test
    } catch (error) {
        throw new CustomError('Error updating placement test: ' + error.message, 'INTERNAL_SERVER_ERROR');
    }
};



const getPlacementTestById = async (test_id) => {
    try {
        const test = await PlacementTest.findByPk(test_id, {
            include: [PlacementTestTopic]  
        });
        
        if (!test) {
            throw new CustomError('Placement test not found', 'PLACEMENT_TEST_NOT_FOUND');
        }

        return test;
    } catch (error) {
        throw new CustomError('Error retrieving placement test: ' + error.message, 'INTERNAL_SERVER_ERROR');
    }
};

// Service method to get all placement tests
const getAllPlacementTests = async () => {
    try {
        const tests = await PlacementTest.findAll({
            include: [PlacementTestTopic]  
        });

        return tests;
    } catch (error) {
        throw new CustomError('Error retrieving placement tests: ' + error.message, 'INTERNAL_SERVER_ERROR');
    }
};

// Service method to delete a placement test by ID
const deletePlacementTest = async (test_id) => {
    try {
        const test = await PlacementTest.findByPk(test_id);
        
        if (!test) {
            throw new CustomError('Placement test not found', 'PLACEMENT_TEST_NOT_FOUND');
        }

        // Remove associated topics first
        await PlacementTestTopic.destroy({ where: { placement_test_id: test_id } });
        
        // Remove associated questions
        await CumulativeQuestion.update({ test_id: null }, { where: { test_id: test_id } });

        // Remove the test itself
        await test.destroy();

        return { message: 'Placement test deleted successfully' };
    } catch (error) {
        throw new CustomError('Error deleting placement test: ' + error.message, 'INTERNAL_SERVER_ERROR');
    }
};



module.exports = {
    createPlacementTest,
    updatePlacementTest,
    getPlacementTestById, 
    getAllPlacementTests, 
    deletePlacementTest 
};
