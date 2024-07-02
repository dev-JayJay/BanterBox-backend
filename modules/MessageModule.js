const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message : {
        type: String,
        required: true,
        trim: true,
    },
    senderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',  
        required: true, 
    },
    receiverId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',  
        required: true, 
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}); 

const message = mongoose.model('message', messageSchema);

module.exports = message;