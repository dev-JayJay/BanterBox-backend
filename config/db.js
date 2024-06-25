const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async  () => {

    try {
        const url = process.env.URL;
        console.log(`${url}`);
        await mongoose.connect(`${url}`);
        console.log("mongoose connected");
    } catch (error) {
        console.log("mongoose did not connect",error);
        process.exit(1);
    }

}

module.exports = connectDB;