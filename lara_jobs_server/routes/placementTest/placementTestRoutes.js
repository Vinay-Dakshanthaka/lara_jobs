const express = require('express')
const placementTestRoutes = express.Router();

const placementTestController = require('../../controllers/placementTest/placementTestController');


placementTestRoutes.post('/test-link/create', placementTestController.createPlacementTestController);

placementTestRoutes.get('/test-link/:test_id', placementTestController.getPlacementTestByIdController);

placementTestRoutes.get('/test-links/', placementTestController.getPlacementTestByIdController);

placementTestRoutes.put('/test-link', placementTestController.updatePlacementTestController);

placementTestRoutes.delete('/test-link/test_id', placementTestController.deletePlacementTestController);



module.exports = placementTestRoutes ;