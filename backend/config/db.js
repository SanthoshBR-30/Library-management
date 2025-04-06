const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/textbookDB";
const DB_NAME = "textbookDB";

let nativeDb = null;

const connectDB = async () => {
  try {
    // Connect with Mongoose
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Mongoose connected");
    
    // Also connect with native driver for GridFS
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    nativeDb = client.db(DB_NAME);
    console.log("Native MongoDB driver connected");
    
    return nativeDb;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

// Export both the connection function and the native db
module.exports = {
  connectDB,
   getNativeDb: () => nativeDb
};

