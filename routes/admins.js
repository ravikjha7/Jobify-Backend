const express = require('express');
const router = express.Router();
const catchAsync = require('./../utils/catchAsync');
const verifications = require('../controllers/Admin/verifications');

router.route('/getIds').get(catchAsync(verifications.getIds));

module.exports = router;