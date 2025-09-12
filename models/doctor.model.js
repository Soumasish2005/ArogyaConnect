import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    specialization: {
        type: [String],
        required: true
    },
    phone: {
        type: Number,
        required: true,
        minlength: [10, "Invalid Phone Number"],
    },
    experience: {
        type: [String],
        min: "",
        default: ["No Experience"]
    },
    feesPerConsultation: {
        type: Number,
        required: true,
        min: 0
    },
    socketId: {
        type: String,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    hospitals:[
        {
            hospitalId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "hospital",
                default:null
            }
        }
    ],
    appointments: [
        {
            date: {
                type: Date,
                required: true
            },
            timeRanges: {
                type: [String],
                default: []
            }
        }
    ]
}, { timestamps: true });

doctorSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}
doctorSchema.methods.comparePassword = async function(password){
    const isEqual = await bcrypt.compare(password, this.password);
    return isEqual;
}
doctorSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
}


const doctorModel = mongoose.model('Doctor', doctorSchema);

export default doctorModel;