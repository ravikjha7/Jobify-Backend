const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const shortid = require('shortid');

// Schema for Users
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        default: shortid.generate
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    profile: {
        type: String
    },
    resume: {
        type: String
    },
    skills: {
        type: [String],
        default: []
    },
    certifications: {
        type: [String],
        default: []
    },
    city: {
        type: String
    },
    education: {
        type: [Object]
    },
    verified: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    reports: {
        type: [Object],
        default: []
    },
    password: {
        type: String,
        required: true
    }
    
});

module.exports = Mongoose.model('User', UserSchema);