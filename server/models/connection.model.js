import mongoose from 'mongoose';
const connectionRequestSchema = new mongoose.Schema({
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'declined'],
        default: 'pending'
    }
}, { timestamps: true });

connectionRequestSchema.index({ hospital: 1, doctor: 1 }, { unique: true });

const ConnectionReqModel = mongoose.model('ConnectionRequest', connectionRequestSchema);

export default ConnectionReqModel;