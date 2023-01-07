const express = require('express');
const router = express.Router();
const catchAsync = require('./../utils/catchAsync');
const userFeeds = require('../controllers/Feed/users');

router.route('/userFeed').get(catchAsync(userFeeds.getFeed));

module.exports = router;