const JobPost = require('../../models/jobpost');
const User = require('./../../models/user');

module.exports.getFeed = async (req, res) => {

    try {
        const { email } = req.body;

        console.log(email);

        let user = await User.find({ "email": email });

        if (user.length === 0) {
            return res.status(400).json({
                message: "Invalid User !!!"
            });
        }

        user = user[0];

        console.log(user);

        let skills = user.skills;

        // console.log(skills);

        let jobposts = await JobPost.find({});

        let myJobPosts = [];
        for (let i in jobposts) {

            let jobpost = jobposts[i];
            // console.log(jobpost);

            let requireSkills = jobpost.skills;

            for (let j in requireSkills) {

                let skill = requireSkills[j];

                if (skills.includes(skill)) {
                    myJobPosts.push(jobpost);
                    break;
                }
            }
        }

        return res.status(201).json({
            message: "Feed Successfully Fetched !!!",
            myJobPosts: myJobPosts
        })

    } catch (e) {
        console.log(e);
        return res.status(400).json({
            message: e.message
        })
    }

}