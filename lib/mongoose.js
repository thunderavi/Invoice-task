import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const MONGODB_URI = "mongodb+srv://abhiranjanprasad0909:qqglK80RiglHF4mm@invoice.b0ljt.mongodb.net/?retryWrites=true&w=majority&appName=Invoice"


if (!MONGODB_URI) {
  throw new Error("Please define the MongoURL environment variable in your .env file");
}

// Global variable to cache the MongoDB connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectionToDatabase = async () => {
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      console.log("Connected to MongoDB successfully");
      return mongoose;
    }).catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectionToDatabase;
