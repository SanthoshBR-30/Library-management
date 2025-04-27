const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose"); // Ensure Mongoose is imported here
const dotenv = require("dotenv");
dotenv.config();

async function createUploadMiddleware() {
  const storage = new GridFsStorage({
    url: process.env.MONGO_URI, // Keep this for potential fallback or if GridFS needs its own connection info
    file: (req, file) => ({
      bucketName: "uploads",
      metadata: {
        semester: req.body.semester,
        subject: req.body.subject,
        college: req.body.college,
        department: req.body.department,
        syllabusScheme: req.body.syllabusScheme,
      },
    }),
    db: mongoose.connection.db, // Directly pass the Mongoose database object
  });
  return multer({ storage });
}

module.exports = createUploadMiddleware;