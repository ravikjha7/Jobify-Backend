const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const cors = require("cors");
require("./config/database").connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
const userRoutes = require('./routes/users');
const hirerRoutes = require('./routes/hirers');
const companyRoutes = require('./routes/companies');

// Routing
app.use('/user', userRoutes);
app.use('/hirer', hirerRoutes);
app.use('/company', companyRoutes);


// Home Page
app.get('/', (req, res) => {
    res.json({ message: "Welcome to DDR-O4!'s Jobify App !!!" });
});


// Setting up the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server Listening on Port ${port}`);
});