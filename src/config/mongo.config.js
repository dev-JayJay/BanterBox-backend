import mongoose from "mongoose";
import dotenv from 'dotenv'; 

dotenv.config();

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_URI}`);
    console.log("connection succesfully");
  } catch (error) {
    console.log(`error connecting to monogodb ${error}`);
    process.exit(1);
  }
};

