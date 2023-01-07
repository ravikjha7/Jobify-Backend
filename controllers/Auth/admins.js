const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.A_JWT_SECRET;

module.exports.loginAdmin = async (req, res) => {

    try {

        const { username, password } = req.body;

        if(username !== process.env.ADMIN_ID || password !== process.env.ADMIN_PASSWD) {
            return res.status(400).json({
                message: "Invalid Credentials !!!"
            });
        }

        // Creating the jwt token 
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 100),
            data: { data: username }
        }, JWT_SECRET);

        // everything OK !
        return res.status(201).json({
            message: "Successfully Logged In !!!",
            token: token
        });

    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};


module.exports.verify = async (req, res) => {
    try {
        let data = jwt.verify(req.params.token, JWT_SECRET);

        data = data.data;
        data = data.data;

        if(data != process.env.ADMIN_ID) throw new Error; 
        return res.status(201).json({ message: "Correct !!!" });

    } catch (e) {
        return res.status(400).json({ message: "Invalid Token or Token Expired !!!" });
    }

}