const User = require('./../../models/user');

module.exports.reportUser = async (req, res) => {

    try {

        const { email, reporterEmail, comment } = req.body;

        if (email === reporterEmail) {
            return res.status(400).json({
                message: "Invalid Request"
            });
        }

        let user = await User.find({ "email": email });

        if (user.length === 0) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        }

        let reporter = await User.find({ "email": reporterEmail });

        if (reporter.length === 0) {
            return res.status(400).json({
                message: "Invalid Email of Reporter"
            });
        }

        user = user[0];

        let reports = user.reports;
        reports.push({
            reporterEmail,
            comment
        });

        user.reports = reports;
        await user.save();

        return res.status(201).json({
            message: "Reported Successfully !!!"
        });


    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }

}


module.exports.getAll = async (req, res) => {

    try {

        const users = User.find({});

        let reportedUsers = [];

        for (let i in users) {
            let user = users[i];

            if (user.reports.length > 0) reportedUsers.push(user);

        }

        return res.status(201).json({
            message: "Reported List Fetched Successfully !!!",
            reportedUsers: reportedUsers
        });


    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }

}