import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

const connectDB = async () => {
    console.log("Attempting to connect to MongoDB...");

    try {
        mongoose.set("strictQuery", false);

        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing in environment variables");
        }

        mongoose.connection.on('connected', () => {
            console.log("🚀 MongoDB connected");
        });

        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/Wellify`);
        console.log(`MongoDB connected: ${conn.connection.host}`);

    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
