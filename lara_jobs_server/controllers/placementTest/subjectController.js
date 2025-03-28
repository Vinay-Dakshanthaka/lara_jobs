const subjectService = require('../../services/placementTest/subjectSevices')

const createSubjectController = async (req, res) => {
    try {
        const { name } = req.body;
        const subject = await subjectService.createSubject(name);
        return res.status(201).json({
            message: 'Subject created successfully',
            data: subject
        });
    } catch (error) {
        console.log("Error while saving candidate email:", error);
        handleError(res, error)
    }
};

module.exports = {
    createSubjectController,
};
