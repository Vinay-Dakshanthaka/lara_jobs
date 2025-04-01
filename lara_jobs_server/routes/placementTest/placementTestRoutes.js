const express = require('express')
const placementTestRoutes = express.Router();

const placementTestController = require('../../controllers/placementTest/placementTestController');


placementTestRoutes.post('/test-link/create', placementTestController.createPlacementTestController);

placementTestRoutes.get('/test-link/:test_id', placementTestController.getPlacementTestByIdController);

placementTestRoutes.get('/test-links', placementTestController.getAllPlacementTestsController);

placementTestRoutes.put('/test-link/update/:test_id', placementTestController.updatePlacementTestController);

placementTestRoutes.delete('/test-link/:test_id', placementTestController.deletePlacementTestController);

placementTestRoutes.put('/test-link/link-status', placementTestController.disableLinkController);

placementTestRoutes.put('/test-link/test-monitor-status', placementTestController.updateMonitorStatus);



module.exports = placementTestRoutes ;