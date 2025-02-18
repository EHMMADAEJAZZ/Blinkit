import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const URL = process.env.ATLAS_URL.replace(
  '<db_password>',
  process.env.ATLAS_PASSWORD
);

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(URL, {
      dbName: 'BLINKIT',
    });
    console.log(`MongoDB connected to HOST!! ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
