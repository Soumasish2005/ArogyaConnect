import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const hospitalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Hospital Name must contains at least 3 characters"],
    },
    address: {
        location: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        longitude: {
            type: Number,
            required: false,
        },
        latitude: {
            type: Number,
            required: false,
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: [10, "Phone Number must contains at least 10 characters"],
    },
    website: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    doctors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "doctor",
            required: true
        }
    ],
    specialities: {
        type: [String],
        default: ["General"]
    },
    ratings: {
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
        }
    ],
    beds: {
        availableBeds: {
            type: Number,
            min: 1,
            required: true
        },
        totalBeds: {
            type: Number,
            min: 1,
            required: true
        },
    },
    establishedAt: {
        type: Date,
        default: Date.now
    },
    servicesOffered: {
        type: [String],
        default: ["General"]
    },
    emergencyServices: {
        type: Boolean,
        default: false
    },
    ambulanceAvailable: {
        type: Boolean,
        default: false
    },
    pharmacyAvailable: {
        type: Boolean,
        default: false
    },
    labServicesAvailable: {
        type: Boolean,
        default: false
    },
    paymentMethods: {
        type: [String],
        default: ["Cash", "Credit Card", "Insurance"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must contains at least 6 characters"],
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]
    }
});

hospitalSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}
hospitalSchema.methods.comparePassword = async function (password) {
    const isEqual = await bcrypt.compare(password, this.password);
    return isEqual;
}
hospitalSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const hospitalModel = mongoose.model('hospital', hospitalSchema);
export default hospitalModel;       