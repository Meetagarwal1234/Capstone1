const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();
const Member = require('../models/Member');
const ensureAuthenticated = require('../middlewares/auth');
const memberController=require('../controller/members')
// Register a new member
router.post('/member', memberController.createUser);

// Log in a member
router.post('/login', memberController.login);

// Update password
router.put('/updatepassword', ensureAuthenticated, memberController.updateUser);

// Cancel membership
router.delete('/cancelmember', ensureAuthenticated, memberController.deleteUser);

module.exports = router;
