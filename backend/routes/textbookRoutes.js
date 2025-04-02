// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");
// const textbookController = require("../controllers/textbookController");

// // Create storage engine
// const storage = new GridFsStorage({
//   url: process.env.MONGO_URI || "mongodb://localhost:27017/textbookDB",
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     return {
//       filename: file.originalname,
//       bucketName: "uploads",
//       metadata: {
//         semester: req.body.semester,
//         subject: req.body.subject,
//         college: req.body.college,
//         department: req.body.department,
//         syllabusScheme: req.body.syllabusScheme
//       }
//     };
//   }
// });

// const upload = multer({ storage });

// router.post("/upload", upload.single("textbook"), textbookController.uploadTextbook);
// router.get("/", textbookController.getTextbooks);

// module.exports = router;


const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const dotenv = require("dotenv");
const textbookController = require("../controllers/textbookController");

dotenv.config();

const router = express.Router();

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/textbookDB";

// Create connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialize GridFS
let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Storage engine for GridFS
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      if (file.mimetype !== "application/pdf") {
        return reject(new Error("Only PDF files are allowed"));
      }
      const filename = `${Date.now()}-${file.originalname}`;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
        metadata: {
          semester: req.body.semester,
          subject: req.body.subject,
          college: req.body.college,
          department: req.body.department,
          syllabusScheme: req.body.syllabusScheme,
        },
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

// Upload route
router.post("/upload", upload.single("textbook"), textbookController.uploadTextbook);

// // Get all textbooks
// router.get("/", textbookController.getTextbooks);

// // Retrieve a file by filename
// router.get("/file/:filename", textbookController.getTextbookFile);

module.exports = router;
