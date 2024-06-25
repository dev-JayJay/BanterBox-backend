const mongoose = require('mongoose');

mongoose.connect('').catch((error) => {
    console.log("mongoose did not connect",error);
});

module.exports = mongoose;