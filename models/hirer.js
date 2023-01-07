const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const shortid = require('shortid');

// Schema for Hirers
const HirerSchema = new Schema({
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
    emailVerified: {
        type: Boolean,
        default: false
    },
    idUploaded: {
        type: Boolean,
        default: false
    },
    idVerified: {
        type: Boolean,
        default: false
    },
    isBan: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    idCard: String,
    companyName: String
    
});

module.exports = Mongoose.model('Hirer', HirerSchema);