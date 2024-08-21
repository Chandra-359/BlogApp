import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const mongoConnection = async () => {
    try{
        const connection = await mongoose.connect(
            process.env.DB_URL
        );
        console.log(`MongoDB connected: ${connection.connection.host}`);

    }catch(error){
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
}

export default mongoConnection;