import mongoose from "mongoose";

const blackListTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique : true
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '2h'
    }
});

const blackListTokenModel = mongoose.model('blackListToken', blackListTokenSchema);

export default blackListTokenModel;