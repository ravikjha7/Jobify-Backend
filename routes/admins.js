const express = require('express');
const router = express.Router();
const catchAsync = require('./../utils/catchAsync');
const verifications = require('../controllers/Admin/verifications');

router.route('/getIds').get(catchAsync(verifications.getIds));
router.route('/acceptId').post(catchAsync(verifications.acceptId));
router.route('/rejectId').post(catchAsync(verifications.rejectID));

module.exports = router;