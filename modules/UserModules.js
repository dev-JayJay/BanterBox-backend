const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    // gender:{
    //     type: String,
    //     required: true,
    //     enum: ['male','female'],
    // },
    password:{
        type: String,
        required: true,
    },
});

const user = mongoose.model('user',userSchema);

module.exports = user;




