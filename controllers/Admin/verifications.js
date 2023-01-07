const Hirer = require('../../models/hirer');
const sendEmail = require("../../utils/email");

module.exports.getIds = async (req, res) => {
    try {

        const allHirers = await Hirer.find({});

        let hirers = []
        for (let i in allHirers) {

            let hirer = allHirers[i];

            if (hirer.idUploaded && !hirer.idVerified && !hirer.idRejected) hirers.push(hirer);

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

module.exports.acceptId = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email not present !!!"
            });
        }

        let hirer = await Hirer.find({ "email": email });

        if (hirer.length === 0) {
            return res.status(400).json({
                message: "Invalid Email !!!"
            });
        }

        hirer = hirer[0];

        if(!hirer.idUploaded) {
            return res.status(400).json({
                message: "ID Card not found !!!"
            });
        }

        if(hirer.idVerified) {
            return res.status(400).json({
                message: "Verification was already done !!!"
            });
        }

        hirer.idVerified = true;
        await hirer.save();

        try {
            const message = `
            <html>
            <body>
            
            <p>Hello <strong>${hirer.name}</strong>,</p>
            <p>Thank you  for signing up for Jobify! We're excited to have you on board.</p> 

            <p>Your ID is Successfully verified !!!</p>

            <p>Thanks for Joining Jobify! Hope you would get your dream candidate soon !!!</p>
            
            <p>Thanks,<br>
            Jobify</p>
            </body>
            </html>
            `;
            sendEmail(hirer.email, "ID Verification Successful - Jobify !!!", message);
        } catch (err) {
            return res.status(400).json({ message: "Invalid Email Address !!!" });
        }

        return res.status(201).json({
            message: "ID Verified Succesfully !!!"
        });


    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }

}


module.exports.rejectID = async (req, res) => {

    try {

        const { email, reason } = req.body;

        if (!email || !reason) {
            return res.status(400).json({
                message: "Email or Reason not present !!!"
            });
        }

        let hirer = await Hirer.find({ "email": email });

        if (hirer.length === 0) {
            return res.status(400).json({
                message: "Invalid Email !!!"
            });
        }

        hirer = hirer[0];

        if(!hirer.idUploaded) {
            return res.status(400).json({
                message: "ID Card not found !!!"
            });
        }

        if(hirer.idVerified) {
            return res.status(400).json({
                message: "Verification was already done !!!"
            });
        }

        hirer.idVerified = false;
        hirer.idUploaded = false;
        hirer.idRejected = true;

        await hirer.save();

        try {
            const message = `
            <html>
            <body>
            
            <p>Hello <strong>${hirer.name}</strong>,</p>
            <p>Thank you  for signing up for Jobify! We're excited to have you on board.</p> 

            <p>Due to some issues, Your Verification is not accepted as of now !!!</p>

            <p>This could be the following reason for it : </p>
            <p>${reason}</p>

            <p>Thanks for Joining Jobify! Hope you would get your dream candidate soon !!!</p>
            
            <p>Thanks,<br>
            Jobify</p>
            </body>
            </html>
            `;
            sendEmail(hirer.email, "ID Verification Failed - Jobify !!!", message);
        } catch (err) {
            return res.status(400).json({ message: "Invalid Email Address !!!" });
        }

        return res.status(201).json({
            message: "ID Rejected Succesfully !!!"
        });


    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }

}