const express = require('express');
const router = express.Router();
const catchAsync = require('./../utils/catchAsync');
const hirers = require('../controllers/Auth/hirers');

router.route('/register').post(catchAsync(hirers.registerHirer));
router.route('/login').post(catchAsync(hirers.loginHirer));
router.route('/uploadID').post(catchAsync(hirers.uploadID));
router.route('/verify/:token').get(catchAsync(hirers.verify));

module.exports = router;