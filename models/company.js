const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const shortid = require('shortid');

// Schema for Companies
const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        default: shortid.generate
    },
    companyLogo: {
        type: String,
    },
    people: {
        type: [String],
        default: []
    }
});

module.exports = Mongoose.model('Company', CompanySchema);