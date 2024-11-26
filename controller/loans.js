const express = require('express');
const Request = require('../models/Request');
const Service = require('../models/Service');
const loanController=require('../controller/loans')

module.exports.calculateLoan=async (req, res) => {
    try {
      const { amt, tenure } = req.body;
      const { type } = req.query;
  
      if (!amt || !tenure) {
        return res.status(400).json({ error: 'Amount and tenure are required' });
      }
      console.log(type)
      const service = await Service.findOne({ type });
      if (!service) {
        return res.status(404).json({ error: 'Service type not found' });
      }
  
      const interestRate = 0.07; // Example interest rate
      const totalInterest = amt * interestRate * tenure;
      const totalAmount = parseFloat(amt) + totalInterest;
  
      res.json({ totalInterest, totalAmount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports.updateRequest=async (req, res) => {
    const { mobile, service, type, remarks } = req.body;

    if (!mobile || !service || !type || !remarks) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const updatedRequest = await Request.findOneAndUpdate(
        { mobile },
        { service, type, remarks },
        { new: true }
      );
      if (!updatedRequest) {
        return res.status(404).json({ error: 'Request not found' });
      }
      res.json({ message: 'Request updated successfully', updatedRequest });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports.deleteRequest=async (req, res) => {
    try {
      const { mobile } = req.body;
      if (!mobile) {
        return res.status(400).json({ error: 'Mobile number is required' });
      }
  
      const deletedRequest = await Request.findOneAndDelete({ mobile });
      if (!deletedRequest) {
        return res.status(404).json({ error: 'Request not found' });
      }
      res.json({ message: 'Request deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };