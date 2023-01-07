const Company = require('./../../models/company');

module.exports.addCompany = async (req, res) => {

    try {
        let { companyName, companyLogo } = req.body;

        if (!companyLogo) companyLogo = "DDR-O4";

        const company = await Company.find({ "companyName": companyName });

        if (company.length > 0) {
            return res.status(400).json({
                message: "Company Already Exists !!!"
            });
        }

        await Company.create({ companyName, companyLogo });

        return res.status(201).json({
            message: "Company Added !!!"
        });
        
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }

};


module.exports.getCompanies = async (req, res) => {

    const companies = await Company.find({});

    return res.status(201).json({
        companies: companies
    });

}