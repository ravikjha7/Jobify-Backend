const express = require('express');
const router = express.Router();
const catchAsync = require('./../utils/catchAsync');
const companies = require('../controllers/Company/companies');

router.route('/add').post(catchAsync(companies.addCompany));
router.route('/getAll').get(catchAsync(companies.getCompanies));

module.exports = router;