import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    reciverId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'  
    },
    message: {
        required: true,
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now, 
    }
});

messageSchema.pre('save', function (next) {
    this.updatedAt = Date.now(); 
    next();
});

export default mongoose.model('Message', messageSchema);
