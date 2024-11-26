const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const Service = require('../models/Service');
const loanController=require('../controller/loans')
// POST /service/:type/calculate: Calculate loan interest
router.post('/service/:type/calculate', loanController.calculateLoan);

// PUT /updaterequest: Update a loan request
router.put(
  '/updaterequest',
  loanController.updateRequest
);

// DELETE /deleterequest: Delete a loan request
router.delete('/deleterequest', loanController.deleteRequest);

module.exports = router;
