const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
        enum: ['male','female'],
    },
});

const user = mongoose.model('user',userSchema);

module.exports = user;




