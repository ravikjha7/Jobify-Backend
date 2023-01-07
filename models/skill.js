const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Schema for Skills
const SkillSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = Mongoose.model('Skill', SkillSchema);