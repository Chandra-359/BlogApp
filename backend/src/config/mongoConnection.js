import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const mongoConnection = async () => {
    try{
        const connection = await mongoose.connect(
            process.env.DB_URL
        );
        console.log(`MongoDB connected: ${connection.connection.host}`);

    }catch(err){
        console.log("MONGODB connection FAILED ", err);
        process.exit(1);
    }
}

export default mongoConnection;