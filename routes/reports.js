const express = require('express');
const router = express.Router();
const catchAsync = require('./../utils/catchAsync');
const reports = require('../controllers/Report/reports');

router.route('/reportUser').post(catchAsync(reports.reportUser));
router.route('/getAll').post(catchAsync(reports.getAll));

module.exports = router;