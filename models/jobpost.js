const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Schema for JobPosts
const JobPostSchema = new Schema({
    companyName: {
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
    skills: {
        type: [String],
        required: true
    },
    linkToApply: {
        type: String,
        required: true
    }
});

module.exports = Mongoose.model('Jobpost', JobPostSchema);