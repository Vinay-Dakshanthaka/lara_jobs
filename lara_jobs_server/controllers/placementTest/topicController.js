const handleError = require('../../errors/errorHandler');
const topicService = require('../../services/placementTest/topicServices')

const createTopic = async (req, res) => {
    try {
        const { name, subjectId } = req.body;
        const topic = await topicService.createTopic(name, subjectId);
        return res.status(201).json({
            message: 'Topic created successfully',
            data: topic
        });
    } catch (error) {
        console.log('Error while creating topic: ', error);
        handleError(res, error); 
    }
};

const updateTopic = async (req, res) => {
    try {
        const { topic_id } = req.params;  
        const { name } = req.body;
        const topic = await topicService.updateTopic(name, topic_id);
        return res.status(200).json({
            message: 'Topic updated successfully',
            data: topic
        });
    } catch (error) {
        console.log('Error while updating topic: ', error);
        handleError(res, error);  
    }
};


const getTopicById = async (req, res) => {
    try {
        const { topic_id } = req.params;  
        const topic = await topicService.getTopicById(topic_id);
        return res.status(200).json({
            message: 'Topic fetched successfully',
            data: topic
        });
    } catch (error) {
        console.log('Error while fetching topic: ', error);
        handleError(res, error);  
    }
};

const getAllTopics = async (req, res) => {
    try {
        const topics = await topicService.getAllTopics();
        return res.status(200).json({
            message: 'All topics fetched successfully',
            data: topics
        });
    } catch (error) {
        console.log('Error while fetching all topics: ', error);
        handleError(res, error);  
    }
};


const deleteTopic = async (req, res) => {
    try {
        const { topic_id } = req.params;
        const response = await topicService.deleteTopic(topic_id);
        return res.status(200).json({
            message: response.message
        });
    } catch (error) {
        console.log('Error while deleting topic: ', error);
        handleError(res, error);  
    }
};

const getTopicsBySubjectId = async (req, res) => {
    try {
       const subject_id = req.params; 
       const topics = await topicService.getTopicsBySubjectId(subject_id);
       return res.status(200).json({
        message : 'Topics Fetched succssfully ', 
        topics
       }) 
    } catch (error) {
        console.log("Error while getting topics by Subject Id : ", error);
        handleError(res, error)
    }
}


module.exports = {
    createTopic, 
    updateTopic, 
    getTopicById, 
    getAllTopics, 
    deleteTopic,
    getTopicsBySubjectId,
}