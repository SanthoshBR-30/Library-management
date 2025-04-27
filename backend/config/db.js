// const mongoose = require("mongoose");
// const { MongoClient } = require("mongodb");

// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/textbookDB";
// const DB_NAME = "textbookDB";

// let nativeDb = null;

// const connectDB = async () => {
//   try {
//     // Connect with Mongoose
//     await mongoose.connect(MONGO_URI);
//     console.log("✅Mongoose connected");
    
//     // Also connect with native driver for GridFS
//     const client = new MongoClient(MONGO_URI);
//     await client.connect();
//     nativeDb = client.db(DB_NAME);
//     console.log("✅Native MongoDB driver connected");
    
//     return nativeDb;
//   } catch (error) {
//     console.error("MongoDB connection failed:", error);
//     process.exit(1);
//   }
// };
// module.exports = connectDB;
// // Export both the connection function and the native db
// module.exports = {
//   connectDB,
//    getNativeDb: () => nativeDb
// };

// // const mongoose = require("mongoose");

// // const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/textbookDB";

// // const connectDB = async () => {
// //   try {
// //     await mongoose.connect(MONGO_URI, {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true
// //     });
// //     console.log("✅ Mongoose connected to MongoDB");
// //   } catch (error) {
// //     console.error("❌ MongoDB connection failed:", error);
// //     process.exit(1);
// //   }
// // };

// // module.exports = connectDB;


// 
// backend/config/db.js

// const dotenv = require("dotenv");
// dotenv.config(); // Load variables from .env

// const mongoose = require("mongoose");
// const { MongoClient } = require("mongodb");

// const MONGO_URI = process.env.MONGO_URI;
// const DB_NAME = "textbookDB";

// console.log("MONGO_URI:", MONGO_URI); // Confirm it's loaded correctly

// let nativeDb = null;

// const connectDB = async () => {
//   try {
//     if (!MONGO_URI) {
//       throw new Error("MONGO_URI not defined in environment variables.");
//     }

//     // Connect with Mongoose
    
//     await mongoose.connect(MONGO_URI);
//     console.log("✅ Mongoose connected to MongoDB");

//     // Native MongoDB driver (for GridFS or advanced usage)
//     const client = new MongoClient(MONGO_URI);
//     await client.connect();
//     nativeDb = client.db(DB_NAME);
//     console.log("✅ Native MongoDB driver connected");

//     return nativeDb;
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error);
//     process.exit(1);
//   }
// };

// module.exports = {
//   connectDB,
//   getNativeDb: () => nativeDb,
// };

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI not defined in environment variables.");
    }
    await mongoose.connect(MONGO_URI);
    console.log("✅ Mongoose connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};