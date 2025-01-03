import { mongoose } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`Database connected successfully !!!`);
  } catch (error) {
    console.log("MongoDB connection ERROR !!!", error);
    process.exit(1);
  }
};

export default connectDB;
