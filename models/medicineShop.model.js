import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const medicineShopSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,   
        required: true,
        select: false
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
    licenseNumber: {
        type: String,
        required: true,
        unique: true
    },
    openingHours: {
        open:{
            type: String,
            required: true
        },
        close:{
            type: String,
            required: true
        }
    },
    websiteUrl: {
        type: String,
        default: ""
    },
    medicinesAvailable: [
        {
            name: {
                type: String,
                required: true
            },
            manufacturer: {
                type: String,
                default: ""
            },
            price: {
                type: Number,
                required: true
            },
            stock: {
                type: Number,
                required: true
            }
        }
    ],
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
            rating: {
                type: Number,
                required: true,
                min: 0,
                max: 5
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

medicineShopSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}
medicineShopSchema.methods.comparePassword = async function(password){
    const isEqual = await bcrypt.compare(password, this.password);
    return isEqual;
}
medicineShopSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
}

const medicineShopModel = mongoose.model('medicineShop', medicineShopSchema);
export default medicineShopModel;