import mongoose from "mongoose";
export const Connect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log('=>>> Database COnnected Successfully');
    } catch (error) {
        console.log('Error in Connecting DB');
    }
}