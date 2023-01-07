const Hirer = require('../../models/hirer');
const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');
const sendEmail = require("../../utils/email");

const JWT_SECRET = process.env.H_JWT_SECRET;

// Function for Hashing Password using SHA256 Algorithm
function hash(string) {
    return createHash('sha256').update(string).digest('hex');
};

module.exports.registerHirer = async (req, res) => {

    try {

        const { name, email, contact } = req.body;

        // If email already exists
        let theHirer = await Hirer.find({ "email": email });
        if (theHirer.length > 0) {
            return res.status(400).json({
                message: "Email already exists !!!"
            });
        }

        // If contact number already exists
        theHirer = await Hirer.find({ "contact": contact });
        if (theHirer.length > 0) {
            return res.status(400).json({
                message: "Contact Number already exists !!!"
            });
        }

        // Hashing The Password
        const password = hash(req.body.password);

        // creating the hirer
        const hirer = await Hirer.create({ name, email, password, contact });

        // Creating the jwt token
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 100),
            data: { data: hirer }
        }, JWT_SECRET);

        try {
            const message = `
            <html>
            <body>
            
            <p>Hello <strong>${name}</strong>,</p>
            <p>Thank you  for signing up for Jobify! We're excited to have you on board.</p> 

            <p>Before you can start using the app, we need to verify your account. To do this, please click on the link below:</p> 
            <p><a href="${process.env.BASE_URL}/user/verify/${token}">www.jobify.com/verifyMyAccount</a><br></p>

            <p>Once you have verified your email, you can start using Jobify to provide job opportunities and connect with potential employees.</p>

            <p>If you did not sign up for Jobify, you can safely ignore this email.</p>

            <p>Thanks for Joining Jobify! Hope you would get your dream candidate soon !!!</p>
            
            <p>Thanks,<br>
            Jobify</p>
            </body>
            </html>
            `;
            sendEmail(hirer.email, "Verification Email - Jobify !!!", message);
        } catch (err) {
            return res.status(400).json({ message: "Invalid Email Address !!!" });
        }

        // everything OK !
        return res.status(201).json({
            message: "Successfully Registered !!!",
            hirer: hirer,
            token: token
        });

    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};


module.exports.loginHirer = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email or Password not present"
        });
    }

    try {
        let hirer = await Hirer.find({ "email": email });

        if (hirer.length === 0) {
            return res.status(400).json({
                message: "Invalid Email !!!"
            });
        }

        hirer = hirer[0];

        if(!hirer.emailVerified) {
            return res.status(400).json({
                message: "Complete your Email Verification first !!!"
            });
        }

        if(!hirer.idUploaded) {
            return res.status(400).json({
                message: "Upload your ID Card and Company Details !!!",
                uploadID: true,
                hirer: hirer
            });
        }

        if(!hirer.idVerified) {
            return res.status(400).json({
                message: "Your ID Verification is under progress !!!"
            });
        }

        if(hirer.isBanned) {
            return res.status(400).json({
                message: "Your are Banned, Kindly check your mail for further details !!!"
            });
        }

        const hashedPassword = hash(password);

        if(hashedPassword !== hirer.password) {
            return res.status(400).json({
                message: "Incorrect Password !!!"
            })
        }

        // Creating the jwt token
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 100),
            data: { data: hirer }
        }, JWT_SECRET);


        // everything OK!
        return res.status(201).json({
            message: "Successfully Logged In !!!",
            hirer: hirer,
            token: token
        });


    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }


}


module.exports.uploadID = async(req, res) => {

    const { email, companyName, idCard } = req.body;

    if(!email || !companyName || !idCard) {
        return res.status(400).json({
            message: "Some Information is Missing !!!"
        });
    }

    try {
        let hirer = await Hirer.find({ "email": email });

        if (hirer.length === 0) {
            return res.status(400).json({
                message: "Invalid Email !!!"
            });
        }

        hirer = hirer[0];

        if(!hirer.emailVerified) {
            return res.status(400).json({
                message: "Complete your Email Verification first !!!"
            });
        }

        if(hirer.idUploaded) {
            return res.status(400).json({
                message: "You have already uploaded your ID !!!"
            });
        }
        

        hirer.idCard = idCard;
        hirer.idUploaded = true;
        hirer.idRejected = false;
        await hirer.save();


        // everything OK!
        return res.status(201).json({
            message: "Details Sent for Verification !!!"
        });


    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }


}


module.exports.verify = async (req, res) => {
    try {
        let data = jwt.verify(req.params.token, JWT_SECRET);

        data = data.data;
        data = data.data;

        await Hirer.findByIdAndUpdate(data._id, { emailVerified: true });
        return res.status(201).json({ message: "Correct !!!" });

    } catch (e) {
        return res.status(400).json({ message: "Invalid Token or Token Expired !!!" });
    }

}