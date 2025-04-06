// // backend/utils/mongoClient.js
// const { MongoClient } = require("mongodb");

// const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/textbookDB";

// let client;

// const connectMongoClient = async () => {
//   if (!client) {
//     client = new MongoClient(mongoUri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     await client.connect();
//     console.log("Native MongoClient connected");
//   }
//   return client;
// };

// module.exports = connectMongoClient;

const { MongoClient } = require("mongodb");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = "textbookDB";

let dbInstance;

const connectMongoClient = async () => {
  if (dbInstance) return dbInstance;

  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log("Native MongoClient connected");

  dbInstance = client.db(DB_NAME); // ✅ This is what GridFsStorage needs
  return dbInstance;
};

module.exports = connectMongoClient;
