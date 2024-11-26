const express = require('express');
const Service = require('../models/Service');
const Request = require('../models/Request');


module.exports.getAll=async (req, res) => {
    try {
      const services = await Service.find();
      res.json(services);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports.getType=async (req, res) => {
    try {
      const { type } = req.params;
      const service = await Service.findOne({ type });
      if (service) {
        res.json(service);
      } else {
        res.status(404).json({ message: 'Service not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports.typeSubmit= async (req, res) => {
    try {
      const { mobile, email, amt, msg, code } = req.body;
      const type = req.params.type;
      const newRequest = new Request({ mobile, email, amt, type, msg, code });
      await newRequest.save();
      res.status(201).json({ message: 'Request submitted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };