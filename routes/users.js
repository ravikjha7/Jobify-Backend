const express = require('express');
const router = express.Router();
const catchAsync = require('./../utils/catchAsync');
const users = require('../controllers/Auth/users');

router.route('/register').post(catchAsync(users.registerUser));
router.route('/login').post(catchAsync(users.loginUser));
router.route('/updateProfile').post(catchAsync(users.updateProfile));
router.route('/verify/:token').get(catchAsync(users.verify));

module.exports = router;