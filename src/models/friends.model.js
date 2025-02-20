import mongoose from "mongoose";

const friendsSchema = new mongoose.Schema({
    userId1: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
    },
    userId2: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'blocked'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Friends',friendsSchema);