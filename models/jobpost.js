const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const shortid = require('shortid');

// Schema for Users
const JobPostSchema = new Schema({
    comapnyName: {
        type: String,
        required: true
    },
    companyLogo: {
        type: String,
    },
    location: {
        type: String,
        required: true
    },
    jobRole: {
        type: String,
        required: true
    },
    linkToApply: {
        type: String,
        required: true
    }
});

module.exports = Mongoose.model('Jobpost', JobPostSchema);