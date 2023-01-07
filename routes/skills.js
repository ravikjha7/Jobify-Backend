const express = require('express');
const router = express.Router();
const catchAsync = require('./../utils/catchAsync');
const skills = require('../controllers/Skill/skills');

router.route('/add').post(catchAsync(skills.addSkill));
router.route('/getAll').get(catchAsync(skills.getSkills));

module.exports = router;