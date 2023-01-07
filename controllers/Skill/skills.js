const Skill = require('./../../models/skill');

module.exports.addSkill = async (req, res) => {

    try {
        let { name } = req.body;

        const skill = await Skill.find({ "name": name });

        if (skill.length > 0) {
            return res.status(400).json({
                message: "Skill Already Exists !!!"
            });
        }

        await Skill.create({ name });

        return res.status(201).json({
            message: "Skill Added !!!"
        });
        
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }

};


module.exports.getSkills = async (req, res) => {

    const skills = await Skill.find({});

    return res.status(201).json({
        skills: skills
    });

}