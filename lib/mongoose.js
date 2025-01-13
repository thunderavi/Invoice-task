import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://abhiranjanprasad0909:qqglK80RiglHF4mm@invoice.b0ljt.mongodb.net/?retryWrites=true&w=majority&appName=Invoice";

if (!MONGODB_URI) {
  throw new Error("Please define the MongoDB URI in your .env file");
}

// MongoDB connection cache for serverless environments
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectionToDatabase = async () => {
  // If there's already a cached connection, return it
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  // If there's no cached promise, connect to the database
  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI)
      .then((mongoose) => {
        console.log("Connected to MongoDB successfully");
        return mongoose;
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        throw err;
      });
  }

  // Wait for the connection to be established and store it in the cache
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectionToDatabase;
