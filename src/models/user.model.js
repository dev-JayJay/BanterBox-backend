import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullName: {
        required: true,
        type: String
    },
    userName: {
        required: true,
        type: String
    },
    email: {
        unique: true,
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    profile_image: {
        type: String,
    },
    cover_image: {
        type: String,
    }
});

const User = mongoose.model('User', UserSchema);

export default User;