const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name:{
        required: true,
        type: string
    },
    username:{
        required: true,
        type: string
    },
    gender:{
        required: true,
        type: string,
        enum: ['male','female'],
    },
});

const user = mongoose.model('user',userSchema);

module.exports = user;




