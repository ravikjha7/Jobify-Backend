const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');
const sendEmail = require("../../utils/email");

const JWT_SECRET = process.env.JWT_SECRET;

// Function for Hashing Password using SHA256 Algorithm
function hash(string) {
    return createHash('sha256').update(string).digest('hex');
};

module.exports.registerUser = async (req, res) => {

    try {

        const { name, email, contact } = req.body;

        // If email already exists
        let theUser = await User.find({ "email": email });
        if (theUser.length > 0) {
            return res.status(400).json({
                message: "Email already exists !!!"
            });
        }

        // If contact number already exists
        theUser = await User.find({ "contact": contact });
        if (theUser.length > 0) {
            return res.status(400).json({
                message: "Contact Number already exists !!!"
            });
        }

        // Hashing The Password
        const password = hash(req.body.password);

        // creating the user
        const user = await User.create({ name, email, password, contact });

        // Creating the jwt token
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 100),
            data: { data: user }
        }, JWT_SECRET);

        try {
            const message = `
            <html>
            <body>
            
            <p>Hello <strong>${name}</strong>,</p>
            <p>Thank you  for signing up for Jobify! We're excited to have you on board.</p> 

            <p>Before you can start using the app, we need to verify your account. To do this, please click on the link below:</p> 
            <p><a href="${process.env.BASE_URL}/user/verify/${token}">www.jobify.com/verifyMyAccount</a><br></p>

            <p>Once you have verified your email, you can start using Jobify to find job opportunities and connect with potential employers.</p>

            <p>If you did not sign up for Jobify, you can safely ignore this email.</p>

            <p>Thanks for Joining Jobify! Hope you would get your dream job soon !!!</p>
            
            <p>Thanks,<br>
            Jobify</p>
            </body>
            </html>
            `;
            sendEmail(user.email, "Verification Email - Jobify !!!", message);
        } catch (err) {
            return res.status(400).json({ message: "Invalid Email Address !!!" });
        }

        // everything OK !
        return res.status(201).json({
            message: "Successfully Registered !!!",
            user: user,
            token: token
        });

    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};


module.exports.loginUser = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email or Password not present"
        })
    }

    try {
        let user = await User.find({ "email": email });

        if (user.length === 0) {
            return res.status(400).json({
                message: "Invalid Email !!!"
            });
        }

        user = user[0];

        if(!user.verified) {
            return res.status(400).json({
                message: "Complete your Verification first !!!"
            });
        }

        if(user.isBanned) {
            return res.status(400).json({
                message: "Your are Banned, Kindly check your mail for further details !!!"
            });
        }

        const hashedPassword = hash(password);

        if(hashedPassword !== user.password) {
            return res.status(400).json({
                message: "Incorrect Password !!!"
            })
        }

        // Creating the jwt token
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 100),
            data: { data: user }
        }, JWT_SECRET);


        // everything OK!
        return res.status(201).json({
            message: "Successfully Logged In !!!",
            user: user,
            token: token
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

        await User.findByIdAndUpdate(data._id, { verified: true });
        return res.status(201).json({ message: "Correct !!!" });

    } catch (e) {
        return res.status(400).json({ message: "Invalid Token or Token Expired !!!" });
    }

}


module.exports.updateProfile = async (req, res) => {

    try {

        const { email, contact, profile, resume, skills, certifications, city, education } = req.body;

        let user = await User.find({ "email": email });

        if (user.length === 0) {
            return res.status(400).json({
                message: "Invalid Email !!!"
            });
        }

        user = user[0];

        user.contact = contact;
        user.profile = profile;
        user.resume = resume;
        user.skills = skills;
        user.certifications = certifications;
        user.city = city;
        user.education = education;

        await user.save();

        return res.status(201).json({
            message: "Profile updated Successfully",
            user: user
        });


    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }

}