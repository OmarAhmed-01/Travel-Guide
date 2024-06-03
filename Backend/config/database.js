import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.CONNECT_URI);
        console.log("Connected to Database");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
} 