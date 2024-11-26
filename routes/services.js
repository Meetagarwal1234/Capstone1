const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Request = require('../models/Request');
const servicesController=require('../controller/services')
// Route 1: Get all services
router.get('/allservices', servicesController.getAll);

// Route 2: Get service details by type
router.get('/service/:type', servicesController.getType);

// Route 3: Submit request for a specific service type
router.post('/service/:type/form',servicesController.typeSubmit);

module.exports = router;
