const express = require('express');
const router = express.Router();
const catchAsync = require('./../utils/catchAsync');
const jobposts = require('../controllers/JobPost/jobposts');

router.route('/add').post(catchAsync(jobposts.addPost));

module.exports = router;