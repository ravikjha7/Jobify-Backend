const JobPost = require('./../../models/jobpost');
const Company = require('./../../models/company');

module.exports.addPost = async (req, res) => {

    try {
        let { companyName, companyLogo, location, jobRole, skills, linkToApply } = req.body;

        if (!companyLogo) companyLogo = "DDR-O4";

        const company = await Company.find({ "companyName": companyName });

        if (company.length === 0) {
            return res.status(400).json({
                message: "Company Does Not Exists !!!"
            });
        }

        const jobpost = await JobPost.create({ companyName, companyLogo, location, jobRole, skills, linkToApply });

        return res.status(201).json({
            message: "Job Post Added !!!",
            jobpost: jobpost
        });

    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }

};