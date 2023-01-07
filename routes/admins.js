const express = require('express');
const router = express.Router();
const catchAsync = require('./../utils/catchAsync');
const verifications = require('../controllers/Admin/verifications');
const admins = require('./../controllers/Auth/admins');

router.route('/getIds').get(catchAsync(verifications.getIds));
router.route('/acceptId').post(catchAsync(verifications.acceptId));
router.route('/rejectId').post(catchAsync(verifications.rejectID));

router.route('/login').post(catchAsync(admins.loginAdmin));
router.route('/verify/:token').post(catchAsync(admins.verify));

module.exports = router;