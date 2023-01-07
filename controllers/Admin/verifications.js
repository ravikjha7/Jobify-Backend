const Hirer = require('../../models/hirer');

module.exports.getIds = async (req, res) => {
    try {

        const allHirers = await Hirer.find({});

        let hirers = []
        for(let i in allHirers) {

            let hirer = allHirers[i];

            if(hirer.idUploaded && !hirer.idVerified && !hirer.idRejected) hirers.push(hirer);

        }

        return res.status(201).json({
            message: "Hirers List !!!",
            hirers: hirers
        });


    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
}