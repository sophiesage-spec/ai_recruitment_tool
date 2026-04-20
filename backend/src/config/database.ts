import mongoose from "mongoose";

/**
 * Establishes a connection to MongoDB Atlas.
 * Exits the process if connection fails — fail fast in production.
 */
const connectDB = async (): Promise<void> => {
  try {
    const uri = `${process.env.MONGODB_URI}${process.env.DB_NAME}`;
    const connectionInstance = await mongoose.connect(uri);
    console.log(
      `\n✅ MongoDB connected — HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
