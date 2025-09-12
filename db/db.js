import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URI || ""; 

export const connectDB = async () => {
    try {
        if(MONGO_URL === "") {
            throw new Error("MONGO_URL is not defined in environment variables");
        }
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }  
};

