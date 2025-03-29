const placementTestService = require('../../services/placementTest/placementTestServices');
const handleError = require('../../errors/errorHandler');

const createPlacementTestController = async (req, res) => {
    try {
        const {
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
        } = req.body;

        if (!number_of_questions || !start_time || !end_time || !Array.isArray(topic_ids) || topic_ids.length === 0) {
            return res.status(400).send({ message: 'Required fields are missing or invalid' });
        }

        const newTest = await placementTestService.createPlacementTest({
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
        });

        return res.status(200).json({
            message: 'Placement test created successfully',
            data: newTest,
        });

    } catch (error) {
        console.log("Error while creating the placement test link:", error);
        handleError(res, error)
    }
};

const updatePlacementTestController = async (req, res) => {
    try {
        const {
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
        } = req.body;

        // Ensure that required fields are provided
        if (!test_id || !number_of_questions || !start_time || !end_time || !Array.isArray(topic_ids) || topic_ids.length === 0) {
            return res.status(400).send({ message: 'Required fields are missing or invalid' });
        }

        // Call the service to update the placement test
        const updatedTest = await placementTestService.updatePlacementTest({
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
        });

        return res.status(200).json({
            message: 'Placement test updated successfully',
            data: updatedTest,
        });

    } catch (error) {
        console.log("Error while updating the placement test:", error);
       handleError(res, error)
    }
};

const getPlacementTestByIdController = async (req, res) => {
    try {
        const { test_id } = req.params;
        
        if (!test_id) {
            return res.status(400).send({ message: 'Test ID is required' });
        }

        const test = await placementTestService.getPlacementTestById(test_id);

        return res.status(200).json({
            message: 'Placement test retrieved successfully',
            data: test,
        });
    } catch (error) {
        console.log("Error while retrieving the placement test:", error);
        handleError(res, error)
    }
};

// Controller method to get all placement tests
const getAllPlacementTestsController = async (req, res) => {
    try {
        const tests = await placementTestService.getAllPlacementTests();

        return res.status(200).json({
            message: 'All placement tests retrieved successfully',
            data: tests,
        });
    } catch (error) {
        console.log("Error while retrieving all placement tests:", error);
        handleError(res, error)
    }
};

const deletePlacementTestController = async (req, res) => {
    try {
        const { test_id } = req.params;

        if (!test_id) {
            return res.status(400).send({ message: 'Test ID is required' });
        }

        const result = await placementTestService.deletePlacementTest(test_id);

        return res.status(200).json({
            message: result.message,
        });
    } catch (error) {
        console.log("Error while deleting the placement test:", error);
        handleError(res, error)
    }
};


module.exports = {
    createPlacementTestController,
    updatePlacementTestController,
    getPlacementTestByIdController,
    getAllPlacementTestsController,
    deletePlacementTestController,
};
