const express = require('express');
const subjectRoutes = express.Router();
const subjectController = require('../../controllers/placementTest/subjectController');

//save new Subject
subjectRoutes.post('/create', subjectController.createSubject);

//fetch all subject names 
subjectRoutes.get('/get-all-subjects', subjectController.getAllSubjects);

//fethc subject by Id
subjectRoutes.get('/:subject_id', subjectController.getSubjectById);

//update subject 
subjectRoutes.put('/:subject_id', subjectController.getSubjectById);

//delete a subject 
subjectRoutes.delete('/:subject_id', subjectController.deleteSubject);

subjectRoutes.get('/get-all-subjects-topics', subjectController.getAllSubjectsAndTopics);


module.exports = subjectRoutes;




