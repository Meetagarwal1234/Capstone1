const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();
const Member = require('../models/Member');

module.exports.createUser=async (req, res) => {
    try {
      const { mobile, email, occupation, createpassword } = req.body;
      const existingMember = await Member.findOne({ mobile });
      if (existingMember) {
        return res.status(400).json({ error: 'Member already exists' });
      }
      const hashedPassword = await bcrypt.hash(createpassword, 10);
      const newMember = new Member({ mobile, email, occupation, createpassword: hashedPassword });
      await newMember.save();
      res.status(201).json({ message: 'Member registered successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  module.exports.login=(req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ error: info.message });
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.json({ message: 'Logged in successfully' });
      });
    })(req, res, next);
  }


  module.exports.updateUser= async(req, res) => {
    try {
      const { createpassword } = req.body;
      const hashedPassword = await bcrypt.hash(createpassword, 10);
      req.user.createpassword = hashedPassword;
      await req.user.save();
      res.json({ message: 'Password updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  module.exports.deleteUser=async (req, res) => {
    try {
      const deletedMember = await Member.findByIdAndDelete(req.user.id);
      if (!deletedMember) {
        return res.status(404).json({ error: 'Member not found' });
      }
      req.logout((err) => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.json({ message: 'Membership canceled successfully' });
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }