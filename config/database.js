const Mongoose = require("mongoose");

// Mongoose 7 sets strictQuery as false, so we have to make it explicitly true to supress warnings !
Mongoose.set('strictQuery', true);


exports.connectDB = async () => {
    try {
        await Mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection SuccessFul !!!");
    } catch (err) {
        console.log("Connection Failed !!!");
        console.log(err);
    }

};